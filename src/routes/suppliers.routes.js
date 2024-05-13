const { Router } = require("express");

const SuppliersController = require("../controllers/SuppliersController");


const suppliersRoutes = Router();

const suppliersController = new SuppliersController();

suppliersRoutes.post("/", suppliersController.create);
suppliersRoutes.get("/:id", suppliersController.show);
suppliersRoutes.put("/:id", suppliersController.update)
suppliersRoutes.delete("/:id", suppliersController.delete);

module.exports = suppliersRoutes;