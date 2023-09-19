const router = require("express").Router();
// const { password } = require("pg/lib/defaults");
const User = require("../models/User");
const Key = require("../models/Key");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const UserOTP = require("../models/UserOTP");


function randomkey(){
    var key = "";
    for (let i = 0; i < 6; i++) {
        key += Math.floor(Math.random() * 10);
    }
    return key
}


router.post("/send", async (req,res) => {
    try{
        if(!req.body.email) {
            return res.status(500).json("you are not putting your code.")
        }else{
            const one_time_pad_key = randomkey()
            let transporter = nodemailer.createTransport({
                service: "Gmail",
                port: 465,
                auth: {
                    user: "yutaka3209@gmail.com",
                    pass: "jzqwrwloqxffcxsr",
                }
            })
            transporter.verify((error, success) => {
                if(error){
                    console.log(error)
                }else{
                    console.log(success)
                }
            });
            const mailOptions = {
                from: "yutaka3209@gmail.com",
                to: req.body.email,
                subject: "your otp",
                html: `<p>We greatly appreciate your decision to sign in to Tuba, our secure and user-friendly website. For enhanced security, we have generated a one-time pad key exclusively for you, which is displayed below:</p><p style="color: tomato; font-size:25px; "><b>${one_time_pad_key}</b></p>`,
            }
            const sendEmail = async (mailOptions) => {
                try{
                    await transporter.sendMail(mailOptions)
                    return mailOptions;
                }catch (error){
                    return error
                }
            };
            await sendEmail(mailOptions)
            try{  
                const newKey = await new UserOTP({
                    email: req.body.email,
                    otp: one_time_pad_key,
                });          
                const savedKey =  await newKey.save();
                return res.status(200).json(savedKey._id)
            }catch(err){
                return res.status(500).json(err)
            }
        }
    } catch(err){
        return err;
    }
});
router.put("/:id", async (req, res) => {
    // HTTP post request
        try{
            console.log("test1 passed")
            var otp = await UserOTP.findById(req.params.id);
            if (!req.body.otp){
                console.log("test 2 failed passed")
                return res.status(500).json("enter the key");
            }else{
                console.log("test2 passed")
                const Key_From_User = req.body.otp
                const answer = otp.otp;
                if (answer === Key_From_User){
                    const key = await UserOTP.findByIdAndUpdate((req.params.id), {
                        verified: true,
                    }); 
                    console.log("test 3 passed")
                    otp = await UserOTP.findById(req.params.id);
                    return res.status(200).json(otp)
                }else{
                    return res.status(200).json(otp)
                }
            }
        } catch(err) {
            return res.status(500).json(err)
        }
});
router.delete("/:id", async (req, res) => {
    // HTTP post request is used 
    try{              
        const comment = await UserOTP.findById(req.params.id);
        await comment.deleteOne()   
        return res.status(200).json("your comment is deleted")
    } catch(err) {
        return res.status(500).json(err)
    }  
});

module.exports = router;