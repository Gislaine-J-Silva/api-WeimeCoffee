const { Router } = require("express");

const ProductsController = require("../controllers/ProductsController");


const productsRoutes = Router();

const productsController = new ProductsController();

productsRoutes.get("/", productsController.index);
productsRoutes.post("/", productsController.create);
productsRoutes.get("/:id", productsController.show);
productsRoutes.put("/:id", productsController.update)
productsRoutes.delete("/:id", productsController.delete);

module.exports = productsRoutes;