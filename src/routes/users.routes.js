const { Router, response } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersControllers = require("../controllers/UsersControllers");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersControllers = new UsersControllers();

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/", ensureAuthenticated, usersControllers.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), (req, res) => {
    console.log(req.file.filename)
    response.json()
})

module.exports = usersRoutes;