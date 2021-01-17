const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: {type:String, required:true},
  image: String,
  description: String,
});

const Image = mongoose.model('Image', ImageSchema); 

module.exports = Image; 

