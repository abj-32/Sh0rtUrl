const {v4:uuidv4} =require('uuid')
const User=require("../model/users")
const {setUser}=require("../services/auth")


async function handleUserSignUp(req,res){
    const { name, email,password}=req.body;

    await User.create({
        name,
        email,
        password
    });
    return res.redirect("/");
}


async function handleUserLogin(req,res) {
    const {email,password}=req.body;
    const user=await User.findOne( {email,password});
    if(!user) return res.render("login",{
            error:'Invalid email or password'
    }) 
    
    // const sessionId=uuidv4();
    // setUser(sessionId,user);
    // res.cookie("uid", sessionId);
    // res.redirect("/");

    const token=setUser(user);
    res.cookie("uid",token);
    return res.redirect("/");
}

module.exports={
    handleUserSignUp,handleUserLogin,
}