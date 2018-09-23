var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var fs = require("fs");
var path=require('path');

// access controls----------------------------------------------
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  // res.header('Access-Control-Allow-Headers', 'Content-Type','Authorization');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});
//bparser-----------------------------
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//-------------------------------------
// var arr = [
//   { id: 1, name: "Shekhar" },
//   { id: 2, name: "Aditya" },
//   { id: 3, name: "Akshit" }
// ];
// //-------------------------------------
// app.get("/list", function(req, res) {
//   console.log("/list DONE");
//   res.send(arr);
// });
//POST--------------------------------------------
app.post('/save',(req,res)=>{
  var db=path.resolve(__dirname,"./db.json");
  fs.readFile(db,'utf8',(err,data)=>{
    if (err) {
      return console.log(err);
      
    }
    console.log(data);
    var result=JSON.parse(data);
    result.push({'id':req.body.id,'name':req.body.name});
    fs.writeFile(db,JSON.stringify(result),'utf8',(err)=>{
      if (err)return console.log(err);
      res.send({ 'msg': 'success' })
    });
  });
});

// app.post("/save", (req, res) => {
//   console.log("/save DONE");

//   console.log(req.body);
//   res.send({ msg: "Success" });
// }); 
//PUT REQ for update----------------------------
// app.put("/update/:id", (req, res) => {
//   console.log("/update/:id DONE");
//   console.log(req.body);
//   console.log(req.params.id);
//   res.send({ msg: "Success" });
// });

app.put("/update/:id", (req, res) => {
  var db = path.resolve(__dirname, "./db.json");
  fs.readFile(db, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);

    }
    console.log(data);
    console.log(req.params.id);
    var result = JSON.parse(data);
    // result.push({ 'id': req.body.id, 'name': req.body.name });
    for (let i = 0; i < result.length; i++) {
      if (result[i].id === req.params.id) {
        result[i].name=req.body.name;
        break;
      }


    }
    fs.writeFile(db, JSON.stringify(result), 'utf8', (err) => {
      if (err) return console.log(err);
      res.send({ 'msg': 'success' })
    });
  });
})
//DELETE REQ for delete-------------------------
// app.delete("/delete/:id", (req, res) => {
//   console.log("/delete/:id DONE");
//   console.log(req.body);
//   console.log(req.params.id);
//   res.send({ msg: "Success" });
// });
app.delete("/delete/:id",(req,res)=>{
  var db = path.resolve(__dirname, "./db.json");
  fs.readFile(db, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);

    }
    console.log(data);
    console.log(req.params.id);
    var result = JSON.parse(data);
   // result.push({ 'id': req.body.id, 'name': req.body.name });
    for (let i = 0; i < result.length; i++) {
      if (result[i].id===req.params.id) {
        result.splice(i, 1);
        break; 
      }
     
     
    }
    fs.writeFile(db, JSON.stringify(result), 'utf8', (err) => {
      if (err) return console.log(err);
      res.send({ 'msg': 'success' })
    });
  });
})
//read-----------------------------------------------
app.get('/list', function (req, res) {

  var db = path.resolve(__dirname, './db.json');
  fs.readFile(db, function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
    res.send(JSON.parse(data));

  });

});
// app.get("/list*", (req, res) => {
//   console.log("/list* DONE");
//   res.send({ id: 2, name: "Hello" });
// });
app.get("/li*st", (req, res) => {
  console.log("/li*st DONE");
  res.send({ id: 3, name: "Hello" });
});

app.listen(3000);
console.log("Server is running at PORT:3000");

// these are request used in node
// app.post =>post data
// app.get => getting data
// app.put => update data
// app.delete => delete data
