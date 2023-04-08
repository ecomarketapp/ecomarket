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
      quantity_required,
      amount_per_unit,
      collection_center,
      company,
      expires_at,
      location,
      escrow_payment,
      deliveries,
    } = req.body;

    // const companyid = req.params.id
    try {
      /**
       * TODO: generate title
       * todo: generate expiry date (and send in result)
       * todo: get location - from collection center
       * todo: get company
       */
      const EXPIRY_PERIOD = 30;
      console.log(expires_at);

      const expiry_date = dayjs(expires_at).add(1, 'd').toJSON();

      // return console.log(expiry_date);
      // const title = ``;
      // let company_find = Company.findById(companyid)
      /**
       * todo: verify - collection center, scrap category and subcategory
       */
      // Create a request
      let request = new Request({
        title,
        description,
        scrap_category: category,
        scrap_subcategory: subcategory,
        quantity_required,
        amount_per_unit,
        collection_center,
        company,
        request_expires_at:expiry_date,
        location,
      });

      // return console.log(request.save(request));

      // return res.send({data: request });

      console.log(request, 'before');
      // Save request in the database
      request = await request.save(request);
      // return console.log(request, "after");

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
        // return console.log('yup')
        // confirm that location exists, if not - pass error
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
          const foundlocation = await Location.findOne({
            name: location,
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
        return res.status(404).send({
          message: `No requests found for your query.`,
        });
      }
      if (location) {
        // return console.log('yup')
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
    /**
     * TODO: query TheGraph to get on-chain data
     * TODO: calculate total % provided (query deliveries collection)
     * TODO: calculate total amount paid (query deliveries + escrow payments collection)
     * TODO: calcaulte days remaining (query expiry date - today)
     *      ? use dayjs library
     * ? filter properties from the model file or here
     */
    // const { requestId } = req.params;
    try {
      const request = await Request.findById(req.params.id)
        .populate({ path: 'location', model: Location })
        .populate({ path: 'company', model: Company })
        .populate({ path: 'scrap_category', model: Category })
        .populate({ path: 'collection_center', model: CollectionCenter })
        .populate({
          path: 'scrap_subcategory',
          model: Category,
          populate: { path: 'children', model: Category },
        });
      res.send(request);
    } catch (error) {
      res.status(500).send({ message: `Error retrieving request ` });
    }
  },
  updateRequest: async (req, res) => {},
  deleteRequest: async (req, res) => {},

  // Delete all Tutorials from the database.
  deleteAll: (req, res) => {
    Request.deleteMany({})
      .then((data) => {
        res.send({
          message: `${data.deletedCount} Requests were deleted successfully!`,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while removing all tutorials.',
        });
      });
  },

  getCompanyRequests: async (req, res) => {
    const { requestId } = req.params;
    try {
      const request = await Request.find({ company: requestId });
      res.send(request);
    } catch (error) {
      res.status(500).send({
        message: `Error retrieving company requests with id=${requestId}`,
      });
    }
  },
};
