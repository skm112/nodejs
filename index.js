var http=require('http');
console.log('start');
http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':'text/html'});
    res.end("<h2>Techlearning First App<\h2>\n");
}).listen(3000);
console.log('Server is running at PORT:3000 ....');

