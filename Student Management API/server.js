const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./route');


const app = express();


app.use(express.json());
app.use(cors());

app.use("/api", require('./route'));



app.listen(4000, () => {
    console.log("server is runnnig at port 4000 ...");
})