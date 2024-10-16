const express = require("express");
const app = express();
const UserData = require("../Schemas/createUser");

app.use(express.json());

app.get("/getInvites/:userId", async (req, res) => {
  const { userId } = req.params; // Extract user email from the URL

  try {
    // Find the user by their email (userId is actually email)
    const user = await UserData.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user's invitations
    res.status(200).json({ invitations: user.invitations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while retrieving invitations" });
  }
});

module.exports = app;
