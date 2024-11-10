
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json()); 
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from "public" directory


mongoose.connect(process.env.DB_URI, { 
    // useNewUrlParser: true, 
    // useUnifiedTopology: true 
})
.then(() => console.log("MongoDB is connected"))
.catch((err) => console.log("MongoDB connection error:", err));

// Import routes
const patientRoutes = require('./routes/patientRoutes');
app.use('/patients', patientRoutes); 


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
