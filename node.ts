
// import http, { ServerResponse } from "http";

// const server=http.createServer((req:http.IncomingMessage,
//     res:ServerResponse<http.IncomingMessage>)=>{
//         res.writeHead(res.statusCode=200,{
//            "content-type": "text/html",
//         });
//         // const device=(req.rawHeaders[7].slice(21,34))
//         console.log(req.rawHeaders[5].split('-')[5])
//         // const Goggle=req.rawHeaders[5].split('-')[5]
        
//         // const postData=req.rawHeaders[4].split('-')[0]
//         // const postData1=req.rawHeaders[5].split('-')[0]


//         // console.log(Goggle)
// //   if(data===undefined){
// //     res.write(`you are using ${postData} to access our server`);
// //   }else if(data!==undefined){
// //     res.write(`you are using ${postData1} to access our server`);
// //   }else{
// //     res.write(`you are using ${data} to access our server`);
// //   }

//         // res.write(`you are using ${data} to access our server`);
//         res.end();
//          const data="i am HOME "
//         const {method, url}=req;

//         if(method==="GET" && url==="/home"){
//          console.log(data)
//          res.write(data);
//          res.end();
//         }else{
//           res.end();
//         }
//     },
//     );

// server.on("connection",()=>{
//     console.log("a user connected")
// })

// server.listen(3322,()=>{
//     console.log("server is now live...!")
// })


import http, { IncomingMessage } from "http"; 
import { Server } from "http";
 
const food=["rice","beans","yam","eba",
"fufu","Tea","bread"]
const data:any=[]
Array.from({length:5},()=>{
   let numb=Math.floor(Math.random()*food.length)
   let cost=Math.floor(Math.random()*1000)
   data.push({item:food[numb],cost:cost})
})
console.log(data)

const port:number= 3321;
const sever: http.Server<typeof http.IncomingMessage,
typeof http.ServerResponse>=http.createServer((
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>)=>{
        res.writeHead(res.statusCode=200,{
            "content-type": "JSON"
        })
      const {method, url} = req
     if(method === "GET" && url === "/") {
        
        // res.write(JSON.stringify(data))
        // res.end()
     }
        let body = "";
        let Newdata:{}[]=[];
        req.on("data", (chunk)=>{
         body += (chunk)
        //  console.log(chunk)
        })

        req.on("data", ()=>{
            let result: any = JSON.parse(body);
            Newdata.push(result);
            console.log(Newdata)
             res.write(JSON.stringify(Newdata));
             res.end()
        });
    }
);

sever.listen(port, ()=>{
    console.log("server listening on port")
})

// import http from "http"

// const port1 :number=3333;
// const sever: http.Server<typeof http.IncomingMessage,
// typeof http.ServerResponse>= http.createServer((
//     req: http.IncomingMessage,
//     res: http.ServerResponse<IncomingMessage>)=>{
//         res.writeHead(res.statusCode=200,{
//             "content-type": "application/Json"
//         })
//     })