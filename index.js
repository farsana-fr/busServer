const express = require("express");

const cors=require("cors");

const ds = require("./service/dataService");
const app = express();

app.use(express.json());

app.use(cors({origin:'http://localhost:4200'}));

app.post("/addBus", (req, res) => {
  //   console.log(req);
  // res.send("Inside addBus");
  console.log("Inside AddBUS");
  ds.addBus(
    req.body.busNo,
    req.body.regNo,
    req.body.from,
    req.body.to,
    req.body.dTime
  ).then((result)=>{
    res.status(result.statusCode).json(result);
  });
  
});
app.post("/search", (req, res) => {
  // const result = ds.search(req.body.from, req.body.to);
  ds.search(req.body.from, req.body.to).then((result)=>{
    console.log(result);
    res.status(result.statusCode).json(result);
  });
  // console.log(result);
  // res.status(result.statusCode).json(result);
});
app.post("/delete",(req,res)=>
{
  ds.deleteBus(req.body.busNo).then(result=>{
    res.status(result.statusCode).json(result);
  })
})

app.post("/book",(req,res)=>
{
  ds.book(req.body.email).then(result=>{
    res.status(result.statusCode).json(result);
  })
})
app.post("/bookBus",(req,res)=>
{
  console.log(req.body);
  ds.bookBus(req.body.busNo,req.body.regNo,req.body.from,req.body.to,req.body.dTime,req.body.email,req.body.uName).then(result=>{
    console.log("RES=====>",result);
    res.status(result.statusCode).json(result);
  })
})

app.post("/updateBus",(req,res)=>
{
  
  console.log("UPDATE");
  console.log(req.body);
  var obj=req.body;

  ds.update(req.body.busNo,obj).then(result=>{
    res.status(result.statusCode).json(result);
  })
})


app.post("/view",(req,res)=>
{
  
  console.log("VIEW Ticket");
  ds.view(req.body.email).then(result=>{

    console.log("index  res ",result);
      res.json(result)
    // res.status(result.statusCode).json(result);
  });
})

app.listen(3000, () => {
  console.log("Port 3000 running");
});
