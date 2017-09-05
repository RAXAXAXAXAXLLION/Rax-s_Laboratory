require("socket.io").listen(
require("http").createServer((i,o)=>{
o.writeHead(200,{"content-type":"text/html"})
o.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>')
o.write('<script>io().on("msg",(e)=>{eval(e.script)})</script>')
o.end()
}).listen(process.env.PORT||3000,()=>{console.log("Server listening.")})
).on("connection",(w)=>{
w.emit("msg",{script:'document.body.style.margin="0"'})
w.emit("msg",{script:'c=document.createElement("canvas")'})
w.emit("msg",{script:'document.body.appendChild(c)'})
w.emit("msg",{script:'gl=c.getContext("webgl")'})
setInterval(()=>{
w.emit("msg",{script:'c.width=innerWidth'})
w.emit("msg",{script:'c.height=innerHeight'})
w.emit("msg",{script:'gl.clearColor(0,0,0,1)'})
w.emit("msg",{script:'gl.clear(COLOR_BUFFER_BIT)'})
},1)
})
