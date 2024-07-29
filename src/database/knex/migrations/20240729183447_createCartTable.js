exports.up = knex => knex.schema.createTable("cart", table => {
    table.increments('id').primary();
    table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');
    table.integer('quantity').notNullable().defaultTo(1);
    table.timestamp('added_at').defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("cart");
