const { Router, response } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersControllers = require("../controllers/UsersControllers");
const UserAvatarControllers = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersControllers = new UsersControllers();
const userAvatarController = new UserAvatarControllers();

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/", ensureAuthenticated, usersControllers.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes;