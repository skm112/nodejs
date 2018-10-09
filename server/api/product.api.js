var express = require("express");
var router = express.Router();
var multer=require('multer');
var filename='';
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename(req,file,cb){
        filename=file.originalname;
        cb(null,filename);
    }
});
var upload = multer({
    storage: storage,

})
//@upload api
router.post('/upload',upload.array('uploads[]',12),(req,res)=>{
    console.log(req.body);
    console.log(filename);
    console.log(req);
   
        res.send({ msg: "success" });console.log(req.body);
        
   
})



module.exports = router;