const Router = require('express');
const { productController } = require('../controllers');
const { validationNewProduct } = require('../middlewares/validateProduct');

const router = Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.findById);
router.post('/', validationNewProduct, productController.postProduct);
router.put('/:id', validationNewProduct, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;