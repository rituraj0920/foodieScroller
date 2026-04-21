const mongoose =require('mongoose');

const foodPartnerSchema = new mongoose.Schema({
    
        
        businessname:{
            type:String,
            required: true
        },
        email: {
            type:String,
            required:true,
            unique : true,
    
        },
    
        password: {
            type:String,
        }
    }
    
    )


const foodPartnerModel = mongoose.model("food", foodPartnerSchema);

module.exports= foodPartnerModel;