// quickshare.controller.js
const Share = require('../models/share.model');
const File = require('../models/file.model');
const { v4: uuidv4 } = require('uuid');

console.log(uuidv4())

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Create file record
    const file = await File.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      isPublic: false
    });
    
    console.log(file)
    
    res.status(201).json({
      message: 'File uploaded successfully',
    });
    
  } catch (error) {
    console.error('Error in file upload:', error);
    res.status(500).json({ message: 'Server error during upload' });
  }
};

module.exports = {
  uploadFile
}