const mongoose = require("mongoose");

//connection string
mongoose.connect("mongodb://localhost:27017/busServer", {
  useNewUrlParser: true,
});

//schema means fields and values
const Bus = mongoose.model("Bus", {
  busNo: Number,
  regNo:String,
  from: String,
  to: String,
  departureTime: String,
});

module.exports = {
  Bus,
};
