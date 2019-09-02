const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const connection  = mongoose.connection;
const dbUri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());

//Database
mongoose.connect(dbUri, { useNewUrlParser: true, useCreateIndex: true});

connection.once('open', ()=> {
    console.log("MongoDB database connection established successfully")
});

//Routers
const equipmentRouter = require('./routes/equipmentRoute');

app.use('/equipment', equipmentRouter);



//App
app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
});

