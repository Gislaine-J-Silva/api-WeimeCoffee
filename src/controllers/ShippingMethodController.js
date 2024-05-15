const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class ShippingMethodController {
    async create(request, response) {
        const { shipping_name, shipping_description, shipping_information, shipping_fee } = request.body;

        await knex("shipping_method").insert({
            shipping_name,
            shipping_description,
            shipping_information,
            shipping_fee,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        });

        response.status(201).json({ success: true });
    }

    async show(request, response) {
        const { id } = request.params;

        const shippingMethod = await knex("shipping_method").where({ id }).first();
        return response.json(shippingMethod || null);
    }

    async update(request, response) {
        const { shipping_name, shipping_description, shipping_information, shipping_fee } = request.body;
        const { id } = request.params;

        await knex("shipping_method").where("id", id).update({
            shipping_name,
            shipping_description,
            shipping_information,
            shipping_fee,
            updated_at: knex.fn.now()
        });

        response.status(200).json({ success: true });
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("shipping_method").where({ id }).delete();

        return response.json({ success: true });
    }
}

module.exports = ShippingMethodController;
