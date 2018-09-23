var express=require("express");
var app =express();
app.get('/',(req,res)=>{
    res.send('First App');
});
app.listen(3000);
console.log("App is running at 'localhost//:3000'....");
