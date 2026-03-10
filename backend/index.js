require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express(); 
const connectDB = require("./config/db"); 
const issuesRoutes = require("./routes/issues"); 
const authRoutes = require("./routes/auth"); 
const commentRoutes = require("./routes/comments"); 
const rateLimit = require("express-rate-limit"); 
const userRoutes = require("./routes/users"); 
const cors = require("cors"); 
const PORT = process.env.PORT || 5000; 
app.set('trust proxy', 1);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests, please try again later.",
});

app.use(cors()); 
app.use(limiter);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/issues", issuesRoutes); 
app.use("/api/auth", authRoutes); 
app.use("/users", require("./routes/follow")); 
app.use("/users", userRoutes); 
app.use("/", commentRoutes); 

const startServer = async () => {
    try{
        await connectDB();
        app.listen(PORT, () => {
            console.log("LISTENING AT PORT 5000!"); 
        })
    } catch (err){
        console.log("Server failed to start:", err.message); 
    }
};

startServer(); 

