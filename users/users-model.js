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

function updateItemCounts(user_id, update) {
  db("item_counts").where({ user_id }).update(
    {
      total: update.total,
      cupcakes: update.cupcakes,
      toasters: update.toasters,
      ovens: update.ovens,
      industrialOvens: update.industrialOvens,
      friends: update.friends,
      chefs: update.chefs,
      cupcakeGods: update.cupcakeGods,
    },
    ["total"]
  );
}
function updateItemCosts(user_id, update) {
  db("item_costs").where({ user_id }).update(
    {
      toastersCost: update.toastersCost,
      ovensCost: update.ovensCost,
      industrialOvensCost: update.industrialOvensCost,
      friendsCost: update.friendsCost,
      chefsCost: update.chefsCost,
      cupcakeGodsCost: update.cupcakeGodsCost,
    },
    ["toastersCost"]
  );
}
