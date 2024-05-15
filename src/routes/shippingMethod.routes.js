const { Router } = require("express");

const ShippingMethodController = require("../controllers/ShippingMethodController");


const shippingMethodRoutes = Router();

const shippingMethodController = new ShippingMethodController();

shippingMethodRoutes.post("/", shippingMethodController.create);
shippingMethodRoutes.get("/:id", shippingMethodController.show);
shippingMethodRoutes.put("/:id", shippingMethodController.update)
shippingMethodRoutes.delete("/:id", shippingMethodController.delete);

module.exports = shippingMethodRoutes;