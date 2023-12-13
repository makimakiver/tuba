const router = require("express").Router();
const User = require("../models/User")
const Message = require("../models/Message")
const { OpenAIApi, Configuration, default: OpenAI,} = require("openai");
const AIaccount = require("../models/AIaccount");


// router.get("/", (req, res) => {
//     res.send("post routerrrrr");
// });

router.post("/", async (req, res) => {
    try{              
        if (!(req.query.message)){
            return res.status(500).json("write something!")
        } else {
            const aiAccount = await AIaccount.findById(req.query.AIID)
            const addOne = aiAccount.count + 1
            const newAccount = await AIaccount.findByIdAndUpdate(req.query.AIID, {
                count: addOne,
            })
            if (req.query.pos === "user"){
                const chatHistory = await Message.find({userId: req.query.userId} || {AIID: req.query.AIID});
                let newMessage = await new Message({
                    message: req.query.message,
                    userId: req.query.userId,
                    sender: req.query.userId,
                    AIID: req.query.AIID,
                });     
                const savedMessage = await newMessage.save();

                return res.status(200).json(savedMessage)
            }else if (req.query.pos === "machine"){
                const chatHistory = await Message.find({userId: req.query.userId} || {AIID: req.query.AIID});
                let newMessage = await new Message({
                    message: req.query.message,
                    userId: req.query.userId,
                    sender: req.query.AIID,
                    AIID: req.query.AIID,
                });     
                const savedMessage = await newMessage.save();
            }
        }
    } catch(err){
        return res.status(500).json(err)
    }
});

router.delete("/history", async (req, res) => {
    // HTTP post request
    try{
        const chatHistory = await Message.find({userId: req.body.userId} || {AIID: req.body.AIID});
        console.log(chatHistory)
        if (post.userId == req.body.userId ) {
            await chatHistory.delete();
            // only if userID is same as their userID.
            return res.status(200).json("you managed to delete your posts")           
        }else{
            return res.status(403).json("cannot delete others post")
        }          
    } catch(err) {
        return res.status(500).json(err)
    }
    
    // }else if (!req.params.id){
    //     return res.status(404).json(err)
});

router.get("/", async (req, res) => {
    // HTTP post request
        try{
            const userId = req.query.userId
            const AIID = req.query.AIID
            const chatHistory = await Message.find({userId: userId} && {AIID: AIID});
            return res.status(200).json(chatHistory);                
        } catch(err) {
            return res.status(500).json(err)
        }
});

router.put("/", async (req, res) => {
    try {
        const accounts = await AIaccount.find({});
        if (accounts.length === 0) {
            return res.status(404).json({ message: "No accounts found." });
        }
        const updatePromises = accounts.map(account =>
            AIaccount.findByIdAndUpdate(account._id, { prevCount: account.count })
        );
        await Promise.all(updatePromises);
        return res.status(200).json({ message: "All accounts successfully updated.", updatedCount: accounts.length });
    } catch (err) {
        console.error(err); // More detailed error logging
        return res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router;
