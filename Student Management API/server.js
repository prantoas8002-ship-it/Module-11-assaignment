const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();


app.use(express.json());
app.use(cors());

app.use("/api", require('./route'));

const MONGO_URI = process.env.MONGO_URI;



const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("database connected successfully");
    } catch (error) {
        console.log("error connecting database");
        console.log(error);
    }
}



app.listen(4000, async () => {
    await connectToDatabase();
    console.log("server is runnnig at port 4000 ...");
})