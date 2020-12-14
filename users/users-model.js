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
      "users.id",
      "users.username",
      "users.password",
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

  db("item_costs")
    .insert({
      user_id: id,
      toastersCost: 20,
      ovensCost: 100,
      industrialOvensCost: 500,
      friendsCost: 1000,
      chefsCost: 5000,
      cupcakeGodsCost: 100000,
    })
    .then();
  db("item_counts")
    .insert({
      user_id: id,
      total: 0,
      cupcakes: 0,
      toasters: 0,
      ovens: 0,
      industrialOvens: 0,
      friends: 0,
      chefs: 0,
      cupcakeGods: 0,
    })
    .then();

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
