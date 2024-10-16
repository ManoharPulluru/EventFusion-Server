const express = require("express");
const app = express();
const UserData = require("../Schemas/createUser");

app.use(express.json());

// Endpoint to delete a specific event based on userId and eventId
app.delete("/deleteEvent/:userId/:eventId", async (req, res) => {
  try {
    const { userId, eventId } = req.params; // Extract userId and eventId from the route parameters

    // Find the user by their 'id' field in the database
    const user = await UserData.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out the event to be deleted
    const initialEventCount = user.createdEvents.length;
    user.createdEvents = user.createdEvents.filter(event => event.eventId !== eventId);

    // Check if the event was found and deleted
    if (user.createdEvents.length === initialEventCount) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Save the updated user document back to the database
    await user.save();

    // Return a success response
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting the event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
