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

//route--Delete------------------

router.delete('/delete',(req,res)=>{
    
})

//--------------------------------------
var newRecord=new country(data);
newRecord.save((err,docs)=>{
    if(err)throw err;
    res.send({'msg':'success'});
});

})


module.exports=router;
