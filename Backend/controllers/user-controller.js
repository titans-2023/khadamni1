const User=require('../model/User');

const sendEmail= require('../utils/sendMail');
const crypto=require('crypto');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const Token = require("../model/token");
// const sessionStorage = require('node-sessionstorage');



// sessionStorage.setItem('JWT',process.env.JWT_SECRET_KEY);
// console.log('MY JWT is',sessionStorage.getItem('JWT'));
// sessionStorage.removeItem('JWT');
// // sessionStorage.clear();

// const signup=async(req,res,next)=>{
//     const{name,email,password}=req.body;
//     let existingUser;
//     try{
//         existingUser=await User.findOne({email:email});
//     }catch(err){
//         console.log(err); 
//     }
//     if(existingUser){
//         return res.status(400).
//         json({message:"user already exists ! Login Instead"})
//     }

//     const hashedPassword=bcrypt.hashSync(password);




//     const user=new User({
//         name,//name:name
//         email,
//         password:hashedPassword
//     });
           

//     try{
//         await user.save();
//     } catch(err){
//          console.log(err);
//      }
//     return res.status(201).json({message:user})
// }
//____________________

const login=async (req,res,next)=>{
    const{email,password}=req.body;
    let existingUser;
    try{
        existingUser= await User.findOne({email:email});
        
    }catch(err){
        return new Error(err);
    }
    if(!existingUser){
        return res.status(400).json({message:"User not found.Signup Please"})
    }
    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid Email or Password"})
    }

    ///--Resend Link if not verified--//
    if(!existingUser.verified){
        let token = await Token.findOne({ userId: existingUser._id });
              if (!token) {
                  token = await new Token({
                      userId: existingUser._id,
                      token: crypto.randomBytes(32).toString("hex"),
                  }).save();
                  const url = `${process.env.BASE_URL}user/${existingUser.id}/verify/${token.token}`;
                  await sendEmail(existingUser.email, "Verify Email", url);
              }
              return res
                  .status(400)
                  .send({ message: "An Email sent to your account please verify" });
            }
//
    const token=jwt.sign({id:existingUser._id},process.env.JWT_SECRET_KEY,{
    expiresIn:"35s" //le token youfa après 30 secondes
    });
    if(req.cookies['${existingUser._id}']){
        req.cookies['${existingUser._id}']=""
    }
    console.log("Generated Token\n",token)

    res.cookie(String(existingUser._id),token,{
        path:'/',
        expires:new Date(Date.now()+1000 * 30),
        httpOnly:true, //plus sécurisé
        sameSite:'lax'
    });
    

    return res.status(200).json({message:"Successfully Logged In",user:existingUser,token})
}
//_____________________
const verifyToken=(req,res,next)=>{
    const cookies=req.headers.cookie;
    
    const token=cookies.split("=")[1]//first index
    console.log(token);
    
 
    if(!token){
    res.status(404).json({message:"No Token Found"})
     }
    jwt.verify(String(token),process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
            res.status(404).json({message:"iNVALID TOKEN"})
        }
        console.log(user.id);
        req.id=user.id;
     });
     next();
};
//_____________________________
const getUser=async(req,res,next)=>{
    const userId=req.id;
    let user;
    try{
        user=await User.findById(userId,"-password");
    }catch(err){
        return new Error(err)
    }
    if(!user){
        res.status(404).json({message:"User Not Found"})
    }
    res.status(200).json({user});

}
//___________________
const refreshToken=(req,res,next)=>{
    const cookies=req.headers.cookie;
    const prevToken=cookies.split("=")[1]//first index
    if(!prevToken){
        return res.status(400).json({message:"Couldn't find token"})
    }
    jwt.verify(String(prevToken),process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
            console.log(err);
            return res.status(403).json({message:"Authentication Failed"})
        }
        res.clearCookie('${user.id}');
        req.cookies['${user.id}']="";

        const token=jwt.sign({id:user.id},process.env.JWT_SECRET_KEY,{
            expiresIn:"35s"//generation nouveau token
    });
    console.log("Regenerated Token\n",token);
    res.cookie(String(user.id),token,{
        path:'/',
        expires:new Date(Date.now()+1000 * 30),
        httpOnly:true, //plus sécurisé
        sameSite:'lax'
    });
    req.id=user.id;
    next();
})
}
//_____________________
const logout = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
      }
      res.clearCookie('${user.id}');
      req.cookies[`${user.id}`] = "";
      return res.status(200).json({ message: "Successfully Logged Out" });
    });
  };

//_______________________________________

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = bcrypt.hashSync(password);
      let user = new User({
        name,
        email,
        password: hashedPassword
      });
      user=await user.save();
      ///----//
      const token = await new Token({
              userId: user._id,
              token: crypto.randomBytes(32).toString("hex"),
          }).save();
  
          const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
          await sendEmail(user.email, "Verify Email", url);
      return res
        .status(201)
        .send({ message: "An Email sent to your account please verify" });
      ///-----------------------------///
    } catch (err) {
      console.log(err);
      console.log(err.response);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };

//
const verifyLink = async (req, res, next) => {
    const token = req.params.token;
    if (!token) {
      return res.status(400).send({ message: "Invalid URL" })
    }
    try {
      const verifiedToken = await Token.findOne({ token });
      if (!verifiedToken) {
        return res.status(400).send({ message: "Invalid URL or expired" });
      }
      const userId = verifiedToken.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).send({ message: "User does not exist" });
      }
      user.verified = true;
      await user.save();
      if (verifiedToken && typeof verifiedToken.remove === 'function') {
        await verifiedToken.remove();
      }
      return res.status(200).send({ message: "Email verified successfully" });
    } catch (err) {
        
      console.log(err);
      return res.status(500).send({ message: "Internal server error" });
    }
  };
//

exports.signup=signup;
exports.login=login;
exports.verifyToken=verifyToken;
exports.getUser=getUser;
exports.refreshToken=refreshToken;
exports.logout=logout;
exports.verifyLink =verifyLink ;


