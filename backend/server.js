const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3121;

const db = require("./config/database");
const JWT_SECRET = "mamoon";

const loginRouter = require("./routers/login")(db, JWT_SECRET);
const appointmentsRouter = require("./routers/appointmentsDoc")(db);
const childCardRouter = require("./routers/childCard")(db);
const childrenDoctorRouter = require("./routers/childrenDoctor")(db);
const motherChildCardRouter = require("./routers/childRoutesM")(db);
const AppointmentsManager = require("./routers/AppointmentsManager")(db);
const addUserRouter = require("./routers/user")(db);
const administrativeManagerRouter = require("./routers/AddManager")(db);
const measurementsRouter = require("./routers/MeaurementDoc")(db);

app.use(cors());
app.use(bodyParser.json());
app.use(loginRouter);
app.use(appointmentsRouter);
app.use(childCardRouter);
app.use(childrenDoctorRouter);
app.use(motherChildCardRouter);
app.use(AppointmentsManager);
app.use(addUserRouter);
app.use(administrativeManagerRouter);
app.use(measurementsRouter); // Use the measurements router

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
