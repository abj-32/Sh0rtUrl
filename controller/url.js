const shortid= require('shortid');
const URL= require('../model/url');

//==Contoller function to Handle upcoming post requests======================================//
async function handleGenerateShortUrl(req, res){
    const body =req.body;
    if(!req.body.url) return res.status(400).json({ERROR:"URL IS REQUIRED"});
    const shortID=shortid.generate();

    await URL.create({
        shortId:shortID,
        redirectUrl:body.url,
        visitHistory:[],
        createdBy: req.user._id,
    });

    return res.render( "home",{
        id:shortID,
    })
    //return res.json({ id:shortID});
}
//=========================================================================================//



//===================Controller function to handle analytics information get request===============//
async function handleAnalyticsRoute(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne( {shortId});
    return res.json( {totalClicks:result.visitHistory.length, analytics:result.visitHistory});
}
//=================================================================================================//



module.exports={
    handleGenerateShortUrl,
    handleAnalyticsRoute
};