const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class PaymentMethodsController {
    async create(request, response){
        const { method_name, image, active } = request.body;

        await knex("payment_method").insert({
            method_name,
            image,
            active: active !== undefined ? active : true, // Default to true if not provided
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        });

        response.status(201).json();
    }

    async show(request, response){
        const paymentMethods = await knex("payment_method").where({ active: true });

        return response.json(paymentMethods);
    }

    async update(request, response){
        const { method_name, image, active } = request.body;
        const { id } = request.params;

        await knex("payment_method").where({ id }).update({
            method_name,
            image,
            active
        });

        response.status(200).json();
    }

    async delete(request, response){
        const { id } = request.params;

        await knex("payment_method").where({ id }).delete();

        return response.json();
    }
};

module.exports = PaymentMethodsController;
