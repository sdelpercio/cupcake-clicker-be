# <p align="center">How to Build a Node.js Server</p>

## Creating a Git Repository & Adding Dependencies

### Create a directory for your server to live

- `mkdir < server-directory-name >`
- `git init` //if download from a repo, use `git remote -v` to view the repo list may include `mine and origin` make sure push to the correct repo if the repo is forked from another one (to point/change the project to the correct repo, use `git remote set-url` )
- `npm i -g gitignore` //creates gitignore file globally or
- `npx gitignore node` //creates git.ignore for node
- `npm init -y` //creates package.json

### Add your dependencies

- `npm i express dotenv helmet cors knex sqlite3 pg** bcryptjs* jsonwebtoken*`
- `npm i nodemon jest supertest knex-cleaner*** -D`

`* only if using database with login/register`
`** only if using Postgres for production`
`*** only if need seeding cleaner`

- Update package.json scripts to include server, start and test script(s):

```
"scripts": {
	"server": "nodemon index.js",  //defaults to index.js
	"start": "node index.js", (optional, for production)
  "test": "jest --watch"
}
"jest": {
  "testEnvironment": "node"  //optional if not using Jest.config file
}
```

## Adding Migrations & Seeding

- `(npx) knex init` //creates an abstracted knexfile.js, optional to use npx if knex is not globally installed

- Update knexfile.js to:

```
module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/auth.db3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  production: {  //optional if use Postgres for production
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
  testing: {  //optional if use sqlite3 for testing
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/auth.db3"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
};
```

## Create a table within a migration folder:

- `knex migrate:make table_name`

- Example schema for a user table:

```
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
      users.increments();

      users
        .string('username', 128)
        .notNullable()
        .unique();
	.index();  //this creates index for username

      users
        .string('password', 128)
        .notNullable();
    });
  };

  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };

```

- `knex migrate:latest` (creates .db3 file)
- `knex migrate:rollback` (deletes .db3 file)

## Seeding (optional):

- `knex seed:make 000-cleanup` (optional: to clean up all the tables)

- Example 000-cleanup.js

```
const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex);
};
```

- `knex seed:make 001-seedName` (makes a new seed)

- Example seeds > 001-exampleSeed.js file(password should be hashed, this is just example):

```
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        { username: 'Amanda', password: '123' },
        { username: 'Jojo', password: 'password'  },
        { username: 'Boo', password: 'hello'  }
      ]);
    });
};
```

- `knex seed:run` (runs/resets seed)

## Creating Server, Routes and Helper Functions

- In the data directory, create a file called "dbConfig.js" and include the following code:

```
const knex = require('knex');
const config = require('../knexfile.js');

const environment = process.env.DB_ENV || 'development';

module.exports = knex(config[environment]);
```

## Testing

- There is a sample testing file written for server.js inside API folder

- Review the code in this repository for more information.

## <p align="center">< -------- after forking and cloning this repo ----------></p>

- run command `npm install` to get your dependencies listed above.
- If you fork and clone this repo you do not need to follow README steps, they are already completed.
