const express = require('express')
const { uploadFile } = require('../controllers/file.controller')
const router = express.Router()

const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, 'uploads/')
  },
  filename: (req, file, next) => {
    next(null, file.originalname)
  }
})
const upload = multer({storage})

router.post('/upload', upload.single('file'), uploadFile)

module.exports = router