exports.up = (knex) =>
  knex.schema.createTable("contributions", (tbl) => {
    tbl.increments();
    tbl.text("user_id", 128).notNullable().unique();
    tbl.float("amount", 128).notNullable();
  });

exports.down = (knex) => knex.schema.dropTableIfExists("contributions");
