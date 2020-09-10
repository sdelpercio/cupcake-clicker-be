exports.up = function (knex) {
  return knex.schema.createTable("item_costs", (table) => {
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.integer("toastersCost").defaultTo(20);
    table.integer("ovensCost").defaultTo(100);
    table.integer("industrialOvensCost").defaultTo(500);
    table.integer("friendsCost").defaultTo(1000);
    table.integer("chefsCost").defaultTo(5000);
    table.integer("cupcakeGodsCost").defaultTo(100000);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("item_costs");
};
