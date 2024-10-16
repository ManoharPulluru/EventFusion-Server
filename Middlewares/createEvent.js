const express = require("express");
const app = express();
const UserData = require("../Schemas/createUser"); // Ensure this matches your schema
const { v4: uuidv4 } = require("uuid");

app.use(express.json());

app.post("/createEvent", async (req, res) => {
  const { userId, summary, location, description, start, end, eventData } = req.body;

  // Create a new event object
  const newEvent = {
    eventId: uuidv4(), // Generate a unique ID for the event
    summary,
    location,
    description,
    start,
    end,
    eventData, // Include the entire eventData object as an additional field
  };

  try {
    // Find the user by the 'id' field and push the event into the createdEvents array
    const user = await UserData.findOneAndUpdate(
      { id: userId }, // Change this to use 'id' instead of default _id
      { $push: { createdEvents: newEvent } }, // Assuming 'createdEvents' is an array in your schema
      { new: true, useFindAndModify: false }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the newly created event
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = app;
