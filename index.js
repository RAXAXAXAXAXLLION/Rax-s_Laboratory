/*require('socket.io').listen(*/
require('http').createServer((i,o)=>{
o.writeHead(200,{"content-type":"text/html"})
o.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>')
o.write('<script>io().on("msg",(e)=>{eval(e.script)})</script>')
o.end()
}).listen("1025",()=>{console.log("Server listening.")})
/*).on("connection",(event)=>{
event.id=Math.floor(Math.random()*Math.pow(10,10))
event.emit("msg",{script:'k=[];m=[]'})
event.emit("msg",{script:'document.body.style.margin="0"'})
event.emit("msg",{script:'onkeydown=onkeyup=(e)=>{k[e.keyCode]=e.type="keydown"}'})
event.emit("msg",{script:'onmousedown=onmouseup=(e)=>{m[e.button]=e.type="mousedown"}'})
event.emit("msg",{script:
'onmousemove=(event)=>{'+
'mouse_x:event.clientX;'+
'mouse_y:event.clientY}'})
event.emit("msg",{script:
'setInterval(()=>{for(i=0;i<400;i++){'+
'if(k[i]){io().emit("msg",{key:i})};'+
'if(m[i]){io().emit("msg",{button:i})};'+
'io().emit("msg",{x:mouse_x;y:mouse_y})'
'}},1)'})
event.on("msg",(e)=>{
console.log("Received keyboard key: "+e.key+" from window: "+event.id)
console.log("Received mouse button: "+e.button+" from window: "+event.id)
console.log("Received mouse X: "+e.x+" from window: "+event.id)
console.log("Received mouse Y: "+e.y+" from window: "+event.id)
})
})
*/
