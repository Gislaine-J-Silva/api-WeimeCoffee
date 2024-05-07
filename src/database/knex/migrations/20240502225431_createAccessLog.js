exports.up = knex => knex.schema.createTable("access_log", table => {
    table.increments("id");
    table.integer("user_id").unsigned().references("id").inTable("clients");
    table.dateTime('access_time').defaultTo(knex.fn.now());
    table.string("ip_address");
    table.string("action_taken");
    table.string("access_device");
    table.string("browser_used");
    table.string("visited_product");
    table.text("details");
});

exports.down = knex => knex.schema.dropTable("access_log");
