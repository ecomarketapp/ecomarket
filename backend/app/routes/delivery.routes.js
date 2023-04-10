const router = require('express').Router();
const delivery = require('../controllers/delivery.controller');

router.post('/', delivery.createDelivery);
router.get('/:id', delivery.getDeliveryDetails);
router.post('/:id/approval', delivery.approveDelivery);
router.get('/:id/completion', delivery.completeDelivery);
router.get('/:id/rewards', delivery.claimRewardForDelivery);

module.exports = router;
