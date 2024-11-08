const {v4:uuidv4}=require('uuid')
const express=require('express');
const URL=require("../model/url")
const staticRouter=express.Router();

staticRouter.get("/signup", (req,res)=>{
    res.render('signup');
});

staticRouter.get("/login", (req,res)=>{
    res.render('login');
});

staticRouter.get("/", async(req,res)=>{
    if(!req.user) return res.redirect('/login');
    const allurls= await URL.find({ createdBy:req.user._id})
    return res.render("home",{
        urls:allurls,
    });
})



module.exports=staticRouter;