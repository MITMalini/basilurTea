const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const operatorsRoutes = require("./routes/operators.routes.js");
const errorsRoutes = require("./routes/errors.routes.js");
const supervisorRoutes = require("./routes/supervisors.routes");
const technicianRoutes = require("./routes/technician.routes.js");
const qcRoutes = require("./routes/qc.routes.js");
const packingRoutes = require("./routes/packing.routes.js");
const changeoverRoutes = require("./routes/changeover.routes.js");
const userRoutes = require("./routes/users.routes.js");
const bagcountRoutes = require("./routes/bagcount.routes.js");
const breakdownRoutes = require("./routes/breakdown.routes.js");
const isbreakdownRoutes = require("./routes/isbreakdown.routes.js");
const nomrnbreakdownRoutes = require("./routes/nomrnbreakdown.routes.js");
require("dotenv").config();

// app config
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//routes
app.use("/api/operators", operatorsRoutes);
app.use("/api/errors", errorsRoutes);
app.use("/api/supervisor", supervisorRoutes);
app.use("/api/technician", technicianRoutes);
app.use("/api/qc", qcRoutes);
app.use("/api/packing", packingRoutes);
app.use("/api/changeover", changeoverRoutes);
app.use("/api/user", userRoutes);
app.use("/api/bagcount", bagcountRoutes);
app.use("/api/breakdown", breakdownRoutes);
app.use("/api/isbreakdown", isbreakdownRoutes);
app.use("/api/mrnbreakdown", nomrnbreakdownRoutes);
// connect to db
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("mongodb connection successful");
  })
  .catch((error) => {
    console.log(error);
  });

//port
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
