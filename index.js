require("socket.io").listen(
require("http").createServer((i,o)=>{
o.writeHead(200,{"content-type":"text/html"})
o.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>')
o.write('<script>io().on("msg",(e)=>{eval(e.script)})</script>')
o.end()
}).listen(process.env.PORT||3000,()=>{console.log("Server listening.")})
).on("connection",(w)=>{
w.c={r:0,g:0,b:0}
w.emit("msg",{script:'document.body.style.margin="0"'})
w.emit("msg",{script:'c=document.createElement("canvas")'})
w.emit("msg",{script:'document.body.appendChild(c)'})
w.emit("msg",{script:'ctx=c.getContext("2d")'})
w.emit("msg",{script:'img=ctx.getImageData(0,0,32,32)'})
setInterval(()=>{
w.emit("msg",{script:'c.width=innerWidth'})
w.emit("msg",{script:'c.height=innerHeight'})
for(x=0;x<32;x++){
for(y=0;y<32;y++){
w.emit("msg",{script:'new Uint8Array(img.data.buffer)[0+'+x+'*4+'+y+'*4*32]='+w.c.r})
w.emit("msg",{script:'new Uint8Array(img.data.buffer)[1+'+x+'*4+'+y+'*4*32]='+w.c.g})
w.emit("msg",{script:'new Uint8Array(img.data.buffer)[2+'+x+'*4+'+y+'*4*32]='+w.c.b})
w.emit("msg",{script:'new Uint8Array(img.data.buffer)[3+'+x+'*4+'+y+'*4*32]=255'})
}}
w.emit("msg",{script:'ctx.putImageData(img,0,0)'})
},1000)
})
