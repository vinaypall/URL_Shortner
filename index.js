const express = require("express");
const Urlroutes = require("./routes/url");
const {connectToMogodb} = require("./connection");
const app = express();
const path  =  require("path");

const staticRoute = require("./routes/staticRoutes");
const URL = require("./model/url");

app.use(express.json());
app.use(express.urlencoded({ extended:false }));

//connection mongodb
connectToMogodb("mongodb://127.0.0.1:27017/shorturl")
.then(()=>{
    console.log("Mongodb connected...") 
})

// set view engine
app.set("view-engine","ejs");
app.set("views",path.resolve("./views"));

app.use("/",staticRoute);

//routes
app.use("/url", Urlroutes);

app.get("/url/:id",async (req,res)=>{  
    const shortID = req.params.id;
    const result =  await URL.findOneAndUpdate({
        shortID
    },{ $push:{
        visitHistory:{
            timestamp:Date.now()
        },
    } })
    res.redirect(result.redirectURL);

});

app.listen(3000 , ()=>{
    console.log(`Server Started..`);
});
// app.get("/:id",async (req,res)=>{
//     const shortId=req.params.id;
//     const entry =await URL.findOneAndUpdate({
//         shortId
//     },{$push:{visitHistory:{
//         timestamp:Date.now()
//     }}})
//     res.redirect(entry.redirectURL);
// })