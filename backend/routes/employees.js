const express = require("express");
const multer = require('multer');
const Employee = require("../models/employee");

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png':'png',
  'image/jpeg':'jpeg',
  'image/jpg':'jpg'
};

const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error = null
    }
    cb(error, "backend/images")
  },
  filename:(req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null,name + '-' + Date.now() + '-' + ext);
  }
})


router.post("", multer({storage:storage}).single("image"),(req, res, next) => {
  const url = req.protocol + "://" + req.get("host")
  const employee = new Employee({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    fathername: req.body.fathername,
    mothername: req.body.mothername,
    emailaddress: req.body.emailaddress,
    phonenumber: req.body.phonenumber,
    dateofbirth: req.body.dateofbirth,
    gender: req.body.gender,
    imagePath: url + "/images/" + req.file.filename
  });
  employee.save().then(createdPost => {
    res.status(201).json({
      message: "Employee added successfully",
      empId: {
        ...createdPost,
        _id: createdPost._id,
      }
    });
  });
});

router.put("/:id", (req, res, next) => {
  const employee = new Employee({
    _id: req.body._id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    fathername: req.body.fathername,
    mothername: req.body.mothername,
    emailaddress: req.body.emailaddress,
    phonenumber: req.body.phonenumber,
    dateofbirth: req.body.dateofbirth,
    gender: req.body.gender,
  });
  Post.updateOne({ _id: req.params._id }, employee).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  Employee.find().then(documents => {
    res.status(200).json({
      message: "Employees fetched successfully!",
      employees: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Employee.findById(req.params._id).then(employee => {
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: "Employee not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Employee.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
