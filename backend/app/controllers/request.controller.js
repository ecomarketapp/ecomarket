/* eslint-disable camelcase */
const db = require('../models');
const dayjs = require('dayjs');


const Request = db.requests;
const Location = db.locations;
const Company = db.companies;
const Category = db.categories;
const CollectionCenter = db.collectioncenter;

module.exports = {
  create: async (req, res) => {
    const {
      title,
      description,
      category,
      subcategory,
      expires_at,
      unit,
      quantity_required,
      amount_per_unit,
      collection_center: c_center_id,
      company: companyId,
    } = req.body;
    try {
      /**
       * TODO: generate title
       * verify - scrap category and subcategory
       */
      // return console.log(req.body);

      const collection_center = await CollectionCenter.findById(c_center_id)
      .populate({ path: `location`, model: Location })
      .lean().exec();

      if (!collection_center || !collection_center.location) {
        return res.status(404).json({
          status: false,
          message: `Collection center / collection center location not found.`,
        });
      }
      // verify company
      let company_find = await Company.findById(companyId);
      if (!company_find) {
        return res.status(404).json({
          status: false,
          message: `Company not found.`,
        });
      }

      const expiry_date = dayjs(expires_at).add(1, 'd').toJSON();
      // Create a request
      const total_amount = quantity_required * amount_per_unit;
      let request = new Request({
        title,
        description,
        scrap_category: category,
        scrap_subcategory: subcategory,
        request_expires_at: expiry_date,
        unit,
        quantity_required,
        amount_per_unit,
        total_amount:total_amount,
        collection_center: c_center_id,
        location: collection_center.location._id,
        company:companyId,
      });
      // Save request in the database
      request = await request.save();
      /*  */
      request = await Request.findById(request.id)
      .populate({ path: 'company', model: Company, })
      .populate({ path: 'scrap_category', model: Category, })
      .populate({ path: 'scrap_subcategory', model: Category, })
      .populate({ path: 'collection_center', model: CollectionCenter, })
      .populate({ path: 'location', model: Location, })
      .exec();
      return res.send({ status: true, data: request });
    } catch (error) {
      return res.status(500).send({
        message:
          error.message || 'Some errors occurred while creating the request.',
      });
    }
  },
  getRequests: async (req, res) => {
    /**
     * TODO: paginate
     */
    const { filter, location, companyId } = req.query;
    let { page, size } = req.query;
    let requests;
    try {
      if (!page) {
        // Make the Default value one
        page = 1;
      }
      if (!size) {
        size = 10;
      }
      const limit = parseInt(size, 10);

      
      // if filter query exists, run filter by param (maybe location)
      if (filter === 'location' && location) {
        if (location === 'all') {
          requests = await Request.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate({ path: 'location', model: Location })
            .populate({ path: 'company', model: Company })
            .populate({ path: 'scrap_category', model: Category })
            .populate({ path: 'collection_center', model: CollectionCenter })
            .populate({
              path: 'scrap_subcategory',
              model: Category,
              populate: { path: 'children', model: Category },
            })
            .exec();
        } else {
          // confirm that location exists, if not - pass error
          const foundlocation = await Location.findOne({
            name: location,
          }).exec();
          if (!foundlocation) {
            return res.status(404).send({
              message: `Location not found.`,
            });
          }
          /* location exists */
          requests = await Request.find({ location: foundlocation._id })
            .sort({ createdAt: -1 })
            .populate({ path: 'location', model: Location })
            .populate({ path: 'company', model: Company })
            .populate({ path: 'scrap_category', model: Category })
            .populate({ path: 'collection_center', model: CollectionCenter })
            .populate({
              path: 'scrap_subcategory',
              model: Category,
              populate: { path: 'children', model: Category },
            })
            .exec();
          const count = requests.length;
          return res.send({ count, page, size, data: requests });
        }
      } else if (filter === 'company' && companyId) {
        // confirm that company exists, if not - pass error
        const foundcompany = await Company.findById(companyId)
          .sort({ datefield: -1 })
          .limit(limit)
          .populate({ path: 'location', model: Location })
          .populate({ path: 'company', model: Company })
          .populate({ path: 'scrap_category', model: Category })
          .populate({ path: 'collection_center', model: CollectionCenter })
          .populate({
            path: 'scrap_subcategory',
            model: Category,
            populate: { path: 'children', model: Category },
          })
          .exec();
        if (!foundcompany) {
          return res.status(500).send({
            message: `Company with ID ${companyId} not found.`,
          });
        }
        /* company exists */
        requests = await Request.find({ company: foundcompany._id }).exec();
        const count = requests.length;
        return res.send({ count, page, size, data: requests });
      } else {
        // get all requests
        requests = await Request.find()
          .sort({ datefield: -1 })
          .limit(limit)
          .populate({ path: 'location', model: Location })
          .populate({ path: 'company', model: Company })
          .populate({ path: 'scrap_category', model: Category })
          .populate({ path: 'collection_center', model: CollectionCenter })
          .populate({
            path: 'scrap_subcategory',
            model: Category,
            populate: { path: 'children', model: Category },
          })
          .exec();
        const count = requests.length;
        return res.send({ count, page, size, data: requests });
        // id: -1,
      }
      // no requests found
      if (!requests) {
        return res.status(404).json({
          status: false,
          message: `No requests found for your query.`,
        });
      }
      if (location) {
        // confirm that location exists, if not - pass error
        if (location === 'all') {
          requests = await Request.find()
            .sort({ datefield: -1 })
            .limit(limit)
            .populate({ path: 'location', model: Location })
            .populate({ path: 'company', model: Company })
            .populate({ path: 'scrap_category', model: Category })
            .populate({ path: 'collection_center', model: CollectionCenter })
            .populate({
              path: 'scrap_subcategory',
              model: Category,
              populate: { path: 'children', model: Category },
            })
            .exec();
        } else {
          const foundlocation = await Location.findOne({
            id: location,
          }).exec();
          if (!foundlocation) {
            return res.status(500).send({
              message: `Location not found.`,
            });
          }

          /* location exists */
          requests = await Request.find({ location: foundlocation._id })
            .sort({ createdAt: -1 })
            .populate({ path: 'location', model: Location })
            .populate({ path: 'company', model: Company })
            .populate({ path: 'scrap_category', model: Category })
            .populate({ path: 'collection_center', model: CollectionCenter })
            .populate({
              path: 'scrap_subcategory',
              model: Category,
              populate: { path: 'children', model: Category },
            })
            .exec();
          const count = requests.length;
          return res.send({ count, page, size, data: requests });
        }
      }


      const count = requests.length;
      return res.send({ count, page, size, data: requests });
    } catch (error) {
      return res.status(500).send({
        message:
          error.message || 'Some error occurred while retrieving requests.',
      });
    }
  },
  getOneRequest: async (req, res) => {
    const { id: requestId } = req.params;
    /**
     * TODO: query TheGraph to get on-chain data
     * TODO: calculate total % provided (query deliveries collection)
     * TODO: calculate total amount paid (query deliveries + escrow payments collection)
     * TODO: calcaulte days remaining (query expiry date - today)
     *      ? use dayjs library
     * ? filter properties from the model file or here
     */
    try {
      const request = await Request.findById(requestId)
        .populate({ path: 'location', model: Location })
        .populate({ path: 'company', model: Company })
        .populate({ path: 'scrap_category', model: Category })
        .populate({ path: 'collection_center', model: CollectionCenter })
        .populate({
          path: 'scrap_subcategory',
          model: Category,
          populate: { path: 'children', model: Category },
        });
        if (request.request_expires_at > new Date()) {
          request.expired = true;
        } else {
          request.expired = false;
        }
      return res.send({ status: true, data: request });
    } catch (error) {
      return res.status(500).send({ message: `Error retrieving request details` });
    }
  },
  updateRequest: async (req, res) => {},
  deleteRequest: async (req, res) => {},
  /* expire request, check all amounts that are locked in escrow and are not fulfilled, and release it */
  expireRequest: async (req, res) => {}
};
