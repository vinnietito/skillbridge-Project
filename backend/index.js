require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // Change to your MySQL username
    password: "",  // Change to your MySQL password
    database: "skillbridge"
});

db.connect(err => {
    if (err) throw err;
    console.log("✅ MySQL Connected...");
});

// 🔒 Register API
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
        [name, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ message: "Email already exists" });
            res.json({ message: "User registered successfully!" });
        }
    );
});

// 🔒 Login API
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
        if (err || result.length === 0) return res.status(400).json({ message: "Invalid email or password" });

        const validPassword = await bcrypt.compare(password, result[0].password);
        if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: result[0].id }, "secret", { expiresIn: "1h" });
        res.json({ token });
    });
});

// 📚 Fetch Courses API
app.get("/courses", (req, res) => {
    db.query("SELECT * FROM courses", (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(result);
    });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
