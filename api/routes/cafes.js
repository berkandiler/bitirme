const express=require('express');
const router =express.Router();
const multer= require('multer');
const CafeController= require('../controllers/cafes');

const storage= multer.diskStorage({
    destination: function(req,file,cb){  //resim ayarlari
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + file.originalname);
    }

});

const fileFilter=(req,file,cb)=>{
    
    if(file.mimetype==='image/jpeg' ||  file.mimetype === 'image/png'){  //resim kontroloru
        cb(null,true);
    }
    else{
        cb(null,false);
    }
    
    
}

const upload = multer({storage:storage, limits:{
    fileSize: 1024*1024*5                           //resimin limitini belirler ve yukler
},

fileFilter:fileFilter

});


router.get('/',CafeController.cafes_get_all);

router.post('/',upload.single('cafeImage'),CafeController.cafes_create_cafe);

router.get('/:cafeId',CafeController.cafes_get_cafe);

router.patch('/:cafeId',CafeController.cafes_update_cafe);


//router.get('/top15',CafeController.cafes_get_top)


module.exports = router;