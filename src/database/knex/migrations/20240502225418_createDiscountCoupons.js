exports.up = knex => knex.schema.createTable("discount_coupons", table => {
    table.increments("id");
    table.string("coupon_code").notNullable().unique();
    table.enum("discount_type", ["percentage", "fixed_amount"]).notNullable();
    table.decimal("discount_value", 10, 2).notNullable();
    table.decimal("minimum_purchase_amount", 10, 2).defaultTo(0);
    table.string("eligible_product").defaultTo(null); //nulo, se o cupom for usado em qualquer produto.
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("discount_coupons");
