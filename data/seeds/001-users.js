exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .raw("TRUNCATE TABLE users CASCADE")
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Amanda", password: "Monkey12#" },
        { username: "Jojo", password: "Password12#" },
        { username: "Boo", password: "Hello12#" },
      ]);
    });
};
