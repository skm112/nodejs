var fs = require("fs");
var data = fs.readFileSync("input.txt");
//console.log(data.toString());
// console.log("program end");
fs.readFile("input.txt", (ers, data) => {
  if (ers) return console.log(ers);
  else console.log(data.toString());
});
console.log("program end");
