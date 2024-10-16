const express = require("express");
const app = express();
const UserData = require("../Schemas/createUser");

app.use(express.json());

// Endpoint to get user events based on userId
app.get("/getUserEvents/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from the route parameters

    // Find the user by their 'id' field in the database
    const user = await UserData.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract 'createdEvents' from the user object
    const events = user.createdEvents || [];

    // Return the created events
    res.status(200).json({ events });
  } catch (error) {
    console.error("Error fetching user events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
