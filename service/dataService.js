const db = require("./db");

busDetails = {
  100: {
    busNo: 100,
    regNo: "KL 6 x 123",
    from: "Kollam",
    to: "Kochi",
    departureTime: "06:00AM",
  },
  101: {
    busNo: 101,
    regNo: "KL 2 x 123",
    from: "Kollam",
    to: "Kochi",
    departureTime: "06:00AM",
  },
  102: {
    busNo: 102,
    regNo: "KL 7 x 123",
    from: "Idukki",
    to: "Kochi",
    departureTime: "06:00AM",
  },
  103: {
    busNo: 103,
    regNo: "KL 8 x 123",
    from: "Trissur",
    to: "Kochi",
    departureTime: "06:00AM",
  },
};
addBus = (busNo, regNo, from, to, dTime) => {
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
        busNo: busNo,
        regNo: regNo,
        from: from,
        to: to,
        departureTime: dTime,
      });
      newBus.save();
      return {
        status: true,
        message: "Added New Bus",
        statusCode: 200,
      };
    }
  });
};

search = (from, to) => {
  return db.Bus.findOne({ from: from, to: to }).then((bus) => {
    console.log("RESULT");

    if (bus) {
      var resultObj = {
        busNo: bus.busNo,
        regNo: bus.regNo,
        from: bus.from,
        to: bus.to,
        departureTime: bus.departureTime,
      };

      return {
        status: true,
        message: resultObj,
        statusCode: 200,
      };
    } else {
      return {
        status: false,
        message: `Bus Not Found`,
        statusCode: 404,
      };
    }
  });
};

deleteBus = (busNo) => {
  console.log("Inside deleteBUs()");
  return db.Bus.deleteOne({ busNo: busNo }).then((result) => {
    if (result.deletedCount) {
      console.log(result);
      return {
        status: true,
        message: "Deleted Bus",
        statusCode: 200,
      };
    } else {
      console.log(result);
      return {
        status: false,
        message: `Bus Not Found`,
        statusCode: 404,
      };
    }
  });
};

book = (email) => {
  return db.Ticket.findOne({ email: email }).then((tkt) => {
    console.log(tkt);
    
    if (tkt) {
      return {
        status: true,
        message: tkt,
        statusCode: 200,
      };
    }
    else
    {
      return {
        status: false,
        message: "No records",
        statusCode: 403,
      };
    }
  });
};


bookBus = (busNo,regNo,from,to,dTime,email,uName) => {
  return db.Ticket.findOne({ email: email }).then((tkt) => {
    console.log(tkt);
    // console.log("Tickety find",tkt.ticket);
    
    
    if (tkt) {
      tkt.ticket.push(
        {busNo:busNo,
          regNo:regNo,
        from:from,
      to:to,
          dTime:dTime
    }
      )
      tkt.save();
      return {
        status: true,
        message: tkt,
        statusCode: 200,
      };
    }else
    {
      newUser = new db.Ticket({
        email: email,
        uName:uName,
        ticket:[
          {busNo:busNo,
            regNo:regNo,
          from:from,
        to:to,
            dTime:dTime
      }
        ]
      });
      newUser.save();


      return {
        status: true,
        message: newUser,
        statusCode: 200,
      };
    }
  });
};


update = (busNo, obj) => {
  return db.Bus.findOne({ busNo: busNo }).then(async (bus) => {
    console.log("HELLLLO");
    // console.log(bus);
    if (bus) {
      for (const [key, value] of Object.entries(obj)) {
        console.log(key, value);
        console.log(value);
        for (const [key1, value1] of Object.entries(value)) {
          if (key1 == "regNo") {
            await db.Bus.updateOne(
              { busNo: busNo },
              { $set: { regNo: value1 } }
            );
          }
          if (key1 == "from") {
            await db.Bus.updateOne(
              { busNo: busNo },
              { $set: { from: value1 } }
            );
          }
          if (key1 == "to") {
            await db.Bus.updateOne({ busNo: busNo }, { $set: { to: value1 } });
          }
          if (key1 == "dTime") {
            await db.Bus.updateOne(
              { busNo: busNo },
              { $set: { departureTime: value1 } }
            );
          }
        }
        //   const  val=await db.Bus.updateOne({"busNo":busNo},{$set:JSON.stringify({key:value})})
        //   let out=JSON.stringify({keyV:value});
        //   console.log(out);

        // var newvalues = {from: "Kottayam" }
        //   await db.Bus.updateOne({'${key}':bus[`${key}`]},{$set:  { key:vV } })
      }
      return {
        status: true,
        message: "Updated the Bus Details",
        statusCode: 200,
      };
    } else {
      return {
        status: false,
        message: "Bus Not Found",
        statusCode: 403,
      };
    }
  });
};
view = (email) => {
  console.log("VIEWWWW 169");
  return db.Ticket.findOne({ email: email }).then((ticket) => {
    //  console.log("RES",ticket);

    if (ticket) {
      console.log("ticket", ticket);
      if (ticket.ticket) {
        return {
          status: true,
          message: ticket.ticket,
          statusCode: 200,
        };
      }
      // for(i of ticket.ticket)
      // {
      //   console.log(i," ===iiiiiiiiiii");
      //   db.Bus.findOne({ busNo: "100" }).then((bus) => {
      //     console.log("bus",bus);
      //     resultObj = {
      //       busNo: bus.busNo,
      //       regNo: bus.regNo,
      //       from: bus.from,
      //       to: bus.to,
      //       departureTime: bus.departureTime,
      //     };
      //     console.log("193 return ",resultObj)
      //   });
      //   console.log("B4 return ",resultObj)
      // return {
      //   status:true,
      //   message:resultObj,
      //   statusCode:200
      // }
      // }

      console.log("RES tkt of tkt", ticket.ticket);
      var resultObj = {};
      for (i of ticket.ticket) {
        console.log("i=", i);
        db.Bus.findOne({ busNo: i }).then((tkt) => {
          console.log("TKT", tkt);
          arr.push(tkt.from);
          console.log(arr);

          resultObj = {
            busNo: tkt.busNo,
            regNo: tkt.regNo,
            from: tkt.from,
            to: tkt.to,
            departureTime: tkt.departureTime,
          };
          console.log("RESOBJ", resultObj);

          return {
            status: true,
            message: arr,
            statusCode: 200,
          };
        }),
          (tkt) => {
            console.log("err", tkt.error);
          };
      }
    } else {
      return {
        status: false,
        message: "Bus Not Found",
        statusCode: 403,
      };
    }
  });
};
module.exports = {
  addBus,
  search,
  deleteBus,
  book,
  bookBus,
  update,
  view,
};
