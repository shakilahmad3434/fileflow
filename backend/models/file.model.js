const { Schema, model, mongoose } = require("mongoose");

const fileSchema = new Schema({
  filename: { 
    type: String, 
    required: true,
    lowercase: true
  },
  originalName: { 
    type: String, 
    required: true 
  },
  mimetype: { 
    type: String, 
    required: true 
  },
  size: { 
    type: Number, 
    required: true 
  },
  path: { 
    type: String, 
    required: true 
  },
  storageProvider: {
    type: String,
    enum: ["local", "s3", "cloudinary"],
    default: "local",
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  isPublic: { 
    type: Boolean, 
    default: false 
  },
  metadata: { 
    type: mongoose.Schema.Types.Mixed 
  },
}, {timestamps: true});

const FileModel = model("File", fileSchema);

module.exports = FileModel;
