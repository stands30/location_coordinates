const mongoose = require("mongoose");

const coordinateSchema = new mongoose.Schema({
  coordinateId: {
    type: Number,
    required: [true, "ID is required"],
    unique: [true, "ID should be unique"],
  },
  label: {
    type: String,
    required: [true, "Label is required"]
  },
  xCoordinate: {
    type: String,
    required: [true, "X-Coordinate is required"],
  },
  yCoordinate: {
    type: String,
    required: [true, "Y-Coordinate is required"],
  }
});

/** pre hooks */
coordinateSchema.pre("save",function(){
})
const Coordinate = mongoose.model("coordinates", coordinateSchema);
console.log('Coordinate ', Coordinate);
module.exports = Coordinate;