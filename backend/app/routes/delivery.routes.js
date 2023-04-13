const router = require('express').Router();
const delivery = require('../controllers/delivery.controller');

router.post('/', delivery.createDelivery);
router.get('/:id', delivery.getDeliveryDetails);
router.post('/:id/approval', delivery.approveDelivery);
router.post('/:id/completion', delivery.completeDelivery);
router.post('/:id/rewards', delivery.claimRewardForDelivery);

module.exports = router;
