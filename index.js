require("dotenv").config();


const express= require('express')
const {connectTOMongoDB}=require('./connect')
const cookieParser= require('cookie-parser')
const URL=require('./model/url')
const path=require('path')
const {restrictToLoggedInUserOnly,checkAuth} =require('./middleware/auth')



//---------------ROUTES--------------------------
const urlRoute=require("./routes/url")
const staticRouter=require("./routes/staticrouter")
const userRoute=require("./routes/user")

//--------------------------------------------------


const app=express();
const PORT= process.env.PORT || 8000;

connectTOMongoDB(process.env.MONGO_URL) //mongodb://localhost:27017/short-url
.then( ()=>{
    console.log("Connected To MongoDB");
})

//=========================setting up templating engine=================================
app.set("view engine", "ejs");
app.set("views",path.resolve("./view"));

//Middleware to parse upcoming requests in JSON
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser()); 
//----------------------------------------Middleware end--------//

//====Routing=============


app.use("/url",restrictToLoggedInUserOnly,urlRoute);
app.use("/user",userRoute)
app.use("/",checkAuth,staticRouter);

//=======================







//===============================testing purpose only========================
// app.get("/test", async(req,res)=>{
//     const allurls=await URL.find({});
//     return res.render('home');
// })
//=================================testing ends here=========================



//=============get request to Redirect user to its shortID=================================//
app.get('/url/:shortid', async (req,res)=>{
    const shortId=req.params.shortid;
    const entry=await URL.findOneAndUpdate({shortId},{ $push: {
        visitHistory:{
            timestamp:Date.now(),
        },
    },
}
);
res.redirect(entry.redirectUrl);
});
//========================================================================================//





app.listen(PORT,()=>{
    console.log(`The Server is listening at port ${PORT}`);
});