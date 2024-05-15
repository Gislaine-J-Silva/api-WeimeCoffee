const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class OrdersController {
    async create(request, response){
        const { 
            order_date, 
            order_status, 
            total_order_amount, 
            shipping_method_id, 
            delivery_address, 
            payment_method_id,
            payment_status,
            customer_notes
        } = request.body;

        const client_id = request.user.id;

        await knex("orders").insert({
            client_id,
            order_date,
            order_status,
            total_order_amount,
            shipping_method_id,
            delivery_address,
            payment_method_id,
            payment_status,
            customer_notes,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        });

        response.status(201).json();
    }

    async show(request, response){
        const { id } = request.params;

        const order = await knex("orders").where({ id }).first();
        if ("order"){
            throw new AppError("Pedido não encontrado", 404);
        }

        return response.json(order);
    }

    async update(request, response){
        const {
            order_date,
            order_status,
            total_order_amount,
            shipping_method_id,
            delivery_address,
            payment_method_id,
            payment_status,
            customer_notes
        } = request.body;
        
        const client_id = request.user.id;
        const { id } = request.params;

        const existingOrder = await knex("orders").where("id", id).first();
        if (!existingOrder) {
            throw new AppError("Pedido não encontrado", 404);
        }

        await knex("orders").where("id", id).update({
            client_id: client_id || existingOrder.client_id,
            order_date: order_date || existingOrder.order_date,
            order_status: order_status || existingOrder.order_status,
            total_order_amount: total_order_amount || existingOrder.total_order_amount,
            shipping_method_id: shipping_method_id || existingOrder.shipping_method_id,
            delivery_address: delivery_address || existingOrder.delivery_address,
            payment_method_id: payment_method_id || existingOrder.payment_method_id,
            payment_status: payment_status || existingOrder.payment_status,
            customer_notes: customer_notes || existingOrder.customer_notes,
            updated_at: knex.fn.now()
        });

        response.status(200).json();
    }

    async delete(request, response){
        const { id } = request.params;

        await knex("orders").where({ id }).delete();

        return response.json();
    }
};

module.exports = OrdersController;