import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  location: {
    lat: Number,
    lng: Number,
  },
  issueType: {
    type: String, // AI detected
    required: true,
  },
  status: {
    type: String,
    default: "Submitted",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
  },
});

export default mongoose.models.Issue ||
  mongoose.model("Issue", IssueSchema);
