const mongoose=require('mongoose')
const uri="mongodb+srv://tamarM:Tt325389799@cluster0.d9f55rj.mongodb.net/"
const uriLocal = "mongodb://localhost:27017/toysDB";

const connectDB = async () => {
    await mongoose.connect(uri);
};
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})
database.once('connected', () => {
    console.log('Database Connected');
})

module.exports=connectDB;