const express = require("express");
const app = express();
const UserData = require("../Schemas/createUser"); // Ensure this matches your schema

app.use(express.json()); // Ensure that the app can parse JSON request bodies

app.post("/registerUser", async (req, res) => {
  const { id, email, name, given_name, picture } = req.body;

  // Basic validation checks
  if (!id || !name || !given_name || !email || !picture) {
    return res.status(400).json({ message: "All fields are required." }); // Change to JSON response
  }

  try {
    // Check if the user already exists
    const user = await UserData.findOne({ id });

    if (user) {
      // User already exists; authenticate
      return res.status(200).json({ message: "User authenticated", user }); // Correctly return JSON
    }

    // User doesn't exist; create a new user
    const newUser = await UserData.create({
      id,
      email,
      name,
      given_name,
      picture,
      verified_email: true, // Set verified_email to true as per your initial object
    });

    return res.status(201).json({ message: "User registration successful!" }); // Return JSON message
  } catch (error) {
    console.error("===> Error during registration:", error);
    return res.status(500).json({ message: "Internal server error" }); // Return JSON error message
  }
});

module.exports = app;
