const { Router } = require("express");

const usersRoutes = require("./users.routes");
const productsRoutes = require("./products.routes");
const suppliersRoutes = require("./suppliers.routes");
const discountCouponsRoutes = require("./discountCoupons.routes");
const orderHistoryRoutes = require("./orderHistory.routes");
const orderItemsRoutes = require("./orderItems.routes");
const ordersRoutes = require("./orders.routes");
const paymentMethodsRoutes = require("./paymentMethod.routes");
const productReviewsRoutes = require("./productReviews.routes");
const shippingMethodRoutes = require("./shippingMethod.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/products", productsRoutes);
routes.use("/suppliers", suppliersRoutes);
routes.use("/discountCoupons", discountCouponsRoutes);
routes.use("/orderHistory", orderHistoryRoutes);
routes.use("/orderItems", orderItemsRoutes);
routes.use("/orders", ordersRoutes);
routes.use("/paymentMethods", paymentMethodsRoutes);
routes.use("/productReviews", productReviewsRoutes);
routes.use("/shippingMethod", shippingMethodRoutes);


module.exports = routes;