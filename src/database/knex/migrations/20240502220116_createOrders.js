exports.up = knex => knex.schema.createTable("orders", table => {
    table.increments("id");
    table.integer("client_id").unsigned().references("id").inTable("clients");
    table.dateTime("order_date").notNullable();
    table.string("order_status");
    table.decimal("total_order_amount", 10, 2);
    table.integer("shipping_method_id").unsigned().references("id").inTable("shipping_methods");
    table.string("delivery_address");
    table.integer("payment_method_id").unsigned().references("id").inTable("payment_methods");
    table.string("payment_status");
    table.text("customer_notes");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("orders");