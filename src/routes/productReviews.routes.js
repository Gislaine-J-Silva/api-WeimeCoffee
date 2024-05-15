const { Router } = require("express");

const ProductReviewsController = require("../controllers/ProductReviewsController");


const productReviewsRoutes = Router();

const productReviewsController = new ProductReviewsController();

productReviewsRoutes.post("/", productReviewsController.create);
productReviewsRoutes.get("/:id", productReviewsController.show);
productReviewsRoutes.put("/:id", productReviewsController.update)
productReviewsRoutes.delete("/:id", productReviewsController.delete);

module.exports = productReviewsRoutes;