exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("item_counts")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("item_counts").insert([
        {
          user_id: 1,
          total: 2,
          cupcakes: 0,
          toasters: 0,
          ovens: 0,
          industrialOvens: 0,
          friends: 0,
          chefs: 0,
          cupcakeGods: 0,
        },
        {
          user_id: 2,
          total: 100000,
          cupcakes: 100000,
          toasters: 10,
          ovens: 10,
          industrialOvens: 10,
          friends: 10,
          chefs: 10,
          cupcakeGods: 10,
        },
        { user_id: 3 },
      ]);
    });
};
