const express = require("express");
const app = express();
const UserData = require("../Schemas/createUser");

app.use(express.json());

app.post("/accept", async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    // Find the user by userId or email
    const user = await UserData.findOne({ id: userId }); // Assuming you're passing email instead of ObjectId
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the event in the user's invitations array
    const eventIndex = user.invitations.findIndex(
      (invitation) => invitation.eventId === eventId
    );

    if (eventIndex === -1) {
      return res.status(404).json({ error: "Event not found in invitations" });
    }

    // Get the event and set accepted to true
    const event = { ...user.invitations[eventIndex], accepted: true };

    // Remove the event from invitations
    user.invitations.splice(eventIndex, 1);

    // Add the event to createdEvents
    user.createdEvents.push(event);

    // Save the updated user data
    await user.save();

    res.status(200).json({ message: "Event accepted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while accepting the event" });
  }
});

module.exports = app;
