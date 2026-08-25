const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();



app.use(cors());

app.listen(4000, () => {
    console.log("server is runnnig at port 4000 ...");
})