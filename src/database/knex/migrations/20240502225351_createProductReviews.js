exports.up = knex => knex.schema.createTable("product_reviews", table => {
    table.increments("id");
    table.integer("product_id").unsigned().references("id").inTable("products");
    table.integer("customer_id").unsigned().references("id").inTable("clients");
    table.integer("rating").notNullable();
    table.text("comment");
    table.timestamp('created_at').defaultTo(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("product_reviews");
