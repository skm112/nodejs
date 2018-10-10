var express = require("express");
var router = express.Router();
var multer=require('multer');
var mongoose = require("mongoose");
var filename='';
var address=require('../../setups/myurl').host;
var productDB=require('../models/Product');
//@multer
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
//--end
//@getData --GET
router.get("/table", (req, res) => {
    productDB.find({}, (err, docs) => {
        if (err) throw err;
        res.end(JSON.stringify(docs));
    });
});


//@upload api--SAVE
router.post('/upload',upload.array('uploads[]',12),(req,res)=>{
    console.log(filename);
    var data = {
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        pic:address+filename,
        price:req.body.price,
        st_date: new Date()
    };
    var newRecord = new productDB(data);
    newRecord.save((err, docs) => {
        if (err) throw err;
        res.send({ msg: "success" });
    });
});
//@delete
router.delete("/delete/:id", (req, res) => {
    console.log(req.body.pic);
    
    productDB.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id), err => {
        // if (err) res.send(err);
        // fs.unlink(req.params.pic, (err) => {
        //     if (err) throw err;
        //     console.log('path/file.txt was deleted');
        // });
        res.send({ msg: "success" });
    });
});


module.exports = router;