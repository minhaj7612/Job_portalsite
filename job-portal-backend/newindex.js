
import express from "express";
const app = express();

app.get("/",function(req,res){
    res.send("hello");
});

app.listen(5000,()=>{
    console.log("Server is Running On Port 5000")
})




