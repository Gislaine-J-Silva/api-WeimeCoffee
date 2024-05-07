exports.up = knex => knex.schema.createTable("order_history", table => {
    table.increments("id");
    table.integer("order_id").unsigned().references("id").inTable("orders")
    table.timestamp('date_time').defaultTo(knex.fn.now());
    table.string('event_description').notNullable();
});


exports.down = knex => knex.schema.dropTable("order_history");
