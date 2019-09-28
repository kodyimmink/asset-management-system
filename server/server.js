const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');

require('dotenv').config();

//Define Routes
const equipmentRouter = require('./routes/equipmentRoute');
const issuesRouter = require('./routes/issuesRoute');
const searchRouter = require('./routes/searchRoute');
const siteRouter = require('./routes/siteRoute');
const authRouter = require('./routes/authRoute');


//App and DB Setup
const app = express();
const port = process.env.PORT || 5000;
const connection  = mongoose.connection;
const dbUri = process.env.ATLAS_URI;


//Connect to Database
mongoose.connect(dbUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
connection.once('open', ()=> {
    console.log("MongoDB database connection established successfully")
});


//Middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json());


//Route Middleware
app.use('/equipment', equipmentRouter);
app.use('/issues', issuesRouter);
app.use('/search', searchRouter);
app.use('/site', siteRouter);
app.use('/auth', authRouter);


//App
app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
});