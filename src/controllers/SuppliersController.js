const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class SuppliersController {
    async create(request, response){
        const { name, address, email, phone, cnpj, supplier_type, transaction_history, payment_terms } = request.body;

        const existingSupplier = await knex("suppliers").where("cnpj", cnpj).first();
        if (existingSupplier) {
            throw new AppError("Já existe um fornecedor com esse CNPJ", 400);
        }

        await knex("suppliers").insert({
            name,
            address,
            email,
            phone,
            cnpj,
            supplier_type,
            transaction_history,
            payment_terms
        });

        response.status(201).json();
    };

    async show(request, response){
        const { id } = request.params;
        const supplier = await knex("suppliers").where({ id }).first();

        return response.json(supplier);
    }

    async update(request, response){
        const { name, address, email, phone, supplier_type, transaction_history, payment_terms } = request.body;
        const { id } = request.params;

        const existingSupplier = await knex("suppliers").where("id", id).first();
        if (!existingSupplier){
            throw new AppError("Fornecdor não encontrado.", 404);
        }

        await knex("suppliers").where("id", id).update({
            name: name || existingSupplier.name,
            address: address || existingSupplier.address,
            email: email || existingSupplier.email,
            phone: phone || existingSupplier.phone,
            supplier_type: supplier_type || existingSupplier.supplier_type,
            transaction_history: transaction_history || existingSupplier.transaction_history,
            payment_terms: payment_terms || existingSupplier.payment_terms,
            updated_at: knex.fn.now(),
        });

        response.status(200).json();
    };

    async delete(request, response){
        const { id } = request.params;

        await knex("suppliers").where({ id }).delete();

        return response.json();
    }
};

module.exports = SuppliersController;