const express = require("express");
const router = express.Router();

const Notification = require("../models/Notification");



// ================= GET CLUB NOTIFICATIONS =================

router.get("/:clubId", async (req, res) => {

    try {

        const notifications =
        await Notification.find({
            clubId: req.params.clubId
        })
        .sort({
            createdAt: -1
        });


        res.json(notifications);


    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

});




// ================= MARK NOTIFICATIONS AS READ =================

router.put("/read/:clubId", async (req, res) => {

    try {


        await Notification.updateMany(
            {
                clubId:req.params.clubId
            },
            {
                isRead:true
            }
        );


        res.json({

            success:true,

            message:
            "Notifications marked as read"

        });


    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

});



module.exports = router;