const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class DiscountCouponsController {
    async create(request, response) {
        const { coupon_code, discount_type, discount_value, minimum_purchase_amount, eligible_product } = request.body;

        await knex("discount_coupons").insert({
            coupon_code,
            discount_type,
            discount_value,
            minimum_purchase_amount,
            eligible_product
        });

        response.status(201).json({ message: "Cupom criado com sucesso" });
    };

    async show(request, response) {
        const { id } = request.params;
        const coupon = await knex("discount_coupons").where({ id }).first();

        if (!coupon) {
            throw new AppError("Cupom não encontrado", 404);
        }

        return response.json(coupon);
    }

    async update(request, response) {
        const { id } = request.params;
        const { coupon_code, discount_type, discount_value, minimum_purchase_amount, eligible_product } = request.body;

        const existingCoupon = await knex("discount_coupons").where("id", id).first();
        if (!existingCoupon) {
            throw new AppError("Cupom não encontrado", 404);
        }

        await knex("discount_coupons").where("id", id).update({
            coupon_code: coupon_code || existingCoupon.coupon_code,
            discount_type: discount_type || existingCoupon.discount_type,
            discount_value: discount_value || existingCoupon.discount_value,
            minimum_purchase_amount: minimum_purchase_amount || existingCoupon.minimum_purchase_amount,
            eligible_product: eligible_product || existingCoupon.eligible_product,
            updated_at: knex.fn.now(),
        });

        response.status(200).json({ message: "Cupom atualizado com sucesso" });
    };

    async delete(request, response) {
        const { id } = request.params;

        await knex("discount_coupons").where({ id }).delete();

        response.status(200).json({ message: "Cupom deletado com sucesso" });
    }
}

module.exports = DiscountCouponsController;
