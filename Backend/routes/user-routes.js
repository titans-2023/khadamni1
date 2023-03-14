const express=require('express');

const passport=require("passport")
const { signup,login, verifyToken, getUser, refreshToken, logout, verifyLink} = require('../controllers/user-controller');
const CLIENT_URL="http://localhost/3000/auth"
const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/user",verifyToken,getUser)
router.get("/refresh",refreshToken,verifyToken,getUser)
router.post("/logout",verifyToken,logout)
router.get("/user/:id/verify/:token",verifyLink );
// router.get("/google",passport.authenticate("google",{scope:["profile"]}));
// router.get("/google/callback",passport.authenticate("google",{
//    successRedirect:CLIENT_URL,
//    failureRedirect:"login/failed"
// }))

// router.get("login/success",(req,res)=>{
  
//     if(req.user){
//     res.status(200).json({
//         success:true,
//         message:"successfull",
//         user:req.user,
//         // cookies:req.cookies
    
//     });
// }
// })

// router.get("login/failed",(req,res)=>{
//     res.status(401).json({
//         success:false,
//         message:"failure",
//     });
// });
// router.get("/logout/google",(req,res)=>{
//     req.logout();
//     res.redirect(CLIENT_URL);
// })
// //verify token :il permet aux utilisateurs de rester connectées


module.exports=router