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
            console.log("RESULT");
            console.log(db.Bus.find().schema.plugins);
            console.log(db.Bus.find({"busNo":100}))
            if(bus)
            {
                var resultObj={
                    busNo:bus.busNo,
                regNo:bus.regNo,
                from:bus.from,
                to:bus.to,
                departureTime:bus.departureTime
                };
    
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
                    message:`Bus Not Found`,
                    statusCode:404
                };
            }
        }
    );         
}

deleteBus=(busNo)=>{
    console.log("Inside deleteBUs()");
    return db.Bus.deleteOne({busNo:busNo}).then((result)=>
    {
        if(result.deletedCount)
        {
            console.log(result);
            return {
                status:true,
                message:"Deleted Bus",
                statusCode:200 
            }
        }
        else
        {
            console.log(result);
            return {
                status:false,
                message:`Bus Not Found`,
                statusCode:404
            };   
        }
    });

}
module.exports={
    addBus,
    search,
    deleteBus
}