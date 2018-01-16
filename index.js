obj={}
require("socket.io").listen(
require("http").createServer((i,o)=>{
o.writeHead(200,{"content-type":"text/html"})
o.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>')
o.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/88/three.js"></script>')
o.write('<script>socket=io();socket.on("out",(e)=>{eval(e.script)})</script>')
o.end()
}).listen(process.env.PORT||3000,()=>{console.log("Server listening!")})
).on("connection",(socket)=>{
socket.id=Math.random()
obj[socket.id]={x:Math.floor(Math.random()*4-2)*2,y:Math.floor(Math.random()*4-2)*2,z:0,xs:0,ys:0,zs:0,xm:2,ym:2,zm:3,type:"player"}
socket.emit("out",{script:'k=[]'})
socket.emit("out",{script:'obj={}'})
socket.emit("out",{script:'onkeydown=onkeyup=(e)=>{k[e.keyCode]=e.type=="keydown"}'})
socket.emit("out",{script:'document.body.style.margin="0"'})
socket.emit("out",{script:'renderer=new THREE.WebGLRenderer()'})
socket.emit("out",{script:'document.body.appendChild(renderer.domElement)'})
socket.emit("out",{script:'scene=new THREE.Scene()'})
socket.emit("out",{script:'camera=new THREE.PerspectiveCamera(75,1,0.1,10000)'})
socket.emit("out",{script:'render=()=>{'+
'renderer.setSize(innerWidth,innerHeight);'+
'camera.aspect=innerWidth/innerHeight;'+
'camera.updateProjectionMatrix();'+
'requestAnimationFrame(render);'+
'renderer.render(scene,camera)}'})
socket.emit("out",{script:'render()'})
socket.emit("out",{script:'setInterval(()=>{'+
'for(i=0;i<500;i++){if(k[i]){socket.emit("in",{key:i})}};'+
'},1)'})
socket.emit("out",{script:
'sun=new THREE.DirectionalLight(0xffffff,1);'+
'sun.position.set(0,0,1000);'+
'sun.target.position.set(0,0,0);'+
'scene.add(sun);'+
'rightsun=new THREE.DirectionalLight(0xffffff,0.5);'+
'rightsun.position.set(1000,0,0);'+
'rightsun.target.position.set(0,0,0);'+
'scene.add(rightsun);'+
'leftsun=new THREE.DirectionalLight(0xffffff,0.5);'+
'leftsun.position.set(-1000,0,0);'+
'leftsun.target.position.set(-1000,0,0);'+
'scene.add(leftsun);'+
'upsun=new THREE.DirectionalLight(0xffffff,0.5);'+
'upsun.position.set(0,1000,0);'+
'upsun.target.position.set(0,0,0);'+
'scene.add(upsun);'+
'downsun=new THREE.DirectionalLight(0xffffff,0.5);'+
'downsun.position.set(0,-1000,0);'+
'downsun.target.position.set(0,0,0);'+
'scene.add(downsun);'})
socket.on("in",(e)=>{
if(e.key=="37"){obj[socket.id].xs-=0.0001}
if(e.key=="38"){obj[socket.id].ys+=0.0001}
if(e.key=="39"){obj[socket.id].xs+=0.0001}
if(e.key=="40"){obj[socket.id].ys-=0.0001}
})
setInterval(()=>{
socket.emit("out",{script:'camera.position.set('+obj[socket.id].x+','+obj[socket.id].y+','+obj[socket.id].z+'+16)'})
for(i in obj){
socket.emit("out",{script:'if(obj['+i+']){'+
'obj['+i+'].shape.position.set('+obj[i].x+','+obj[i].y+','+obj[i].z+');'+
'obj['+i+'].shape.scale.set('+obj[i].xm+','+obj[i].ym+','+obj[i].zm+')'+
'}else{'+
'if("'+obj[i].type+'"=="player"){'+
'obj['+i+']={'+
'shape:new THREE.Mesh('+
'new THREE.BoxGeometry(1,1,1),'+
'new THREE.MeshLambertMaterial({'+
'color:"rgb(250,200,150)"}))};'+
'scene.add(obj['+i+'].shape)};'+
'if("'+obj[i].type+'"=="dirt"){'+
'obj['+i+']={'+
'shape:new THREE.Mesh('+
'new THREE.BoxGeometry(1,1,1),'+
'new THREE.MeshLambertMaterial({'+
'color:"rgb(185,122,87)"}))};'+
'scene.add(obj['+i+'].shape)}'+
'if("'+obj[i].type+'"=="water"){'+
'obj['+i+']={'+
'shape:new THREE.Mesh('+
'new THREE.BoxGeometry(1,1,1),'+
'new THREE.MeshLambertMaterial({'+
'color:"rgb(222,222,222)"}))};'+
'scene.add(obj['+i+'].shape)'+
'player.material.transparent=true'+
'player.material.opacity=player.hp}}'})
}
},10)
})
setInterval(()=>{
for(i1 in obj){
obj[i1].x+=obj[i1].xs
obj[i1].y+=obj[i1].ys
obj[i1].z+=obj[i1].zs
for(i2 in obj){
if(obj[i1].type=="player"){
if(obj[i2].type!=="water"){
if(obj[i1].x-obj[i1].xm/2<obj[i2].x+obj[i2].xm/2){
if(obj[i2].x-obj[i2].xm/2<obj[i1].x+obj[i1].xm/2){
if(obj[i1].y-obj[i1].ym/2<obj[i2].y+obj[i2].ym/2){
if(obj[i2].y-obj[i2].ym/2<obj[i1].y+obj[i1].ym/2){
if(obj[i1].z-obj[i1].zm/2<obj[i2].z+obj[i2].zm/2){
if(obj[i2].z-obj[i2].zm/2<obj[i1].z+obj[i1].zm/2){
if(0.01>(obj[i1].xs*(obj[i1].x-obj[i2].x)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-0.5)+
obj[i1].ys*(obj[i1].y-obj[i2].y)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-0.5)+
obj[i1].zs*(obj[i1].z-obj[i2].z)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-0.5))){
if(0.0001>(obj[i1].xs*(obj[i1].x-obj[i2].x)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-0.5)+
obj[i1].ys*(obj[i1].y-obj[i2].y)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-0.5)+
obj[i1].zs*(obj[i1].z-obj[i2].z)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-0.5))){
if(0.00001>(obj[i1].xs*(obj[i1].x-obj[i2].x)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-0.5)+
obj[i1].ys*(obj[i1].y-obj[i2].y)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-0.5)+
obj[i1].zs*(obj[i1].z-obj[i2].z)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-0.5))){
obj[i1].xs+=0.005*(obj[i1].x-obj[i2].x)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-1.5)
obj[i1].ys+=0.005*(obj[i1].y-obj[i2].y)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-1.5)
obj[i1].zs+=0.005*(obj[i1].z-obj[i2].z)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-1.5)
}else{
obj[i1].xs+=0.0005*(obj[i1].x-obj[i2].x)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-1.5)
obj[i1].ys+=0.0005*(obj[i1].y-obj[i2].y)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-1.5)
obj[i1].zs+=0.0005*(obj[i1].z-obj[i2].z)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-1.5)
}}else{
obj[i1].xs+=0.00005*(obj[i1].x-obj[i2].x)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-1.5)
obj[i1].ys+=0.00005*(obj[i1].y-obj[i2].y)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-1.5)
obj[i1].zs+=0.00005*(obj[i1].z-obj[i2].z)*Math.pow(
(obj[i1].x-obj[i2].x)*(obj[i1].x-obj[i2].x)+
(obj[i1].y-obj[i2].y)*(obj[i1].y-obj[i2].y)+
(obj[i1].z-obj[i2].z)*(obj[i1].z-obj[i2].z),-1.5)
}}
}}}}}}
}
if(obj[i1].z<-2){
if(obj[i1].z<-16){
obj[i1].zs+=0.0001
}else{
obj[i1].zs+=0.00001
}}else{
obj[i1].zs-=0.00001}
}}}
},1)
g=(x,y,z,xs,ys,zs,xm,ym,zm,type)=>{
obj[Math.random()]={x:x,y:y,z:z,xs:xs,ys:ys,zs:zs,xm:xm,ym:ym,zm:zm,type:type}
}
for(x=-1;x<1;x++){
for(y=-1;y<1;y++){
for(z=-1;z<-1;z++){
g(x,y,-2,0,0,0,1,1,1,"dirt")
}}}
g(0,0,-2,0,0,0,1000000,1000000,0.1,"water")
