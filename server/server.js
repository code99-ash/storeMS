const express = require('express')
const cors = require('cors')
const connectMongoose = require('./config/mongoose')

require('dotenv').config()

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/hello', (req, res) => {
    res.send("<h1>Hello Buddy</h1>")
})

const PORT = process.env.PORT

app.listen(PORT, async() => {
    await connectMongoose()
    console.log(`Server running on port ${PORT}`)
})