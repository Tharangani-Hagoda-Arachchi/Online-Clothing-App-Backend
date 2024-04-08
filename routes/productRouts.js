const router = require("express").Router();
const {createProduct,getProducts,getProductsByGender,getProductsByGenderAndCategory}= require ('../controllers/productController');
const {productValidation,validationRules}= require ('../utils/productUtils');


// Route for product creation

router.post('/products',validationRules,productValidation,createProduct);

// Route for get all produt
router.get('/products',getProducts);

router.get('/products/:gender', getProductsByGender);

router.get('/products/:gender/:category', getProductsByGenderAndCategory);



module.exports = router;