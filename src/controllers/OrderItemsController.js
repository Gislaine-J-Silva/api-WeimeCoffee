const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class OrderItemsController {
    async create(request, response){
        const { order_id } = request.params;
        const { 
            product_description, 
            color, size, quantity, 
            unit_price, total_value, 
            discount, 
            return_exchange_info 
        } = request.body;

        await knex("order_items").insert({
            order_id,
            product_description,
            color,
            size,
            quantity,
            unit_price,
            total_value,
            discount,
            return_exchange_info
        });

        response.status(201).json();
    }

    async show(request, response){
        const { order_id, id } = request.params;
        
        const orderItem = await knex("order_items").where({ id, order_id }).first();
        if (!orderItem) {
            throw new AppError("Item do pedido não encontrado", 404);
        }

        return response.json(orderItem);
    }

    async update(request, response){
        const { 
            product_description, 
            color, size, 
            quantity, 
            unit_price, 
            total_value, 
            discount, 
            return_exchange_info 
        } = request.body;
        const { order_id, id } = request.params;


        const existingOrderItem = await knex("order_items").where({ id }).first();
        if (!existingOrderItem){
            throw new AppError("Item do pedido não encontrado", 404);
        }

        const existingOrder = order_id ? await knex("orders").where({ id, order_id }).first() : null;
        if(order_id && !existingOrder){
            throw new AppError("Ordem não encontrada", 404);
        }

        await knex("order_items").where({ id }).update({
            product_description: product_description || existingOrderItem.product_description,
            color: color || existingOrderItem.color,
            size: size || existingOrderItem.size,
            quantity: quantity || existingOrderItem.quantity,
            unit_price: unit_price || existingOrderItem.unit_price,
            total_value: total_value || existingOrderItem.total_value,
            discount: discount || existingOrderItem.discount,
            return_exchange_info: return_exchange_info || existingOrderItem.return_exchange_info
        });

        response.status(200).json();
    }

    async delete(request, response){
        const { order_id, id } = request.params;

        const existingOrderItem = await knex("order_items").where({ id, order_id }).first();
        if (!existingOrderItem){
            throw new AppError("Item do pedido não encontrado", 404);
        }

        await knex("order_items").where({ id }).delete();

        return response.status(204).json();
    }
}

module.exports = OrderItemsController;
