const express= require("express");
const {handlegenerateshortUrl,handlegetAnalytics} = require("../controller/url");
const router = express.Router();

router.post("/",handlegenerateshortUrl);

// route.get("/",(req,res)=>{
//     res.send("home page");
// })
router.get("/analytics/:id",handlegetAnalytics)

module.exports = router;