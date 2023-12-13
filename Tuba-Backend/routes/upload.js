const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
})
const upload = multer({ storage });
// image upload API
router.post("/", upload.any(), (req, res) => {
    try{
        return res.status(200).json("success");
    } catch(err){
        console.log(err)
    }
})

module.exports = router;