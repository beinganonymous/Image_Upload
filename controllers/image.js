const Image = require('../models/image');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadImg = multer({storage: storage}).single('image');

const newImage = (req, res) => {
  
  Image.findOne({name:req.body.name}, (data) => {
 
      if ( data === null ) {
       
        const newImage = new Image({
          name:req.body.name,
          image: req.file.path, 
          description: req.body.description,
        })

        newImage.save((err, data)=>{
          if (err) return res.json({Error: err});
          return res.json(data);
        })
     
      } else {
        return res.json({message:"Image already exists"});
      }
  })
};



const getOneImage = (req, res) => {
  let name = req.params.name; 
  Image.findOne({name:name}, (err, data) => {
  if(err || !data) {
    return res.json({message: "Image doesn't exist."});
  }
  else return res.json(data); 
  });
}  


module.exports = {
  uploadImg,
  newImage,
  getOneImage
};
