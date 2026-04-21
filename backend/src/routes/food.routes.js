const express= require("express");
const foodController = require('../controller/food.controller');

const multer= require("multer");
const authMiddleware= require("../middlewares/auth.middleware");
const router = express.Router();


const uplaod =multer({
    storage : multer.memoryStorage(),
})
/* POST /api/food/ [protected] */
router.post('/',
    authMiddleware.authfoodParthnerMiddleware,
    uplaod.single("video"),
    foodController.createfood);

/*
GET /api/food/ [protected]
 */

router.get("/",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItem);



/* get  /api/food/food-partner/:id*/
// router.get("/food/partner/:id",authMiddleware.authUserMiddleware, foodController.getFoodPartnerById)


router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood);


router.post("/save",authMiddleware.authUserMiddleware,foodController.saveFood);

module.exports=router;