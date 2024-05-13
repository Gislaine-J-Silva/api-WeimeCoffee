
exports.up = knex => knex.schema.createTable("suppliers", table => {
    table.increments("id");
    table.text("name");
    table.text("address");
    table.text("email");
    table.string("phone");
    table.text("cnpj").unique();
    table.text("supplier_type");
    table.json("transaction_history");
    table.text("payment_terms");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    
});

exports.down = knex => knex.schema.dropTable("suppliers");
