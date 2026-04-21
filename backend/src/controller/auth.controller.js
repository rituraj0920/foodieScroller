const userModel =require('../models/user.model');
const foodPartnerModel=require("../models/foodpatner.model");
const bcrypt=require("bcryptjs");
const jwt =require('jsonwebtoken');
require('dotenv').config();

async function registerUser(req, res){
    const {fullName, email , password}= req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"user already exists"
        })
    }
     const hashedPassword=await bcrypt.hash(password, 10);

    const user =await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })
  
    const token =jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(201).json({
        message:"user registered successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName: user.fullName
        }
    })
   
}

async function loginUser(req, res){

    const {email, password}=req.body;
    const user= await userModel.findOne({
        email
    })


    if(!user){
        res.status(400).json({
            message:"invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password , user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: "invalid email or password"
        })
    }

    const token =jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(200).json({
        message:"login successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName: user.fullName
        }
    })



}

function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"user logged out successfully "
    });
}


async function registerFoodPartner(req,res){

    const {businessname , email, password}=req.body;

    const isAccountAlreadyExists=await foodPartnerModel.findOne({
        email
    })

    if(isAccountAlreadyExists){
        return res.status(400).json({
            message:"food partner account already exists"
        })
    }

     const hashedPassword=await bcrypt.hash(password, 10);

     const foodPartner = await foodPartnerModel.create({
        businessname, 
        email,
        password: hashedPassword
     })

     const token= jwt.sign({
        id: foodPartner._id,
     },process.env.JWT_SECRET);

     res.cookie("token",token);

     res.status(201).json({
        message:"food partner registered successfully ",
        foodPartner : {
            _id:foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.businessname,
        }
     })


}


async function loginFoodPartner(req,res){

    const {email , password}=req.body;

    const foodPartner =await foodPartnerModel.findOne({
        email
    })

    if(!foodPartner){
        return res.status(400).json({
            message:"invalid email or paasword "
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);


    if(!isPasswordValid){
        return res.status(400).json({
            messsage:"invalid email or password"
        })
    }

    const token =jwt.sign({
        id: foodPartner._id,
    },process.env.JWT_SECRET);

    res.cookie("token",token)

    res.status(200).json({
        message:"foodPartner logged successfully",
        foodPartner:{
            _id:foodPartner._id,
            email:foodPartner.email,
            name:foodPartner.name

        }
    })
}

function logoutFoodPartner(req,res){

    res.clearCookie("token");
    res.status(200).json({
        message:"food partner logged out successfully "
    });
}


module.exports ={
    registerUser, loginUser,logoutUser,registerFoodPartner,loginFoodPartner,logoutFoodPartner
}
