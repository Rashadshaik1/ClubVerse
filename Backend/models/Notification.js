const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
{
    clubId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Club",
        required:true
    },

    message:{
        type:String,
        required:true
    },

    type:{
        type:String,
        default:"GENERAL"
    },

    isRead:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Notification",
    notificationSchema
);