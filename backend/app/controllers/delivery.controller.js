const dayjs = require('dayjs');
const db = require('../models');

const Request = db.requests;
const Delivery = db.deliveries;
const Collector = db.collectors;


module.exports = {
  // check expiry
  checkExpiry: async (deliveryId) => {
    /* use this expiry check in getDelivery method */
    try {
      // make sure the delivery exists, and if it doesn't, throw an error
      let delivery = await Delivery.findById(deliveryId).lean().exec();
      if (!delivery) {
        throw new Error(`Could not find delivery of ID ${deliveryId}`);
      }
      // if we find delivery, we'll check that its approved, and that approved date and verify it hasn't passed expirty
      if (delivery.delivery_status === 'APPROVED' && delivery.approved_at) {
        const time_has_elapsed = dayjs().isAfter(dayjs(delivery.approved_at).add(process.env.DELIVERY_EXPIRY_DEFAULT, hour));
        if (time_has_elapsed) {
          delivery.status = 'EXPIRED';
          delivery.expired_at = dayjs(delivery.approved_at).add(process.env.DELIVERY_EXPIRY_DEFAULT, hour);
          delivery = await delivery.save();
        }
        return time_has_elapsed;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error.message || `There was an error checking this delivery's Expiry status`)
    }
  },

  // checkCompany - make sure the logged-in user doing company-related actions (e.g. approval) is the company that owns the original request the delivery is for
  checkCompany: async (deliveryId, company_wallet_address) => {
    try {
      const valid_request = await Request.find().populate({
        path: 'deliveries',
        match: { _id: deliveryId },
        select: '_id'
      }).populate({
        path: 'company',
        match: { wallet_address: company_wallet_address },
        select: '_id'
      }).exec();
      console.log(valid_request);
      if ((Array.isArray(valid_request.deliveries) && valid_request.deliveries.length) && valid_request.company) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error.message || `There was an error checking this delivery's related company`)
    }
  },

  // checkCollector - makes sure the logged-in user performing this collector-related action is the collector that set up the initial delivery
  checkCollector: async (deliveryId, collector_wallet_address) => {
    try {
      const delivery = await Delivery.find({ _id: deliveryId }).populate({
        path: 'collector',
        match: { wallet_address: collector_wallet_address },
        select: '_id'
      })
      if (delivery.collector) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error.message || `There was an error checking this delivery's related collector`)
    }
  },


  createDelivery: async (req, res) => {
    const { collectorId, requestId } = req.body;
    try {
      let delivery = new Delivery({
        delivery_status: 'AWAITING_APPROVAL',
        started_at: new Date(),
        collector: collectorId,
        request: requestId
      });
      delivery = await delivery.save();
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
    const { approver_signature, approver_wallet_address } = req.body;
    try {
      // make sure the logged-in user doing this approval is the company that owns the request
      const valid_company = await this.checkCompany(deliveryId, approver_wallet_address);
      if (!valid_company) {
        return res.status(403).json({
          status: false,
          message: `Company trying to approve this delivery is not valid`,
        });
      }
      // else, company is valid, so find and update delivery make sure the delivery exists, and if it doesn't, throw an error
      let delivery = await Delivery.findOneAndUpdate({
        _id: deliveryId,
        delivery_status: 'AWAITING_APPROVAL'
      }, {
        delivery_status: 'APPROVED',
        approved_at: new Date(),
        approver_signature,
        approver_wallet_address
      }, {
        new: true
      }).exec();
      if (!delivery) {
        return res.status(404).json({
          status: false,
          message: `Could not find delivery of ID ${deliveryId}`,
        });
      }
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
    const { delivery_size, delivery_amount, delivery_proof, collector_wallet_address } = req.body;
    try {
      // first, check expiry, just to be safe
      const expired = await this.checkExpiry(deliveryId);
      if (expired) {
        return res.status(403).json({
          status: false,
          message: `Delivery cannot be completed, as it has expired.`,
        });
      }
      // make sure the logged-in user completing this delivery is the collector that set up the initial delivery
      const valid_collector = await this.checkCollector(deliveryId, collector_wallet_address);
      if (!valid_collector) {
        return res.status(403).json({
          status: false,
          message: `Collector trying to complete delivery is not valid`,
        });
      }
      // make sure size, amount and proof are provided
      if (delivery_size && delivery_amount && delivery_proof) {
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
        // we found delivery, so now, we set completion
        delivery.delivery_size = delivery_size;
        delivery.delivery_amount = delivery_amount;
        delivery.delivery_proof = delivery_proof;
        delivery.delivery_status = 'DELIVERED';
        delivery.delivered_at = new Date();
        delivery = await delivery.save();
        delivery.can_claim = false;
        return res.send({ status: true, data: delivery });
      } else {
        return res.status(403).json({
          status: false,
          message: `Invalid params. Check that you've provided all required parameters.`,
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
    const { collector_wallet_address } = req.body;
    try {
      /* first, check expiry, just to be safe */
      const expired = await this.checkExpiry(deliveryId);
      if (expired) {
        return res.status(403).json({
          status: false,
          message: `Reward cannot be claimed, as it has expired.`,
        });
      }
      // make sure the logged-in user claiming this reward is the collector that set up the initial delivery
      const valid_collector = await this.checkCollector(deliveryId, collector_wallet_address);
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
      const cooloff_period_elapsed = dayjs().isAfter(dayjs(delivery.delivered_at).add(process.env.COOL_OFF_PERIOD, hour));
      if (!cooloff_period_elapsed) {
        return res.status(404).json({
          status: false,
          message: `Cool off period has not elapsed`,
        });
      }
      /* we found delivery, so now, we can do claim */
      delivery.delivery_status = 'CLAIMED';
      delivery.claimed_at = new Date();
      delivery = await delivery.save();
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
    const { id: requestId } = req.query;
    try {
      const request = await Request.findById(requestId).exec();
      if (!request) {
        return res.status(404).json({
          status: false,
          message: `Could not find request of ID ${requestId}`,
        });
      }
      const deliveries = await Delivery.find({ request: requestId }).populate({
        path: 'collector',
        model: Collector,
      });
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
      await this.checkExpiry(deliveryId);
      const delivery = await Delivery.findById(deliveryId).exec();
      if (!delivery) {
        return res.status(404).json({
          status: false,
          message: `Could not find delivery of ID ${deliveryId}`,
        });
      }
      // check if delivery can be claimed
      if (delivery.delivery_status === 'DELIVERED' && delivery.delivered_at) {
        const cooloff_period_elapsed = dayjs().isAfter(dayjs(delivery.delivered_at).add(process.env.COOL_OFF_PERIOD, hour));
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
  }
};
