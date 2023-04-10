const db = require('../models');

const Requests = db.requests;
const Delivery = db.deliveries;
const Company = db.companies;
const CollectionCenter = db.collectioncenter;
const Location = db.locations;
const Category = db.categories;

module.exports = {
  getCompanies: async (req, res) => {
    try {
      const companies = await Company.find({});
      return res.json({ status: true, companies });
    } catch (error) {
      return res.status(500).send({
        message:
          error.message || 'Some error occurred while retrieving companies.',
      });
    }
  },
  getOneCompany: async (req, res) => {
    const { id: companyId } = req.params;
    try {
      const company = await Company.findById(companyId);
      return res.json({ status: true, data: company });
    } catch (error) {
      return res.status(500).send({
        message:
          error.message || 'Some error occurred while retrieving companies.',
      });
    }
  },
  companyRequests: async (req, res) => {
    const { id: companyId } = req.params;
    try {
      const requests = await Requests.find({ company: companyId })
        .populate({ path: 'location', model: Location })
        .populate({ path: 'company', model: Company })
        .populate({ path: 'scrap_category', model: Category })
        .populate({ path: 'collection_center', model: CollectionCenter })
        .populate({
          path: 'scrap_subcategory',
          model: Category,
          populate: { path: 'children', model: Category },
        });
      res.json({ success: true, data: requests });
    } catch (error) {
      res.status(500).send({ message: `Error retrieving company requests` });
    }
  },
  companyCollectionCenters: async (req, res) => {
    const { id: companyId } = req.params
    try {
      const collection_centers = await CollectionCenter.find({
        company: companyId,
      })
        .populate({ path: 'location', model: Location })
        .populate({ path: 'company', model: Company });
      return res.json({ status: true, collection_centers });
    } catch (error) {
      return res.status(500).send({
        message:
          error.message || 'Some error occurred while retrieving locations.',
      });
    }
  },
  companyAmountLocked: async (req, res) => {
    const { id: companyId } = req.params;
    try {
      const requests = await Request.find({
        company: companyId,
        request_expires_at: { $lt: new Date() } // not yet expired
      }).lean().exec();
      const request_amounts = [...new Set(requests.map(request => request.total_amount))];

      const deliveries = await Delivery.find({
        request: { $nin: [...new Set(requests.map(request => request._id))] },
        delivery_status: 'REWARD_CLAIMED'
      });
      const delivered_amounts = [...new Set(deliveries.map(delivery => delivery.delivery_amount))];
      
      const amount_locked = request_amounts.reduce((a, b) => a + b) - delivered_amounts.reduce((a, b) => a + b);
      return res.json({
        status: true,
        amount_locked
      })
    } catch (error) {
      return res.status(500).send({
        message:
          error.message || 'Some error occurred while computing total amount locked.',
      });
    }
  }
};
