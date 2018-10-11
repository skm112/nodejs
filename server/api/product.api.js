var express = require("express");
var router = express.Router();
var multer = require("multer");
var mongoose = require("mongoose");
var filename = "";
var productDB = require("../models/Product");
var fs = require("fs");
var path=require('path');
//@multer
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename(req, file, cb) {
    filename = file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    cb(null, filename);
  }
});
var upload = multer({
  storage: storage
});
//--end
//@getData --GET
router.get("/table", (req, res) => {
  productDB.find({}, (err, docs) => {
    if (err) throw err;
    res.end(JSON.stringify(docs));
  });
});

//@upload api--SAVE
router.post("/upload", upload.array("uploads[]", 12), (req, res) => {
  console.log(filename);
  var data = {
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    pic: filename,
    price: req.body.price,
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
  productDB.findByIdAndRemove(
    mongoose.Types.ObjectId(req.params.id),
    (err, doc) => {
      if (err) res.send(err);
      
      res.end(JSON.stringify(doc));

      fs.exists("./uploads/" + doc.pic, function(exists) {
        if (exists) {
          //Show in green
          console.log("File exists. Deleting now ...");
          fs.unlink("./uploads/" + doc.pic, function(err1) {});
        } else {
          //Show in red
          console.log("File not found, so not deleting.");
        }
      });
    }
  );
});

//@update
router.put("/update/:id", upload.array("uploads[]", 12), (req, res) => {
  console.log("update");
  var _id = req.params.id;  
  var query = { _id: mongoose.Types.ObjectId(_id) };
  if (filename.length<=0){
    filename = req.body.pic;
  }
  else{
    fs.exists("./uploads/" + req.body.pic, function(exists) {
      if (exists) {
        //Show in green
        console.log("File exists. Deleting now ...");
        fs.unlink("./uploads/" + req.body.pic, function(err1) {});
      } else {
        //Show in red
        console.log("File not found, so not deleting.");
      }
    });
  }
  var update = { name: req.body.name, pic: filename, price: req.body.price };
  productDB.findOneAndUpdate(query, update, (err, doc) => {
    if (err) throw err;
    res.json(doc);
  });
});

module.exports = router;
