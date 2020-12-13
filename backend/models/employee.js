const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  fathername: { type: String, required: true },
  mothername: { type: String, required: true },
  emailaddress: { type: String, required: true },
  phonenumber: { type: String, required: true },
  dateofbirth: { type: String, required: true },
  gender: { type: String, required: true },
  imagePath: { type: String, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);
