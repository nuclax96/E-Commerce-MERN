// server.js
import express from 'express'
import mongoose from 'mongoose'
// const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection URI
const mongoURI = 'mongodb+srv://aditya94:mamVV14BDCgaeRpG@freecluster.kszumxd.mongodb.net/?retryWrites=true&w=majority&appName=FreeCluster'; // Change this to your MongoDB URI
// mongodb+srv://<username>:<password>@freecluster.kszumxd.mongodb.net/?retryWrites=true&w=majority&appName=FreeCluster
// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
