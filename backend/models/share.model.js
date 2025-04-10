const { Schema, model, mongoose } = require("mongoose");

const shareSchema = new Schema(
  {
    file: { type: mongoose.Schema.Types.ObjectId, ref: "File", required: true },
    shareId: { type: String, required: true, unique: true },
    downloads: { type: Number, default: 0 },
    maxDownloads: { type: Number },
    expiresAt: { type: Date, required: true },
    password: { type: String },
    recipientEmail: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ShareModel = model("Share", shareSchema);

module.exports = ShareModel;
