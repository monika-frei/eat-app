const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const recipesRoutes = require("./api/routes/recipes");
const planRoutes = require("./api/routes/plan");
const userRoutes = require("./api/routes/user");

mongoose.connect(
  "mongodb+srv://Admin:Admin123@cluster0.tzokx.mongodb.net/recepieApp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use("/recipes", recipesRoutes);
app.use("/plan", planRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.staus || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
app.get('/', (req, res) => { res.send('Hello from Express!')


module.exports = app;
