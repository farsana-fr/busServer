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

// //resolve API
app.get("/view", (req, res) => {
  const result=ds.view()
  
  res.send(result);
});
app.listen(3000, () => {
  console.log("Port 3000 running");
});
