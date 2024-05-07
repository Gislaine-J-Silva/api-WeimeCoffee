exports.up = knex => knex.schema.createTable("shipping_method", table => {
    table.increments("id");
    table.string("shipping_name").notNullable();
    table.string("shipping_description").notNullable();
    table.string("shipping_information").notNullable();
    table.decimal("shipping_fee", 10, 2).notNullable();
});

exports.down = knex => knex.schema.dropTable("shipping_method");