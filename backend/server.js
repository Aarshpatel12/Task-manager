const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Password secure karne ke liye
const jwt = require('jsonwebtoken'); // Token ke liye

const app = express();
app.use(express.json());
app.use(cors());

// --- DATABASE CONNECTION (Apna purana link use karna) ---
const dbURI = "mongodb+srv://admin:fByKTQcGKXT8KT7O@taskmanager.gyltg0u.mongodb.net/?appName=taskmanager";
mongoose.connect(dbURI);

// --- SCHEMAS ---

// 1. User Schema (Login ke liye)
const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});
const UserModel = mongoose.model("users", UserSchema);

// 2. Task Schema (Ab isme email bhi store hoga)
const TaskSchema = new mongoose.Schema({
    email: String, // Ye batayega ki task kiska hai
    todo: String,
    done: { type: Boolean, default: false }
});
const TaskModel = mongoose.model("tasks", TaskSchema);


// --- ROUTES ---

// REGISTER (Naya user banana)
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Password ko encrypt kar rahe hain
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({ email, password: hashedPassword });
        res.json(newUser);
    } catch (err) {
        res.json({ error: "Email already exists or error" });
    }
});

// LOGIN (User check karna)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            // Password match kar rahe hain
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                res.json("Success");
            } else {
                res.json("Wrong password");
            }
        } else {
            res.json("User not found");
        }
    } catch (err) {
        res.json(err);
    }
});

// GET TASKS (Sirf us user ke tasks laao)
app.get('/get/:email', (req, res) => {
    const { email } = req.params;
    TaskModel.find({ email: email }) // Filter by email
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// ADD TASK (User ki email ke saath save karo)
app.post('/add', (req, res) => {
    const { task, email } = req.body;
    TaskModel.create({ todo: task, email: email })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// UPDATE aur DELETE waisa hi rahega (bas ID chahiye hoti hai)
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TaskModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TaskModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// Port Logic
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Server Running"));