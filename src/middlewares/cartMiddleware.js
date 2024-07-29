const connection = require("../database/knex");
const AppError = require("../utils/AppError");

async function addToCart(req, res, next){
    const { product_id, quantity } = req.body;

    try {
        const product = await connection('products').where({ id: product_id }).first();

        if(!product){
            throw new AppError("Produto não encontrado", 404);
        }

        const [id] = await connection('cart').insert({ product_id, quantity });
        res.status(201).json({ id });
    } catch (error) {
        next(error);
    }
}

async function getCartItems(req, res, next){
    try {
        const cartItems = await connection('cart')
          .join('products', 'cart.product_id', 'products.id')
          .select('cart_id', 'products.name', 'products.price', 'cart.quantity', 'cart.added_at');
        
        res.json(cartItems);
    } catch (error){
        next(error);
    }
}

module.exports = {
    addToCart,
    getCartItems
}