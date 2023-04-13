const router = require('express').Router();

const company = require('../controllers/company.controller');

// Create a new Company
router.get('/', company.getCompanies);
router.post('/', company.createCompany);
router.post('/:id/save', company.saveProfile);
router.get('/:id', company.getOneCompany);
router.get('/:id/requests', company.companyRequests);
router.get('/:id/collectioncenters', company.companyCollectionCenters);
router.get('/:id/amountlocked', company.companyAmountLocked);

module.exports = router;
