const dayjs = require('dayjs');
const db = require('../models');

const Company = db.companies;
const Request = db.requests;
const Delivery = db.deliveries;
const Collector = db.collectors;

// check expiry
const checkDeliveryExpiry = async (deliveryId) => {
  /* use this expiry check in getDelivery method */
  try {
    // make sure the delivery exists, and if it doesn't, throw an error
    let delivery = await Delivery.findById(deliveryId).lean().exec();
    if (!delivery) {
      throw new Error(`Could not find delivery of ID ${deliveryId}`);
    }
    // if we find delivery, we'll check that its approved, and that approved date and verify it hasn't passed expirty
    if (delivery.delivery_status === 'APPROVED' && delivery.approved_at) {
      const time_has_elapsed = dayjs().isAfter(dayjs(delivery.approved_at).add(process.env.DELIVERY_EXPIRY_DEFAULT, 'hour'));
      if (time_has_elapsed) {
        delivery.delivery_status = 'EXPIRED';
        delivery.expired_at = dayjs(delivery.approved_at).add(process.env.DELIVERY_EXPIRY_DEFAULT, 'hour');
        delivery = await delivery.save();
      }
      return time_has_elapsed;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error.message || `There was an error checking this delivery's Expiry status`)
  }
}

const checkRequestExpiry = async (requestId) => {
  /* use this request expiry check in create, approve, complete, and claim endpoints */
  try {
    // make sure the request exists, and if it doesn't, throw an error
    let request = await Request.findById(requestId).lean().exec();
    if (!request) {
      throw new Error(`Could not find request of ID ${requestId}`);
    }
    // if we find request, we'll check that its not yet expired
    if (request.request_expires_at < new Date()) {
      return true
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error.message || `There was an error checking this delivery's Expiry status`)
  }
}

// checkCompany - make sure the logged-in user doing company-related actions (e.g. approval) is the company that owns the original request the delivery is for
const checkCompany = async (requestId, company_wallet_address) => {
  try {
    const valid_request = await Request.findById(requestId)
    .populate({
      path: 'company',
      model: Company,
      select: '_id, wallet_address'
    }).exec();
    if (valid_request.company && valid_request.company.wallet_address === company_wallet_address) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error.message || `There was an error checking this delivery's related company`)
  }
}

// checkCollector - makes sure the logged-in user performing this collector-related action is the collector that set up the initial delivery
const checkCollector = async (deliveryId, collector_wallet_address) => {
  try {
    const delivery = await Delivery.findOne({ _id: deliveryId })
    .populate({
      path: 'collector',
      model: Collector,
      select: '_id, wallet_address'
    });
    console.log(delivery)
    if (delivery.collector && delivery.collector.wallet_address === collector_wallet_address) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error.message || `There was an error checking this delivery's related collector`)
  }
}


module.exports = {
  createDelivery: async (req, res) => {
    const { collectorId, requestId, delivery_size } = req.body;
    try {
      // verify request expiry
      const request_has_expired = await checkRequestExpiry(requestId);
      if (request_has_expired) {
        return res.status(403).json({
          status: false,
          message: `Delivery cannot be created, as the request has expired.`,
        });
      }
      const collector_has_delivery_already = await Delivery.findOne({
        collector: collectorId,
        request: requestId
      });
      if (collector_has_delivery_already) {
        return res.status(403).json({
          status: false,
          message: `Delivery cannot be created, as this collector already has a delivery for this request.`,
        });
      }
      // make sure delivery size is not above remaining request size
      const request = await Request.findById(requestId);
      const deliveries_for_request = await Delivery.find({
        request: requestId,
        delivery_status: 'REWARD_CLAIMED'
      }).exec();
      let total_delivery_qty = 0;
      if (Array.isArray(deliveries_for_request)) {
        const completed_delivery_qties = [ ...new Set(deliveries_for_request.map((delivery) => delivery.delivery_size)) ];
        if (completed_delivery_qties.length) {
          total_delivery_qty = completed_delivery_qties.reduce((a, b) => a + b)
        }
      } else {
        total_delivery_qty = 0;
      }
      const max_qty = request.quantity_required - total_delivery_qty;
      if (delivery_size > max_qty) {
        return res.status(403).json({
          status: false,
          message: `Sorry, the delivered size is more than the total allowed: ${max_qty}`,
        });
      }
      let delivery = new Delivery({
        delivery_status: 'AWAITING_APPROVAL',
        started_at: new Date(),
        collector: collectorId,
        request: requestId,
        delivery_size
      });
      delivery = await delivery.save();
      delivery = await Delivery.findById(delivery.id)
      .populate({ path: `request`, model: Request })
      .populate({ path: `collector`, model: Collector })
      .exec();
      delivery = delivery.toJSON();
      delivery.can_claim = false;
      return res.send({ status: true, data: delivery });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message:
          error.message ||
          `There was an error creating this delivery`,
      });
    }
  },
  approveDelivery: async (req, res) => {
    const { id: deliveryId } = req.params;
    const { approver_signature, approver_wallet_address, requestId } = req.body;
    try {
      // find delivery
      let delivery = await Delivery.findById(deliveryId);
      if (!delivery) {
        return res.status(404).json({
          status: false,
          message: `Could not find unapproved delivery of ID ${deliveryId}`,
        });
      }
      if (delivery.delivery_status === 'APPROVED') {
        return res.status(403).json({
          status: false,
          message: `Delivery of ID ${deliveryId} has already been approved`,
        });
      }
      // verify request expiry
      const request_has_expired = await checkRequestExpiry(requestId);
      if (request_has_expired) {
        return res.status(403).json({
          status: false,
          message: `Delivery cannot be approved, as the request has expired.`,
        });
      }
      // make sure the logged-in user doing this approval is the company that owns the request
      const valid_company = await checkCompany(requestId, approver_wallet_address);
      if (!valid_company) {
        return res.status(403).json({
          status: false,
          message: `Company trying to approve this delivery is not valid`,
        });
      }
      // else, company is valid, so update delivery
      delivery.delivery_status = 'APPROVED';
      delivery.approved_at = new Date();
      delivery.approver_signature = approver_signature;
      delivery.approver_wallet_address = approver_wallet_address;
      delivery = await delivery.save();

      delivery = await Delivery.findById(delivery.id)
      .populate({ path: 'collector', model: Collector })
      .exec();
      delivery = delivery.toJSON();
      
      delivery.can_claim = false;
      return res.send({ status: true, data: delivery });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message:
          error.message ||
          `There was an error approving this delivery`,
      });
    }
  },
  completeDelivery: async (req, res) => {
    const { id: deliveryId } = req.params;
    const { delivery_size, delivery_proof, collector_wallet_address, requestId } = req.body;
    try {
      // check for approved delivery
      let delivery = await Delivery.findOne({
        _id: deliveryId,
        delivery_status: 'APPROVED',
      });
      if (!delivery) {
        return res.status(404).json({
          status: false,
          message: `Could not find approved delivery of ID ${deliveryId}`,
        });
      }
      // verify request expiry
      const request_has_expired = await checkRequestExpiry(requestId);
      if (request_has_expired) {
        return res.status(403).json({
          status: false,
          message: `Delivery cannot be completed, as the request has expired.`,
        });
      }
      // check delivery expiry, just to be safe
      const expired = await checkDeliveryExpiry(deliveryId);
      if (expired) {
        return res.status(403).json({
          status: false,
          message: `Delivery cannot be completed, as it has expired.`,
        });
      }
      // make sure the logged-in user completing this delivery is the collector that set up the initial delivery
      const valid_collector = await checkCollector(deliveryId, collector_wallet_address);
      if (!valid_collector) {
        return res.status(403).json({
          status: false,
          message: `Collector trying to complete delivery is not valid`,
        });
      }
      // make sure size, amount and proof are provided
      if (delivery_size && delivery_proof) {
        // make sure delivery size is not above remaining request size
        const request = await Request.findById(requestId);
        const deliveries_for_request = await Delivery.find({
          request: requestId,
          delivery_status: 'REWARD_CLAIMED'
        }).exec();
        let total_delivery_qty = 0;
        if (Array.isArray(deliveries_for_request)) {
          const completed_delivery_qties = [ ...new Set(deliveries_for_request.map((delivery) => delivery.delivery_size)) ];
          if (completed_delivery_qties.length) {
            total_delivery_qty = completed_delivery_qties.reduce((a, b) => a + b)
          }
        } else {
          total_delivery_qty = 0;
        }
        const max_qty = request.quantity_required - total_delivery_qty;
        if (delivery_size > max_qty) {
          return res.status(403).json({
            status: false,
            message: `Sorry, the delivered size is more than the total allowed: ${max_qty}`,
          });
        }
        // we found delivery, so now, we set completion
        delivery.delivery_size = delivery_size;
        delivery.delivery_amount = request.amount_per_unit * delivery_size;
        delivery.delivery_proof = delivery_proof;
        delivery.delivery_status = 'DELIVERED';
        delivery.delivered_at = new Date();
        delivery = await delivery.save();

        delivery = await Delivery.findById(delivery.id)
        .populate({ path: 'collector', model: Collector });
        delivery = delivery.toJSON();

        delivery.can_claim = false;
        return res.send({ status: true, data: delivery });
      } else {
        return res.status(403).json({
          status: false,
          message: `Invalid params. Check that you've provided size and delivery proof.`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: false,
        message:
          error.message ||
          `There was an error completing this delivery`,
      });
    }
  },
  claimRewardForDelivery: async (req, res) => {
    const { id: deliveryId } = req.params;
    const { collector_wallet_address, requestId } = req.body;
    try {
      // verify request expiry
      const request_has_expired = await checkRequestExpiry(requestId);
      if (request_has_expired) {
        return res.status(403).json({
          status: false,
          message: `Delivery reward cannot be claimed, as the request has expired.`,
        });
      }
      /* check delivery expiry, just to be safe */
      const expired = await checkDeliveryExpiry(deliveryId);
      if (expired) {
        return res.status(403).json({
          status: false,
          message: `Reward cannot be claimed, as the delivery has expired.`,
        });
      }
      // make sure the logged-in user claiming this reward is the collector that set up the initial delivery
      const valid_collector = await checkCollector(deliveryId, collector_wallet_address);
      if (!valid_collector) {
        return res.status(403).json({
          status: false,
          message: `Collector trying to complete delivery is not valid`,
        });
      }
      /* conditions for claim - delivery is complete, signature exists, past 48 hours, no dispute */
      // no need to check that signer address matches company address - cos in approveDelivery, we've made sure the company adding the address is valid
      let delivery = await Delivery.findOne({
        _id: deliveryId,
        delivery_status: 'DELIVERED',
        approver_signature: { $exists: true }
      });
      if (!delivery) {
        return res.status(404).json({
          status: false,
          message: `Could not find completed delivery of ID ${deliveryId}`,
        });
      }
      // ensure that delivery is > 48 hours
      const cooloff_period_elapsed = dayjs().isAfter(dayjs(delivery.delivered_at).add(process.env.COOL_OFF_PERIOD, 'hour'));
      if (!cooloff_period_elapsed) {
        return res.status(403).json({
          status: false,
          message: `Cool off period has not elapsed`,
        });
      }
      /* we found delivery, so now, we can do claim */
      delivery.delivery_status = 'REWARD_CLAIMED';
      delivery.claimed_at = new Date();
      delivery = await delivery.save();

      delivery = await Delivery.findById(delivery.id)
        .populate({ path: 'collector', model: Collector });
      return res.send({ status: true, data: delivery });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message:
          error.message ||
          `There was an error claiming this reward`,
      });
    }
  },
  getRequestDeliveries: async (req, res) => {
    const { id: requestId } = req.params;
    try {
      const request = await Request.findById(requestId).exec();
      if (!request) {
        return res.status(404).json({
          status: false,
          message: `Could not find request of ID ${requestId}`,
        });
      }
      let deliveries = {};
      // all deliveries
      deliveries.all = await Delivery.find({ request: requestId })
      .populate({ path: 'collector', model: Collector });
      // pending approval
      deliveries.pending_approval = await Delivery.find({ request: requestId, delivery_status: 'AWAITING_APPROVAL' })
      .populate({ path: 'collector', model: Collector });
      // approved & otherwise
      deliveries.approved_only = await Delivery.find({ request: requestId, delivery_status: 'APPROVED' })
      .populate({ path: 'collector', model: Collector });
      // approved & otherwise
      deliveries.approved = await Delivery.find({ request: requestId, delivery_status: { $ne: 'AWAITING_APPROVAL' } })
      .populate({ path: 'collector', model: Collector });
      // reward claimed
      deliveries.claimed = await Delivery.find({ request: requestId, delivery_status: 'REWARD_CLAIMED' })
      .populate({ path: 'collector', model: Collector });
      // disputed
      deliveries.disputed = await Delivery.find({ request: requestId, delivery_status: 'DISPUTED' })
      .populate({ path: 'collector', model: Collector });
      return res.json({ success: true, data: deliveries });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message:
          error.message ||
          `There was an error getting this request's deliveries`,
      });
    }
  },
  getDeliveryDetails: async (req, res) => {
    const { id: deliveryId } = req.params;
    try {
      // first, check expiry, just to be safe
      await checkDeliveryExpiry(deliveryId);
      const delivery = await Delivery.findById(deliveryId)
      .populate({ path: 'collector', model: Collector })
      .exec();
      if (!delivery) {
        return res.status(404).json({
          status: false,
          message: `Could not find delivery of ID ${deliveryId}`,
        });
      }
      delivery = delivery.toJSON();
      // check if delivery can be claimed
      if (delivery.delivery_status === 'DELIVERED' && delivery.delivered_at) {
        const cooloff_period_elapsed = dayjs().isAfter(dayjs(delivery.delivered_at).add(process.env.COOL_OFF_PERIOD, 'hour'));
        if (cooloff_period_elapsed) {
          delivery.can_claim = true
        }
      }
      return res.send({ status: true, data: delivery });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message:
          error.message ||
          `There was an error retrieving this delivery's details`,
      });
    }
  },
  getCollectorDeliveryForRequest: async (req, res) => {
    const { requestId, collectorId } = req.params;
    try {
      let delivery = await Delivery.findOne({
        request: requestId,
        collector: collectorId
      })
      .populate({ path: 'collector', model: Collector })
      .exec();
      if (!delivery) {
        return res.status(404).json({
          status: false,
          message: `Could not find delivery with request ID of ${requestId} and collector ID of ${collectorId}`,
        });
      }
      const deliveryId = delivery.id;
      // first, check expiry, just to be safe
      await checkDeliveryExpiry(deliveryId);
      delivery = delivery.toJSON();
      // check if delivery can be claimed
      if (delivery.delivery_status === 'DELIVERED' && delivery.delivered_at) {
        const cooloff_period_elapsed = dayjs().isAfter(dayjs(delivery.delivered_at).add(process.env.COOL_OFF_PERIOD, 'hour'));
        if (cooloff_period_elapsed) {
          delivery.can_claim = true
        }
      }
      return res.send({ status: true, data: delivery });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message:
          error.message ||
          `There was an error retrieving this collector's delivery for this request`,
      });
    }
  }
};
