import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json" assert { type: "json" };

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(cors());
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});

app.use(cors());
app.options("*", cors());

import connectDB from "./app/config/db.config.js";
import router from "./app/router/router.js";
app.use("/api", router);
connectDB();

let server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});

export default app;
