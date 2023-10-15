
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req,file,cb){
  cb(null,"./uploads/");
  },
  filename: function(req,file,cb){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + '-' + uniqueSuffix)
  }
});

const fileFilter = function (req, file, cb) {
  const allowedMimeTypes = ['image/jpeg', 'image/png','image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error('Invalid file type. Only JPEG,JPG and PNG files are allowed.'), false); 
  }
};

const upload = multer({storage: storage,
   limits:{
  fileSize: 1024* 1024* 5
}, fileFilter : fileFilter
});

module.exports = upload;