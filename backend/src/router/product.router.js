const Router = require('express');
const { productController } = require('../controllers');
const { validationNewProduct } = require('../middlewares/validateProduct');

const router = Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.findById);
router.post('/', validationNewProduct, productController.postProduct);

module.exports = router;