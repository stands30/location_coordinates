const Coordinate = require("../models/coordinateModel");

const getCoordinates = async (req, res) => {
  try {
    
    const data = await Coordinate.find();
    if (data.length === 0) {
      res.status(404).json({
        status: 404,
        message: "No Data Found",
      });
    } else {
      res.status(200).json({
        message: "Data found",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

const createCoordinate = async (req, res) => {
  console.log('in create coordinate');
  try {
    console.log("creating coordinate ", Coordinate);
    const elementDetails = req.body;
    console.log('elementDetails ', elementDetails);
    const data = await Coordinate.create(elementDetails);
    console.log("executed creation")
    res.status(200).json({
      message: "Data created",
      data: data,
    });
  } catch (err) {
    let fieldList = ["coordinateId", "label", "xCoordinate", "yCoordinate"];
    const data = {};
    fieldList.forEach(key=>{
      if( err.errors[key]?.properties?.message){
        data[key] = err.errors[key]?.properties?.message;
      }
    });
    res.status(500).json({
      status: 500,
      data:data,
      message: err.message,
    });
  }
};

const getCoordinateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Coordinate.findById(id);
    console.log("data", data  )
    if (data == undefined) {
      throw {message:"no data found",statusCode:501};
    } else {
      res.status(200).json({
        message: "Data found",
        data: data,
      });
    }
  } 
  
  catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

const checkInput = function (req, res, next) {
  console.log("req methid", req.method);
  const coordinateDetails = req.body;
  console.log("req coordinateDetails", coordinateDetails);
  const isEmpty = Object.keys(coordinateDetails).length === 0;
  if (isEmpty) {
    res.status(400).json({
      status: 400,
      message: "Body cannot be empty",
    });
  } else {
    next();
  }
};

const deleteCoordinateById = async (req, res) => {
  try {
    const { id } = req.params;
    if( id == ''){
      throw new Error("Id missing");
    }
    const data = await Coordinate.findByIdAndDelete(id);
    if (data) {
      res.status(200).json({
        message: "Coordinate deleted",
        data: data,
      });
    } else {
      throw new Error("No data found");
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

const updateCoordinateById = async (req, res) => {
    try{
      console.log("request params", req.params);
      const { id } = req.params;
      const updatedCoordinateData = req.body;
      console.log("userid", id);
      const updatedCoordinate = await Coordinate.findByIdAndUpdate(id, updatedCoordinateData, {
        new: true,
      });
      console.log("updated Coordinate", updatedCoordinate);
      if (!updatedCoordinate) {
        throw new Error("Coordinate not found");
      } else {
        res.status(200).json({
          status: 200,
          message: "Coordinate updated successfully",
          data: updatedCoordinate,
        });
      }
    }catch(err){
        res.status(500).json({
            status: 500,
            message: err.message,
          });

    }
}


module.exports = {
    getCoordinates,
    createCoordinate,
    getCoordinateById,
    updateCoordinateById,
    deleteCoordinateById,
    checkInput
  } 