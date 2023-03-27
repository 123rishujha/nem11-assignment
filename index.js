const express = require("express");
const cors = require('cors');
require("dotenv").config();



const { connection } = require("./connection");
const { userRoute } = require("./routes/users.route");
const { postRouter } = require("./routes/posts.route");

//authorization middleware
const { authMiddleware } = require("./middlewares/auth.middleware");


const app = express();


app.use(express.json());
app.use(cors());
app.use("/users",userRoute);
app.use(authMiddleware);
app.use("/posts",postRouter);




app.listen(process.env.port,async(req,res)=>{
    try{
        await connection
        console.log("connected to database");
    }
    catch(err){
        console.log("Not connected to database");
    }
    console.log(`running on port ${process.env.port}`);
})


