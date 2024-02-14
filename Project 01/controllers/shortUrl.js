const srs = require("secure-random-string");
const URL = require("../models/shortUrl");

const dateAndtime = () => {
    const date = new Date(Date.now());
    return date.toLocaleString();
}

async function handelUrlGenratings(req,res){
    const uid = srs({length : 6})
    const url = req.body.url;
    if(!url) return res.json({"mgs" : "Enter URL"})
    await URL.create({
        short_id : uid,
        redirect_url : url,
        visit_history : [],
        user : req.user._id
    })
    return res.render("redirect",{"url" : uid});
}

async function handelRedirect(req,res){
    const uid = req.params.uid;
    const data = await URL.findOneAndUpdate(
        {short_id : uid},
        {$push : {
            visit_history : {
                timestamp : dateAndtime()
            },
        }}        
        );
    if(!data) return res.json({"msg" : "Enter valid Short id"})
    return res.redirect(data.redirect_url);
}

async function handelAnalytics(req,res){
    const uid = req.params.uid;
    const data = await URL.findOne({short_id : uid});
    if(!data) return res.json({"msg" : "data not found"})
    return res.json({"Visits" : data.visit_history.length})
}

module.exports = {
    handelUrlGenratings,
    handelRedirect,
    handelAnalytics
}