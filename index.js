require("http").createServer((i,o)=>{
o.write("Hello world!")
o.end()
}).listen(process.env.PORT||3000,()=>{console.log("Server listening.")})
