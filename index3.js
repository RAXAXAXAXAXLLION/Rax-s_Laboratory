port=process.env.PORT||3000
require('socket.io').listen(
require('http').createServer((i,o)=>{
o.writeHead(200,{"content-type":"text/html"})
o.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>')
o.write('<script>io().on("msg",(e)=>{eval(e.script)})</script>')
o.end()
}).listen(port,()=>{console.log("Server listening on port: "+port)})
).on("connection",(event)=>{
event.emit("msg",{script:'k=[],m=[]'})
event.emit("msg",{script:'onkeydown=onkeyup=(e)=>{k[e.keyCode]=e.type=="keydown"}'})
event.emit("msg",{script:'onmousedown=onmouseup=(e)=>{k[e.button]=e.type=="mousedown"}'})
event.emit("msg",{script:'onmousemove=(event)=>{io().emit("msg",{x:event.clientX,y:event.clientY})}'})
event.emit("msg",{script:'setInterval(()=>{'+
'for(i=0;i<500;i++){if(k[i]){io().emit("msg",{key:i})}}'+
'for(i=0;i<500;i++){if(m[i]){io().emit("msg",{button:i})}}'+
'},1)'})
})
