const { Router } = require("express");

const OrderHistoryController = require("../controllers/OrderHistoryController");


const orderHistoryRoutes = Router();

const orderHistoryController = new OrderHistoryController();

orderHistoryRoutes.post("/", orderHistoryController.create);
orderHistoryRoutes.get("/:id", orderHistoryController.show);
orderHistoryRoutes.put("/:id", orderHistoryController.update)
orderHistoryRoutes.delete("/:id", orderHistoryController.delete);

module.exports = orderHistoryRoutes;