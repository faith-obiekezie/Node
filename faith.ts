import http, { IncomingMessage } from "http"


interface IdataEntry{
    id:number;
    course:string
}
interface IData{
    message:string,
    name:string,
    status:number,
    sucess:boolean,
    data: IdataEntry[]|null
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
            
            data.message="Reading from database";
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