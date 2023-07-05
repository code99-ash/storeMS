const express = require('express')
const cors = require('cors')
const connectMongoose = require('./config/mongoose')

require('dotenv').config()

const app = express();

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Routes
app.use('/api/v2/auth', require('./routes/auth.js'))

const PORT = process.env.PORT

app.listen(PORT, async() => {
    await connectMongoose()
    console.log(`Server running on port ${PORT}`)
})