const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class OrderHistoryController {
    async create(request, response){
        const { order_id, event_description } = request.body;

        await knex("order_history").insert({
            order_id,
            event_description,
            date_time: knex.fn.now()
        });

        response.status(201).json();
    }

    async show(request, response){
        const { id } = request.params;
        
        const orderHistory = await knex("order_history").where({ id }).first();
        if (!orderHistory) {
            throw new AppError("Histórico de ordem não encontrado", 404);
        }

        return response.json(orderHistory);
    }

    async update(request, response){
        const { order_id, event_description } = request.body;
        const { id } = request.params;

        const existingOrderHistory = await knex("order_history").where({ id }).first();
        if (!existingOrderHistory){
            throw new AppError("Histórico de ordem não encontrado", 404);
        }

        const existingOrder = order_id ? await knex("orders").where("id", order_id).first() : null;
        if(order_id && !existingOrder){
            throw new AppError("Ordem não encontrada", 404);
        }

        await knex("order_history").where({ id }).update({
            order_id: order_id || existingOrderHistory.order_id,
            event_description: event_description || existingOrderHistory.event_description,
            date_time: knex.fn.now()
        });

        response.status(200).json();
    }

    async delete(request, response){
        const { id } = request.params;

        await knex("order_history").where({ id }).delete();

        return response.status(204).json();
    }
}

module.exports = OrderHistoryController;
