const mongoose= require('mongoose');

const Cafe=require('../models/cafe');
const Rate=require('../models/rates');

exports.cafes_get_all=(req,res,next) => {

    Cafe.find().select('cafeName rateOfCafe _id cafeImage').exec().then(docs =>{
        const response ={
            count:docs.length,
            cafes:docs.map(doc => {
                return {
                    cafeName:doc.cafeName,
                    rateOfCafe:doc.rateOfCafe,
                    cafeImage:doc.cafeImage,
                    _id:doc._id,
                    request: {
                        type:'GET',
                        url:'http//localhost:3000/cafes/'+doc._id
                    }
                }
            })
        }
            res.status(200).json(response);
        

    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

exports.cafes_create_cafe=(req,res,next) => {

    console.log(req.file);

    const cafe = new Cafe({

        _id:new mongoose.Types.ObjectId(),
        cafeName:req.body.cafeName,
        //cafeImage:req.file.path   
});
   
   const newId=cafe._id;

    const rate = new Rate({

        _id:new mongoose.Types.ObjectId(),
        cafeRate:0,
        rateCount:0,
        cafe:newId
    })
    rate.save()

   
    
    cafe.save().then(result => {
         console.log(result);
         res.status(201).json({
            message:'kayit basariyla olusturuldu',
            createdCafe:{
                cafeName:result.cafeName,
                _id:result._id,
                request:{
                    type:'GET',
                    url:'http//localhost:3000/cafes/'+result._id
                }
            }
        });
    })


   

    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    
    });


   
}

exports.cafes_get_cafe = (req,res,next) => {
    const id = req.params.cafeId;


    Cafe.findById(id)
    .select('cafeName rateOfCafe _id cafeImage')
    .exec()
    .then(doc => {
        console.log("Databaseden gelen",doc);
        if(doc)
        {
            res.status(200).json({
                cafe:doc,
                request: {
                    type:'GET',
                    url:'http//localhost:3000/cafes'
                }
            });
        }

        else
        {
            res.status(404).json({message:'Girilen ID ile eslesme olmadi'});
        }

    })
    .catch(err =>{
        
        console.log(err);
        res.status(500).json({error:err});
    
    });

}

exports.cafes_update_cafe = (req,res,next) => {

    const id = req.params.cafeId;

    const updateOps =  {};
    for(const ops of req.body){
        updateOps[ops.propName]= ops.value
    }

    Cafe.update({_id:id}, {$set:updateOps})
    .exec()
    .then(result =>{
        
        res.status(200).json({
            message:'kayit guncellendi',
            request:{
                type:'GET',
                url:'http//localhost:3000/cafes/'+id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500);    
    });

}
