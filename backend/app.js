const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
mongoose.connect(process.env.DB)

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.listen(process.env.PORT || 8080, () => console.log(`🚀 Server is running on port: ${process.env.PORT || 8080} 🔥`))
const userRouter = require('./routes/user.route')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(cors({origin: 'http://localhost:5173'}))

app.use('/auth', userRouter)

