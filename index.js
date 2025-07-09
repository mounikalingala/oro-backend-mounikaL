const express = require("express")
const rateLimit = require('express-rate-limit');
const urlRoutes = require("./routes/urlRouts");
const connectDB = require("./routes/database");
require('dotenv').config();

const app = express()
app.use(express.json())

connectDB()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100
});
app.use(limiter);

app.use('/', urlRoutes);

app.listen("3000", (req, res) => console.log("server is running"))
