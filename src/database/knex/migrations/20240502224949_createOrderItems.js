exports.up = knex => knex.schema.createTable("order_items", table => {
    table.increments("id");
    table.integer("order_id").unsigned().references("id").inTable("orders");
    table.string("product_description");
    table.string("color");
    table.integer("size");
    table.integer("quantity").notNullable();
    table.decimal("unit_price", 10, 2).notNullable();
    table.decimal("total_value", 10, 2).notNullable();
    table.decimal("discount", 10, 2);
    table.json("return_exchange_info");
});


exports.down = knex => knex.schema.dropTable("order_items");
