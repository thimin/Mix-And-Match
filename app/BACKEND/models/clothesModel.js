const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the category enum
const CategoryEnum = ["F", "M"];

const stockSchema = new Schema({
    item_code: {
        type : String,
        required: true
    },
    
    item_name:{
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: CategoryEnum,
        required: true  
    },
    
    quantity:{
        type: Number,   
        required: true
    },

    price:{
        type: Number,
        required: true  
    },

    alert_quantity:{
        type: Number,
        required: true  
    },

    supplier_id: {
        type : String,
        required: true  
    },

    imageUrl: {
        type: String,
        required: true  
    }
    
})

const clothes = mongoose.model("clothes", stockSchema);
module.exports = clothes;