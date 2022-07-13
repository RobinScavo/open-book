const express = require('express');
// const colors = require('colors');
const dotenv = require('dotenv').config();
const cors = require("cors");
const { errorHandler } = require('./middleware/error');
const connectDB = require('./config/db')
const users = require('./routes/usersRoute');
const decks = require('./routes/decksRoute');

const port = process.env.PORT || 8080;

connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cors())

app.use('/decks', decks)
app.use('/users', users);

app.use(errorHandler);

app.listen(port, () => console.log(`listening on port ${port}`));
