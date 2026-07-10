const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
{
    // Receiver Student
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },

    // Receiver Club
    clubId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Club",
        default:null
    },

    message:{
        type:String,
        required:true
    },

    type:{
        type:String,
        default:"GENERAL"
    },

    relatedEvent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        default:null
    },

    isRead:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});

module.exports =
mongoose.models.Notification ||
mongoose.model(
    "Notification",
    notificationSchema
);