const db = require("./db");

busDetails={
    100:{busNo:100,regNo:"KL 6 x 123",from:"Kollam",to:"Kochi",departureTime:"06:00AM"},
    101:{busNo:101,regNo:"KL 2 x 123",from:"Kollam",to:"Kochi",departureTime:"06:00AM"},
    102:{busNo:102,regNo:"KL 7 x 123",from:"Idukki",to:"Kochi",departureTime:"06:00AM"},
    103:{busNo:103,regNo:"KL 8 x 123",from:"Trissur",to:"Kochi",departureTime:"06:00AM"}
}
addBus=(busNo,regNo,from,to,dTime)=>
{
    console.log("ds.addBus");
    return db.Bus.findOne({ busNo: busNo }).then((bus) => {
        console.log(bus);
        if (bus) {
          return {
            status: false,
            message: "Bus already present",
            statusCode: 404,
          };
        } else {
          newBus = new db.Bus({
            busNo:busNo,
            regNo:regNo,
            from:from,
            to:to,
            departureTime:dTime
          });
          newBus.save();
          return {
            status: true,
            message: "Added New Bus",
            statusCode: 200,
          };
        }
    });
}

search=(from,to)=>{
    
    return db.Bus.findOne({from:from,to:to}).then(bus=>
        {
            console.log(bus);
            console.log(bus.busNo);
            var resultObj={
                busNo:bus.busNo,
            regNo:bus.regNo,
            from:bus.from,
            to:bus.to,
            departureTime:bus.departureTime
            };

            if(bus)
            {
                return {
                    status:true,
                    message:resultObj,
                    statusCode:200
                }
            }
            else
            {
                return {
                    status:false,
                    message:`Not Found`,
                    statusCode:404
                };
            }
        }
    );         
}
view=()=>{
    // for(let i of db.Bus.le)
    console.log(db.Bus.find());

    // db.Bus.find(e=>console.log(e));
    return db.Bus;
}
module.exports={
    addBus,
    search,
    view
}