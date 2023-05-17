import http, { IncomingMessage } from "http"
import fs from "fs"
import path from "path"



interface IdataEntry{
    id:number;
    course:string
}
interface IData{
    message:string,
    name:string,
    status:number,
    sucess:boolean,
    data: IdataEntry|IdataEntry[]|null
}
let dataEntry :IdataEntry[]=[
    {id:1, course:"node"},
    {id:2, course:"React"},
];
let data :IData={
    message:"request not found",
    name:"request error",
    status:404,
    sucess:false,
       data:null
}
const port:number =3345;
const dataPath=path.join(__dirname,"sample","data.json")
const server : http.Server<typeof http.IncomingMessage,
typeof http.ServerResponse>=http.createServer((
    req: http.IncomingMessage,
    res: http.ServerResponse<IncomingMessage>
)=>{
    const {method, url}=req;


    let body:any = [];
    req.on("data",(chunk)=>{
        body.push(chunk);
        console.log(chunk);
        console.log(body);
    });

    //  readding from static db
    req.on("data", ()=>{
        if(method == "GET" && url === "/") {
            data.message="Reading from database";
            data.name="GET request";
            data.status= 200;
            data.sucess=true;
            data.data= dataEntry;
        }
        // writing from static db
        else if(method == "POST" && url === "/"){
            dataEntry.push(JSON.parse(body));
        
            fs.writeFile(dataPath, JSON.stringify(dataEntry), ()=>{

            })
            data.message="Reading from database";
            data.name="GET request";
            data.status= 201;
            data.sucess=true;
            data.data= dataEntry;
        }
        // single from static db
        else if(method ===  "GET"){
            // dataEntry.push(JSON.parse(body));
            let id=req.url?.split("/")[1];

            // console.log(id);

            data.message="Reading from database";
            data.name="GET request";
            data.status= 200;
            data.sucess=true;
            data.data= dataEntry[parseInt(id!) - 1];
        }
        // Deleting from static db
        else if(method == "DELETE" && url === "/"){
            // dataEntry.push(JSON.parse(body));
            let id = parseInt(req.url?.split("/")[1]!) - 1;
            

            let value= dataEntry.filter((el:any)=>{
                return el.id === id;
            })
            
            data.message="Deleting from database";
            data.name="GET request";
            data.status= 201;
            data.sucess=true;
            data.data= value;
        }
         // updating from static db
         else if(method == "PATCH"){
            // dataEntry.push(JSON.parse(body));
            const {course}= JSON.parse(body);
            let id = parseInt(req.url?.split("/")[1]!) - 1;
            

            dataEntry[id].course = course
            
            data.message="Deleting from database";
            data.name="GET request";
            data.status= 201;
            data.sucess=true;
            data.data= dataEntry;
        }
        else{
            data.message="request not found";
            data.name="request error";
            data.status= 404;
            data.sucess=false;
            data.data= null;
        }
        
    })
    res.writeHead(data.status, {
        "content-type": "application/json"});
  res.end(JSON.stringify(data))
})

server.listen(port,()=>{
    console.log("server is listening on port")
})