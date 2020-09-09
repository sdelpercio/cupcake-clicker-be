exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("item_counts")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("item_costs").insert([
        {
          user_id: 1,
          toastersCost: 20,
          ovensCost: 100,
          industrialOvensCost: 500,
          friendsCost: 1000,
          chefsCost: 5000,
          cupcakeGodsCost: 100000,
        },
        {
          user_id: 2,
          toastersCost: 2000,
          ovensCost: 10000,
          industrialOvensCost: 50000,
          friendsCost: 100000,
          chefsCost: 500000,
          cupcakeGodsCost: 10000000,
        },
        { user_id: 3 },
      ]);
    });
};
