const express= require("express");
const router = express.Router();
const Urlroutes = require("./url");
const URL = require("../model/url");


router.get("/",async(req,res)=>{
  const allUrls = await URL.find({});
  return res.render("home.ejs",{
    urls:allUrls,
  });
})

module.exports = router;