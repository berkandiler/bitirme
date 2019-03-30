const express=require('express');
const router =express.Router();
const OrdersController=require('../controllers/orders');

router.get('/',OrdersController.orders_get_all );

router.post('/',OrdersController.orders_create_order);

router.get('/:orderId',OrdersController.ordres_get_order);


module.exports = router;