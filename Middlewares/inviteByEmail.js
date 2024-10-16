const express = require("express");
const app = express();
const UserData = require("../Schemas/createUser");

app.use(express.json());

app.post("/invite", async (req, res) => {
  const { fromUser, toUser, eventId } = req.body;

  try {
    // Find the user who created the event
    const fromUserData = await UserData.findOne({ id: fromUser });
    if (!fromUserData) {
      return res.status(404).json({ error: "From user not found" });
    }

    // Find the event in fromUser's createdEvents
    const event = fromUserData.createdEvents.find((event) => event.eventId === eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found for the user" });
    }

    // Find the user to invite
    const toUserData = await UserData.findOne({ email: toUser });
    if (!toUserData) {
      return res.status(404).json({ error: "To user not found" });
    }

    // Add the event to the toUser's invitations array with an initial status of false
    const invitation = {
      ...event, 
      accepted: false // Add this flag to allow future actions like accepting/rejecting
    };

    toUserData.invitations.push(invitation);

    // Save the updated user data
    await toUserData.save();

    res.status(200).json({ message: "Invitation sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while sending the invitation" });
  }
});

module.exports = app;
