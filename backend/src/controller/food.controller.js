const foodmodel= require("../models/food.model");
const stoageService = require("../services/storage.service");
const likeModel = require("../models/likes.model");
const {  v4:uuid}= require('uuid');
const foodModel = require("../models/food.model");
const saveModel= require("../models/save.model");

async function createfood(req,res){
  

    console.log(res.foodPartner);
  

    const fileUploadResult= await stoageService.uplaodFile(req.file.buffer,uuid());

    const foodItem = await foodmodel.create({
        name: req.body.name,
        description:req.body.description,
        video: fileUploadResult.url,
         foodPartner:res.foodPartner._id
        
    })

    res.status(201).json({
        message:"food created successfully",
        food: foodItem,
    })

    
}

async function getFoodItem(req,res){

    const foodItems = await foodmodel.find({});
    res.status(200).json({
        message:"food items fetched successfully ",
        foodItems
    })
}


async function likeFood(req, res){
    const {foodId}= req.body;

    const user= req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user:user._id,
        food:foodId
    })

    if(isAlreadyLiked){
        await likeModel.deleteOne({
            user:user._id,
            food:foodId
        })

        await foodModel.findByIdAndUpdate(foodId,{
        $inc:{ likeCount: -1}
        })

        return res.status(200).json({
            message:"food unliked successfully"
        })
    }

    

    const like = await likeModel.create({
        user:user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc :{likeCount : 1}
    })

    res.status(201).json({
        message: "Food liked successfully ",
        like
    })

}

async function saveFood(req, res){
    const {foodId}= req.body;

    const user =user ;
    
    const isAlreadySaved = await saveModel.findOne({
        user:user._id,
        food:foodId
    })

    if(isAlreadySaved){
        await saveModel.deleteOne({
            user:user._id,
            food:foodId
        })

       

        return res.status(200).json({
            message:"food unsaved successfully"
        })
    }

    

    const save = await saveModel.create({
        user:user._id,
        food: foodId
    })

    

    res.status(201).json({
        message: "Food saved successfully ",
        save
    })

    
}

module.exports={
    createfood,
    getFoodItem,
    likeFood,
    saveFood
}