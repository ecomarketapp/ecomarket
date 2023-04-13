const db = require('../models');
const Location = db.locations;
const Requests = db.requests;
const Delivery = db.deliveries;
const Company = db.companies;
const CollectionCenter = db.collectioncenter;
const Category = db.categories;

module.exports = {
  create: async (req, res, next) => {
    // id = req.params.id;
    const { name, state, country } = req.body;

    try {
      const location = new Location({ name, state, country });

      await location.save(location).then((data) => {
        res.send({ status: true, data });
      });
    } catch (ex) {
      next(ex);
    }
  },
  getLocations: async (req, res) => {
    try {
      const locations = await Location.find({});
      return res.json({ status: true, data: locations });
    } catch (error) {
      res.status(500).send({
        message:
          error.message || 'Some error occurred while retrieving locations.',
      });
    }
  },
  getOneLocation: async (req, res) => {
    const { id } = req.params;

    try {
      const location = await Location.findById(id);
      return res.json({ status: true, location });
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Center not found.',
      });
    }
  },
  locationRequests: async (req, res) => {
    const { id: locationId } = req.params;
    try {
      const locationCheck = await Location.findById(locationId);
      if(!locationCheck){
        return res.json({ status: false, msg: 'Location doesnt exists' });
      }
      const requests = await Requests.find({ location: locationId })
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
};
