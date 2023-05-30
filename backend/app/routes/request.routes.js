const router = require("express").Router();

const requests = require("../controllers/request.controller");
const deliveries = require("../controllers/delivery.controller");

router.post("/", requests.create);
router.get("/", requests.getRequests);
router.get("/:id", requests.getOneRequest);
router.get("/:id/deliveries", deliveries.getRequestDeliveries);
router.get(
    "/:requestId/collectors/:collectorId",
    deliveries.getCollectorDeliveryForRequest
);

module.exports = router;
