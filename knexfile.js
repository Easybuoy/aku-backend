// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_URL,
    searchPath: ["knex", "public"],
    migrations: {
      directory: "./config/db/migrations",
    },
    seeds: { directory: "./config/db/seeds" },
  },
  production: {
    client: "pg",
    connection: process.env.DB_URL,
    searchPath: ["knex", "public"],
    migrations: {
      directory: "./config/db/migrations",
    },
    seeds: { directory: "./config/db/seeds" },
  },
};
