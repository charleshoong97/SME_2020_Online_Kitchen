const mongoose = require("mongoose");


const recepiOrderSchema = new mongoose.Schema(
    {
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        title: {
            type: String,
        },
        recipe:{
            type: String,
        },
        price:{
            type: String,
        },
        status: {
            type:String,
            enum: ['1','2','3','4','5','6','7']
        },
        message:{
            type:[[String]] 
        },
        client_update_ddate:{
            type:Date,
        },
        admin_updated_date:{
            type:Date,
        }
    },
    { collection: "recipe_order" }
);


module.exports = mongoose.model("RecipeOrder", recepiOrderSchema)


  