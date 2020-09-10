exports.up = function (knex) {
  return knex.schema.table("item_counts", (table) => {
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.table("item_counts", (table) => {
    table.integer("user_id").references("id").inTable("users");
  });
};
