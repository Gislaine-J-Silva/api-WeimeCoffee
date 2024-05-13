const { Router } = require("express");

const usersRoutes = require("./users.routes");
const productsRoutes = require("./products.routes");
const suppliersRoutes = require("./suppliers.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/products", productsRoutes);
routes.use("/suppliers", suppliersRoutes);

module.exports = routes;