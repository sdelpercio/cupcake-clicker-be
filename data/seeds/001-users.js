exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE TABLE users CASCADE");
  return knex("users").then(function () {
    // Inserts seed entries
    return knex("users").insert([
      { username: "Amanda", password: "Monkey12#" },
      { username: "Jojo", password: "Password12#" },
      { username: "Boo", password: "Hello12#" },
    ]);
  });
};
