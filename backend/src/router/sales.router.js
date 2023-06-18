const Router = require('express');
const { salesController } = require('../controllers');

const router = Router();

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);
router.post('/', salesController.newSale);

module.exports = router;