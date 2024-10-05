const shortid= require("shortid");

// const {} = require("nanoid");

// const shortid = require("node-url-shortener");
const URL = require("../model/url");

async function handlegenerateshortUrl(req,res) {
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error:"URL is required"});
    }
    const sID = shortid();
    await URL.create({
        shortID:sID,
        redirectURL:body.url,
        visitHistory:[] 
    })
    return res.render("home.ejs",{id:sID})

    // return res.json({id:sID});
}

async function handlegetAnalytics(req,res) {
    const shortID = req.params.id;
    const result = await URL.findOne({shortID});

    return res.json({
        TotalCliks:result.visitHistory.length,
        analytics:result.visitHistory
    });
}
module.exports ={
    handlegenerateshortUrl,
    handlegetAnalytics
}