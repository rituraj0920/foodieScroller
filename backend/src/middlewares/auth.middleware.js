const foodPartnerModel =require("../models/foodpatner.model");
const userModel=require("../models/user.model");
const jwt =require('jsonwebtoken');


async function authfoodParthnerMiddleware(req,res, next){
    const token = req.cookies.token;
    if(!token){
        return res.send(401).json({
            message:"plz login first"
        })
    }

    try{
      const decoded= jwt.verify(token , process.env.JWT_SECRET);

      const foodPartner= await foodPartnerModel.findById(decoded.id);

      res.foodPartner= foodPartner;

      next();
    }
    catch (err){
              return res.status(401).json({
                message:"invalid token "
              })  
    }
}

async function authUserMiddleware(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.send(401).json({
            message:"plz login first"
        })
    }

    try{
      const decoded= jwt.verify(token , process.env.JWT_SECRET);

      const user= await userModel.findById(decoded.id);

      res.user= user;

      next();
    }
    catch (err){
              return res.status(401).json({
                message:"invalid token "
              })  
    }
}

module.exports={
    authfoodParthnerMiddleware,
    authUserMiddleware
}