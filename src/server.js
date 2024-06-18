require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload")

const express = require("express");
const AccessLogController = require("./controllers/AccessLogController");


const routes = require("./routes");

migrationsRun();

const accessLogController = new AccessLogController();

const app = express();
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);


app.use(( error, request, response, next ) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
});

app.use(async (request, response, next) => {
    const { user_id, ip, action, device, browser, product, details } = request.body;

    await accessLogController.addAccessLog(user_id, ip, action, device, browser, product, details);

    next();
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is runnning on Port ${PORT}`));