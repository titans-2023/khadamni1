const cookieSession = require('cookie-session');
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const router=require('./routes/user-routes')
const authRoute = require("./routes/auth");
const passwordResetRoutes=require('./routes/passwordReset');
const cookieParser=require('cookie-parser');

const port=5000;
const app=express();
require('dotenv').config()
const session = require('express-session');
const passport = require('passport');
const passportSetup=require("./utils/passport")
// const session = require("express-session");

app.use(cors({credentials:true,origin:"http://localhost:3000",
methods:"GET,POST,PUT,DELETE"}));
app.use(cookieSession({
    name:"session",
    keys:["lama"] ,
    maxAge:24*60*60*100
}));
app.use("/auth", authRoute);
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());//le type des données sera json
app.use('/api',router);
app.use('/api/password-reset',passwordResetRoutes);
// app.use(session({
//     secret: 'bla bla',
//     resave: false,
//     saveUninitialized: true
//   }));





mongoose.
connect("mongodb+srv://admin:2i7XEzFMAZHnRl5H@cluster0.5gv7uwi.mongodb.net/auth?retryWrites=true&w=majority").
then(()=>{
app.listen(port);
console.log("Database is connected!Listening to localhost 5000");
}).catch((err)=>console.log(err));

//${process.env.MONGODB_PASSWORD}
//name of the database:auth
