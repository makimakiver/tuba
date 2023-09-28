const express = require("express");
const fs = require('fs');
const app = express();
const postRoute = require("./routes/posts")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const teamRoute = require("./routes/team")
const AIRoute = require("./routes/AI")
const uploadRoute = require("./routes/upload")
const otpRoute = require("./routes/otp")
const path = require("path")
const PORT = 5000;
const mongoose = require("mongoose");
// import dotenv file to protect my password from third party
require("dotenv").config();
// connecting to database
// protecting password from being revealed to third party
mongoose.connect(process.env.MONGOURL)
    .then(()=>{console.log("connected");})
    .catch((err)=>{console.log(err);})
// identify whether it is connected if it is connected it will return "connected"
// if not then it will return error

// midle-ware set up
app.use("/images", express.static(path.join(__dirname,"public/images")))
app.use(express.json())
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/team", teamRoute);
app.use("/api/AI", AIRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/otp", otpRoute);

// app.get("/", (req,res) => {
//     res.send(" can u hear me? ")
// })
app.listen(PORT, ()=> console.log("server is activated"));
