const { Router } = require("express");

const DiscountCouponsController = require("../controllers/DiscountCouponsController");


const discountCouponsRoutes = Router();

const discountCouponsController = new DiscountCouponsController();

discountCouponsRoutes.post("/", discountCouponsController.create);
discountCouponsRoutes.get("/:id", discountCouponsController.show);
discountCouponsRoutes.put("/:id", discountCouponsController.update)
discountCouponsRoutes.delete("/:id", discountCouponsController.delete);

module.exports = discountCouponsRoutes;