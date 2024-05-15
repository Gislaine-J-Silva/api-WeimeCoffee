const { Router } = require("express");

const OrdersController = require("../controllers/OrdersController");


const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.put("/:id", ordersController.update)
ordersRoutes.delete("/:id", ordersController.delete);

module.exports = ordersRoutes;