const mongoose= require('mongoose');

const Rate=require('../models/rates');
const Cafe=require('../models/cafe');


exports.rates_get_all=(req,res,next) => {

    Rate.find().select('cafeRate cafe _id').exec().then(docs =>{
            const response ={
                count:docs.length,
                rate:docs.map(doc => {

                    return {
                        _id:doc._id,
                        cafeRate:doc.cafeRate,
                        cafe:doc.cafe,
                        request: {
                            type:'GET',
                            url:'http//localhost:3000/rates'
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


exports.rates_get_rate = (req,res,next) => {
    const id = req.params.cafeId;

    Rate.find({cafe:id})
    .select('cafe cafeRate _id')
    .exec()
    .then(doc => {
        console.log("Databaseden gelen",doc);
        if(doc)
        {
            res.status(200).json({
                rate:doc,
                request: {
                    type:'GET',
                    url:'http//localhost:3000/rates'
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

exports.rates_update_rate = (req,res,next) => {

    const id = req.params.cafeId;
    let newCount=0,newRate=0;

    Rate.find({cafe:id})
    .select('rateCount cafeRate')
    .exec()
    .then(rate => {
        console.log("Databaseden gelen",rate);
        if(!rate)
        {
            
            res.status(404).json({message:'Girilen ID ile eslesme olmadi'});
        }

        else
        {
            newCount=parseInt( rate.map(v =>v.rateCount));
            newCount=newCount+1;
            console.log(newCount);
            newRate=parseInt(rate.map(v=>v.cafeRate))*parseInt( rate.map(v =>v.rateCount));;
            newRate=(newRate+req.body.cafeRate)/newCount;
            console.log(newRate);

            Rate.update({cafe:id},{$set:{rateCount:newCount,cafeRate:newRate}})
            
    
            .exec()
            .then(
                Cafe.update({_id:id},{$set:{rateOfCafe:newRate}})
                .exec()
                .catch(err => {
                    console.log(err);
                    res.status(500);    
                })
            )
            .then(result =>{

            res.status(200).json({
           
            message:'kayit guncellendi',
            request:{
                type:'GET',
                url:'http//localhost:3000/rates/'+id
            }
        });

        
    })
           
        }

    })


    .catch(err => {
        console.log(err);
        res.status(500);    
    });

}

exports.rates_top15=(req,res,next)=>{

        Rate.find({cafeRate: {$exists: true}}).sort({cafeRate : -1}).limit(15).exec().then(docs =>{

            const response ={
                count:docs.length,
                rate:docs.map(doc => {
    
                    return {
                        _id:doc._id,
                        cafeRate:doc.cafeRate,
                        //cafe:doc.cafe,
                        request: {
                            type:'GET',
                            url:'http//localhost:3000/rates'
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