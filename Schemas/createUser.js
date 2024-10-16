const mongoose = require("mongoose");

const userDataSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true, // Ensures that each user has a unique ID
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures that each email is unique
    match: /.+\@.+\..+/ // Basic email format validation
  },
  verified_email: {
    type: Boolean,
    default: false, // Default to false, can be updated to true when verified
  },
  name: {
    type: String,
    required: true,
  },
  given_name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  createdEvents: [Object], // Array of objects for created events
  invitations: [Object],    // Array of objects for invitations
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

module.exports = mongoose.model("UserData", userDataSchema);
