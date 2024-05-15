const { Router } = require("express");

const PaymentMethodsController = require("../controllers/PaymentMethodsController");


const paymentMethodsRoutes = Router();

const paymentMethodsController = new PaymentMethodsController();

paymentMethodsRoutes.post("/", paymentMethodsController.create);
paymentMethodsRoutes.get("/:id", paymentMethodsController.show);
paymentMethodsRoutes.put("/:id", paymentMethodsController.update)
paymentMethodsRoutes.delete("/:id", paymentMethodsController.delete);

module.exports = paymentMethodsRoutes;