import express from "express";
import { consumeEvent } from "./event/event";
import Product from "./model/product.model";
import { colorLog, middlewareRoleManager } from "./utility/helper/helper";
import Review from "./model/product.review";
import Image from "./model/product.image";
import productCategory from "./model/product.category";
import equipmentCategory from "./model/equipment.category";
import router from "./routes/admin";
import chemicalCategory from "./model/chemical.category";
import chemicalRouter from "./routes/chemicals";
import equipmentRouter from "./routes/equipment";
import farmerRoute from "./routes/farmer";
const sessions = require("express-session");
require("express-async-errors");
const jwt = require("jsonwebtoken");
const sequelize = require("./database/database");


require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/product/admin", middlewareRoleManager("admin"), router);
app.use("/product/pesticide", middlewareRoleManager("agricultural_chemicals"), chemicalRouter);
app.use("/product/farmer", middlewareRoleManager("farmer"), farmerRoute);
app.use("/product/equipment", middlewareRoleManager("equipment_manufacturers"), equipmentRouter);



// farmer,agricultural_chemicals,equipment_manufacturers
const port = process.env.PORT || 3000;

app.use(
  sessions({
    secret: "4d853da66e6e8g447f80d1a1ad24c4bf8f9a5c62ad2n65e7f94fb5a9b7y1093e",
    resave: false,
    saveUninitialized: true,
  })
);
// Creating all the tables defined in user
sequelize
  .sync()
  .then((result: any) => {
    console.log("result");
  })
  .catch((err: any) => {
    console.log("error");
  });

async function syncDatabase() {
  try {
    await Product.sync({ force: true });
    await Review.sync({ force: true });
    await Image.sync({ force: true });
    await productCategory.sync({ force: true });
    await equipmentCategory.sync({ force: true });
    await chemicalCategory.sync({ force: true });
  } catch (error) {
    console.log(colorLog("Error while create table", "FgRed"));
  }
}
syncDatabase();

async function establishConnection() {
  await consumeEvent()
    .then((result) => {
      console.log(colorLog(result, "BgGreen"));
    })
    .catch((error) => {
      console.error(error);
      setTimeout(() => {
        establishConnection();
      }, 200);
    });
}

app.listen(port, async () => {
  establishConnection();
  console.log(colorLog(`Order Service at ${port}`, "FgGreen"));
});