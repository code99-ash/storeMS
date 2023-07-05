const express = require('express')
const cors = require('cors')
const connectMongoose = require('./config/mongoose')
const fileupload = require('express-fileupload')

require('dotenv').config()

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}))
app.use(fileupload({ useTempFiles: true }));
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Routes
app.use('/api/images', express.static('uploads'))
app.use('/api/products', require('./routes/products.js'))
app.use('/api/orders', require('./routes/orders.js'))



const PORT = process.env.PORT

app.listen(PORT, async() => {
    await connectMongoose()
    console.log(`Server running on port ${PORT}`)
})