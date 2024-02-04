const express = require("express");
coordinateRouter = express.Router();
const {
  getCoordinates,
  createCoordinate,
  getCoordinateById,
  updateCoordinateById,
  deleteCoordinateById,

} = require("../controllers/coordinateController.js");


coordinateRouter.get("/",getCoordinates);
coordinateRouter.post("/",createCoordinate);
coordinateRouter.get("/:id",getCoordinateById);
coordinateRouter.patch("/:id",updateCoordinateById);
coordinateRouter.delete("/:id",deleteCoordinateById);

module.exports = coordinateRouter;