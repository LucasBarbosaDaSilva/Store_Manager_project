const Router = require('express');
const { salesController } = require('../controllers');
const { validateSales } = require('../middlewares/validateSales');

const router = Router();

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);
router.post('/', validateSales, salesController.newSale);

module.exports = router;