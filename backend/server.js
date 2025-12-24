const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
// ✅ RIGHT
// Notice karo: Maine < > hata diye hain aur password daal diya hai.
// Maine '/' ke baad 'mern-todo' bhi add kiya hai taaki data sahi folder (DB) mein save ho.

const dbURI = "mongodb+srv://admin:fByKTQcGKXT8KT7O@taskmanager.gyltg0u.mongodb.net/?appName=taskmanager";

mongoose.connect(dbURI)
    .then(() => console.log("Connected to MongoDB Atlas!"))
    .catch((err) => console.log("Error connecting to Atlas:", err));

// Schema Definition
const TaskSchema = new mongoose.Schema({
    todo: String
});

const TaskModel = mongoose.model("tasks", TaskSchema);

// API Routes

// 1. Data Save karne ke liye (Create)
app.post('/add', (req, res) => {
    const task = req.body.task;
    TaskModel.create({ todo: task })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// 2. Data Lene ke liye (Read)
app.get('/get', (req, res) => {
    TaskModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// Server Start
// Render jo port dega use use karenge, nahi toh 3001
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});