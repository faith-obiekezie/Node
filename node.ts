
import http, { ServerResponse } from "http";

const server=http.createServer((req:http.IncomingMessage,
    res:ServerResponse<http.IncomingMessage>)=>{
        res.writeHead(res.statusCode=200,{
           "content-type": "text/html",
        });
        // const device=(req.rawHeaders[7].slice(21,34))
        console.log(req.rawHeaders[5].split('-')[5])
        // const Goggle=req.rawHeaders[5].split('-')[5]
        
        // const postData=req.rawHeaders[4].split('-')[0]
        // const postData1=req.rawHeaders[5].split('-')[0]


        // console.log(Goggle)
//   if(data===undefined){
//     res.write(`you are using ${postData} to access our server`);
//   }else if(data!==undefined){
//     res.write(`you are using ${postData1} to access our server`);
//   }else{
//     res.write(`you are using ${data} to access our server`);
//   }

        // res.write(`you are using ${data} to access our server`);
        res.end();
         const data="i am HOME "
        const {method, url}=req;

        if(method==="GET" && url==="/home"){
         console.log(data)
         res.write(data);
         res.end();
        }else{
          res.end();
        }
    },
    );

server.on("connection",()=>{
    console.log("a user connected")
})

server.listen(3322,()=>{
    console.log("server is now live...!")
})