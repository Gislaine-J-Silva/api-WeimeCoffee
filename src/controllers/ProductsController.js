const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class ProductsController {
    async create(request, response){
        const { name, description, price, category, brand, stock_quantity, img_product } = request.body;
        
        const existingProduct = await knex("products").where("name", name).first();
        if(existingProduct){
            throw new AppError("Já existe um produto com esse nome", 400);
        }

        await knex("products").insert({
            name,
            description,
            price,
            category,
            brand,
            stock_quantity,
            img_product
        })

        response.status(201).json();


    }

    async show(request, response){
        const { id } = request.params;
        
        const product = await knex("products").where({ id }).first();

        return response.json(product);
    }

    async update(request, response){
        const { name, description, price, category, brand, stock_quantity, img_product } = request.body;
        const { id } = request.params;

        const existingProduct = await knex("products").where("id", id).first();
        if (!existingProduct){
            throw new AppError("Produto não encontrado", 404);
        }

        await knex("products").where("id", id).update({
            name: name || existingProduct.name,
            description: description || existingProduct.description,
            price: price || existingProduct.price,
            category: category || existingProduct.category,
            brand: brand || existingProduct.brand,
            stock_quantity: stock_quantity || existingProduct.stock_quantity,
            img_product: img_product || existingProduct.img_product,
            updated_at: knex.fn.now(),
        });

        response.status(200).json();

    }

    async delete(request, response){
        const { id } = request.params;

        await knex("products").where( { id }).delete();

        return response.json();
    }

}

module.exports = ProductsController;