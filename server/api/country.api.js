var express=require('express');
var router=express.Router();
var mongojs = require("mongojs");
var country=require('../models/country.js');

//route--get----
router.get('/list',(req,res)=>{
country.find({},(err,docs)=>{
    if (err) throw err;
    res.end(JSON.stringify(docs));
})
});

//route--POST--------------------

router.post('/save',(req,res)=>{
    var data={
        _id: mongojs.ObjectId(),
        name:req.body.name,
        st_date: new Date()
    };
    var newRecord = new country(data);
    newRecord.save((err, docs) => {
        if (err) throw err;
        res.send({ 'msg': 'success' });
    });

    
})

//route--Delete------------------

router.delete('/delete/:id',(req,res)=>{
    country.findByIdAndRemove(mongojs.ObjectId(req.params.id),(err)=>{
        if(err) res.send(err);
        res.send({msg:'success'});
    })
    
})
    //route--PUT--for-update------

    router.put('/update/:id', (req, res) => {
        console.log("update");
        var _id = req.params.id;
        console.log(_id);
        var query = { '_id': mongojs.ObjectId(_id) };
        var update = { name: req.body.name };
        country.findOneAndUpdate(query, update, (err, doc) => {
            if (err) throw err;
            res.json(doc);
        })
    });

//--------------------------------------





module.exports=router;
