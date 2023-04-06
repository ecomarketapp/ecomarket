const db = require('../models');

const Requests = db.requests;
const Company = db.companies;
const CollectionCenter = db.collectioncenter;
const Location = db.locations;

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
    const { id } = req.params;

    try {
      console.log(id);
      const company = await Company.findOne({ id });
      return res.json({ status: true, data: company });
    } catch (error) {
      return res.status(500).send({
        message:
          error.message || 'Some error occurred while retrieving companies.',
      });
    }
  },
  companyRequests: async (req, res) => {
    // const { requestId } = req.params.id;
    // console.log(req.params.id)
    try {
      const requests = await Requests.find({ company: req.params.id });
      res.json({ success: true, data: requests });
    } catch (error) {
      res.status(500).send({ message: `Error retrieving company requests` });
    }
  },
  CompanyCollectionCenters: async (req, res) => {
    // const id = req.params.id
    try {
      const collection_centers = await CollectionCenter.find({
        company: req.params.id,
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
  // companyRequests: (req, res) =>{
  //   const id = req.params.id;
  //   Requests.find({ company: id })
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving tutorials."
  //     });
  //   });
  // }
};
