exports.up = (knex) =>
  knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.text("email", 128).notNullable().unique();
    tbl.text("name", 128).notNullable();
    tbl.text("password", 128).notNullable();
  });

exports.down = (knex) => knex.schema.dropTableIfExists("users");
