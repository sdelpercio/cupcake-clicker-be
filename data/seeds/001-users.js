exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Amanda", password: "123" },
        { username: "Jojo", password: "password" },
        { username: "Boo", password: "hello" },
      ]);
    });
};
