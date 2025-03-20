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
    user: "root",
    password: "V@38080135k",
    database: "skillbridge"
});

db.connect(err => {
    if (err) throw err;
    console.log("✅ MySQL Connected...");
});


//Register API
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPasword = await bcrypt.hash(password, 10);

    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)"),
        [name, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ message: "Email already exists" });
            res.json({ message: "User registered successfully!" });
        }
    );
});