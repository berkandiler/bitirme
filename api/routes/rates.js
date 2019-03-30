const express=require('express');
const router =express.Router();
const RatesController=require('../controllers/rates');

router.get('/',RatesController.rates_get_all );

router.get('/top',RatesController.rates_top15);

router.get('/:cafeId',RatesController.rates_get_rate);

router.patch('/:cafeId',RatesController.rates_update_rate);




module.exports = router;