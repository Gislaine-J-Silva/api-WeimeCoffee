const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const productsRouter = require("./products.routes");
const suppliersRouter = require("./suppliers.routes");
const discountCouponsRouter = require("./discountCoupons.routes");
const orderHistoryRouter = require("./orderHistory.routes");
const orderItemsRouter = require("./orderItems.routes");
const ordersRouter = require("./orders.routes");
const paymentMethodsRouter = require("./paymentMethod.routes");
const productReviewsRouter = require("./productReviews.routes");
const shippingMethodRouter = require("./shippingMethod.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/products", productsRouter);
routes.use("/suppliers", suppliersRouter);
routes.use("/discountCoupons", discountCouponsRouter);
routes.use("/orderHistory", orderHistoryRouter);
routes.use("/orderItems", orderItemsRouter);
routes.use("/orders", ordersRouter);
routes.use("/paymentMethods", paymentMethodsRouter);
routes.use("/productReviews", productReviewsRouter);
routes.use("/shippingMethod", shippingMethodRouter);


module.exports = routes;