const express = require("express");

const routes = require("./routes/index");

const app = express();
app.use(express.json());



const PORT = 3333;
app.listen(PORT, () => console.log(`Server is runnning on Port ${PORT}`));