const express = require("express");
const app = express();
// const uploadImage = require("./src/middlewares/uploadImage");
const Course = require("./src/models/Course");
const cors = require("cors");
const router = require("./src/routes/routes");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");

  app.use(cors({ origin: "*" }));
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get("/", async (req, res) => {
  res.send("Página inicial - MIND");
});

app.listen(5000, function () {
  console.log("Servidor inicado na porta 5000: http://localhost:5000");
});
