const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: "yutaka3209@hotmail.com",
        pass: "Eycj3209yuta",
    }
})
transporter.verify((error, success) => {
    if(err){
        console.log(err)
    }else{
        consple.log("Ready for the message.");
        console.log(success);
    }
});
const sendEmail = async (mailOptions) => {
    try{
        await transporter.sendMail(mailOptions)
        return;
    }catch (error){
        return error
    }
};

module.exports = sendEmail;
