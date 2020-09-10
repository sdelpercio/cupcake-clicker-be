exports.up = function (knex) {
  return knex.schema.createTable("item_counts", (table) => {
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.integer("total").defaultTo(0);
    table.integer("cupcakes").defaultTo(0);
    table.integer("toasters").defaultTo(0);
    table.integer("ovens").defaultTo(0);
    table.integer("industrialOvens").defaultTo(0);
    table.integer("friends").defaultTo(0);
    table.integer("chefs").defaultTo(0);
    table.integer("cupcakeGods").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("item_counts");
};
