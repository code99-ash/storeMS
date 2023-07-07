const mongoose = require('mongoose')

// const connectMongoose = async () => {
//     try {
//         await mongoose.connect(
//             process.env.DB_CONNECT, 
//             {useNewUrlParser: true,useUnifiedTopology: true},
//         );
//         console.log('Connected to db')
//     } catch (error) {
//         console.log('error connecting to db', error)
//     }
// }
const connectMongoose = async () => {
    try {
        await mongoose.connect('mongodb://mongodb:27017/storems', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log('Connected to db')
    } catch (error) {
        console.log('error connecting to db', error)
    }
}

module.exports = connectMongoose