const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users")
    .join("item_counts as counts", "users.id", "=", "counts.user_id")
    .join("item_costs as costs", "users.id", "=", "costs.user_id")
    .select(
      "user.id",
      "user.username",
      "user.password",
      "counts.total",
      "counts.cupcakes",
      "counts.toasters",
      "counts.ovens",
      "counts.industrialOvens",
      "counts.friends",
      "counts.chefs",
      "counts.cupcakeGods",
      "costs.toastersCost",
      "costs.ovensCost",
      "costs.industrialOvensCost",
      "costs.friendsCost",
      "costs.chefsCost",
      "costs.cupcakeGodsCost"
    )
    .where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}

function findById(id) {
  return db("users").where({ id }).first();
}
