const mongoose = require("mongoose");
const Car = require("../models/Car");
const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    await Car.create({ ...req.body, isDeleted: false });
    res.send({
      message: "Create Car Successfully!",
      car: {
        ...req.body,
      },
    });
  } catch (error) {
    res.send({
      message: "Create Car Failed!",
    });
  }
};

carController.getCars = async (req, res, next) => {
  try {
    let { page, search } = req.query;
    search = search;
    page = parseInt(page);

    let query;

    if (search) {
      query = { isDeleted: false, $text: { $search: search } };
    } else {
      query = { isDeleted: false };
    }

    let cars = await Car.find(query)
      .sort({ createdAt: "desc", updatedAt: "desc" })
      .select({
        isDeleted: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      });

    const total = Math.ceil(cars.length / 10);

    cars = cars.slice((page - 1) * 10, (page + 1) * 10);

    res.send({ cars, total });
  } catch (err) {
    res.send(err.message);
  }
};

carController.editCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const editedCar = await Car.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        new: true,
        select: {
          isDeleted: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      }
    );
    res.send({
      message: "Update Car Successfully!",
      car: editedCar,
    });
  } catch (err) {
    res.send({
      message: "Update Car Fail!",
    });
  }
};

carController.deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedCar = await Car.findByIdAndUpdate(id, { isDeleted: true });
    res.send({
      message: "Delete Car Successfully!",
      car: deletedCar,
    });
  } catch (err) {
    res.send({
      message: "Delete Car Failed!",
    });
  }
};

module.exports = carController;
