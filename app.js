const express = require("express");
require("./config/db/db");

const driverRoutes = require("./routes/users");
const associationRoutes = require("./routes/associations");
const contributionRoutes = require("./routes/contributions");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "success", message: "Welcome to AKU API 👋🏾" });
});

app.use("/api/v1/drivers", driverRoutes);
app.use("/api/v1/associations", associationRoutes);
app.use("/api/v1/contributions", contributionRoutes);

app.use((req, res, next) => {
  const error = new Error("Route Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: "error",
    message: error.message,
  });
  next();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));

module.exports = app;
