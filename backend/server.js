const path = require('path');
const express = require('express');
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

// Serve front end
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler);

app.listen(port, () => console.log(`listening on port ${port}`));
