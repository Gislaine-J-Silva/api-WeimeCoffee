exports.up = knex => knex.schema.createTable("order_items", table => {
    table.increments("id");
    table.interger("order_id").unsigned().references("id").inTable("clients");
    table.string("product_description");
    table.string("color");
    table.interger("")
});


exports.down = knex => knex.schema.dropTable("order_items");
