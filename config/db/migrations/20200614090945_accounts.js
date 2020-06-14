exports.up = (knex) =>
  knex.schema.createTable("accounts", (tbl) => {
    tbl.increments();
    tbl
      .integer("user_id", 128)
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.float("total_contributions", 128).notNullable();
  });

exports.down = (knex) => knex.schema.dropTableIfExists("accounts");
