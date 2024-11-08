const express=require('express');
const {handleGenerateShortUrl, handleAnalyticsRoute}=require('../controller/url')
const router=express.Router();


//Routing to generate short url
router.post("/",handleGenerateShortUrl);

router.get('/analytics/:shortId', handleAnalyticsRoute)

module.exports=router;