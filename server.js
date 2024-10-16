const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const registerUser = require("./Middlewares/registerUser");
const createEvent = require("./Middlewares/createEvent"); // Ensure this contains the createEvent route
const getUserEvents = require("./Middlewares/getUserEvents");
const deleteEvent = require("./Middlewares/deleteEvent");
const inviteByEmai = require("./Middlewares/inviteByEmail");
const acceptInvite = require("./Middlewares/acceptInvite");
const getInvites = require("./Middlewares/getInvites");


const port = process.env.PORT || 4000;
const databaseURL = process.env.DATABASE_URL;

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(databaseURL)
  .then(() => {
    app.listen(port, () => {
      console.log("Server Started on port " + port);
    });
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("===> Errors", err);
  });

app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/user", registerUser);
app.use("/user", createEvent); // Ensure this middleware exports the correct router
app.use("/user", getUserEvents);
app.use("/user", deleteEvent);
app.use("/user", inviteByEmai);
app.use("/user",acceptInvite)
app.use("/user", getInvites)
