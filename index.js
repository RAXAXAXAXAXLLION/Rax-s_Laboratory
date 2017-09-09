require('socket.io').listen(
require('http').createServer((i,o)=>{
o.writeHead(200,{"content-type":"text/html"})
o.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>')
o.write('<script>io().on("msg",(e)=>{eval(e.script)})</script>')
o.end()
}).listen(process.env.PORT||3000,()=>{console.log("Server listening.")})
).on("connection",(event)=>{

})
