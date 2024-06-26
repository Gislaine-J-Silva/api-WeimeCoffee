
exports.up = knex => knex.schema.createTable("products", table => {
    table.increments("id");
    table.string("name", 100);
    table.text("description");
    table.decimal("price", 10, 2);
    table.text("category");
    table.text("brand");
    table.integer("stock_quantity");
    table.string("img_product").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("products");
