import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true, // fixed typo: `require` -> `required`
  },
  to: { type: String, required: true },
  subject: { type: String, required: true },
  text: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
});

// auto-expire documents after 30 days
emailSchema.index({ sentAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

const Email = mongoose.models.Email || mongoose.model("Email", emailSchema);
export default Email;
