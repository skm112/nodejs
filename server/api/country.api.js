var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var country = require("../models/country.js");

//route--get----
router.get("/list", (req, res) => {
  country.find({}, (err, docs) => {
    if (err) throw err;
    res.end(JSON.stringify(docs.length));
  });
});

//route--POST--------------------

router.post("/save", (req, res) => {
  var data = {
    _id: mongoose.Types.ObjectId(),
    // _id: mongojs.ObjectId(),
    name: req.body.name,
    st_date: new Date()
  };
  var newRecord = new country(data);
  newRecord.save((err, docs) => {
    if (err) throw err;
    res.send({ msg: "success" });
  });
});

//route--Delete------------------

router.delete("/delete/:id", (req, res) => {
  country.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id), err => {
    if (err) res.send(err);
    res.send({ msg: "success" });
  });
});
//route--PUT--for-update------

router.put("/update/:id", (req, res) => {
  console.log("update");
  var _id = req.params.id;
  console.log(_id);
  var query = { _id: mongoose.Types.ObjectId(_id) };
  var update = { name: req.body.name };
  country.findOneAndUpdate(query, update, (err, doc) => {
    if (err) throw err;
    res.json(doc);
  });
});
//route--PUT for save state
router.put("/update/state/:id", (req, res) => {
  var _id = req.params.id;
  console.log(req.body.name);
  var data = {
    name: req.body.name,
    _id: mongoose.Types.ObjectId()
  };
  country.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(_id) },
    { $push: { states: data } },
    (err, doc) => {
      if (err) throw err;
      res.json(doc);
    }
  );
});
//route getdata for state
router.get("/state/:id", (req, res) => {
  var _id = req.params.id;
  country.find({ _id: mongoose.Types.ObjectId(_id) }, (err, docs) => {
    if (err) throw err;
    res.end(JSON.stringify(docs));
  });
});

//route--delete for state
router.delete("/state/delete/:cid/:sid", (req, res) => {
  console.log(req.params.cid);
  console.log(req.params.sid);
  country.findByIdAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.cid) },
    {
      $pull: {
        states: { _id: mongoose.Types.ObjectId(req.params.sid) }
      }
    },
    { safe: true, upsert: true },
    (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
        //do stuff
        res.end(JSON.stringify(doc));
      }
    }
  );
});

//route update for state
router.put("/update/state1/:cid", (req, res) => {
  console.log("req.body");
  console.log(req.body);
  country.findOne({ "states._id": req.body.id }, (err, result) => {
    if (err) throw err;
    console.log(result);
    result.states.id(req.body.id).name = req.body.name;
    result.save();
    res.send({ msg: "success" });
  });
});

//route--POST --for--paging
router.post("/pageno/list", (req, res) => {
  console.log(req.body);

  var limit = req.body.limit;
  var pageNo = req.body.pageno;
  var skip = (pageNo - 1) * limit;
  console.log("skip > " + skip);

  var cursor = country.aggregate([
    {
      $match: {
        name: {
          $regex: req.body.search,
          $options: "i"
        }
      }
    },
    { $skip: skip },
    { $limit: limit }
  ]);

  cursor.exec((err, docs) => {
    console.log("docs");

    console.log(docs);
    res.end(JSON.stringify(docs));
  });
});

//--------------------------------------

module.exports = router;
