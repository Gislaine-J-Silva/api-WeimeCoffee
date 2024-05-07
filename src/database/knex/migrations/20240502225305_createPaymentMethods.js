exports.up = knex => knex.schema.createTable("payment_method", table => {
    table.increments("id");
    table.string("method_name").notNullable();
    table.string("image");
    table.boolean("active").defaultTo(true);
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
})


exports.down = knex => knex.schema.dropTable("payment_method");
