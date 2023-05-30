const router = require('express').Router();

const Collector = require('../controllers/collector.controller');
const Delivery = require('../controllers/delivery.controller');

router.get('/', Collector.getCollectors);
router.post('/', Collector.createCollector);
router.post('/:id/save', Collector.saveProfile);
router.post('/auth/register', Collector.register);
router.post('/auth/login', Collector.login);
router.get('/:id', Collector.getOneCollector);
router.get('/:id/deliveries', Delivery.getCollectorDeliveries);
module.exports = router;
