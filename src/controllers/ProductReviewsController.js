const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class ProductReviewsController {
    async create(request, response){
        const { product_id, customer_id, rating, comment } = request.body;

        await knex("product_reviews").insert({
            product_id,
            customer_id,
            rating,
            comment,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        });

        response.status(201).json();
    }

    async show(request, response){
        const productReviews = await knex("product_reviews");

        return response.json(productReviews);
    }

    async update(request, response){
        const { product_id, customer_id, rating, comment } = request.body;
        const { id } = request.params;

        await knex("product_reviews").where({ id }).update({
            product_id,
            customer_id,
            rating,
            comment,
            updated_at: knex.fn.now()
        });

        response.status(200).json();
    }

    async delete(request, response){
        const { id } = request.params;

        await knex("product_reviews").where({ id }).delete();

        return response.json();
    }
};

module.exports = ProductReviewsController;
