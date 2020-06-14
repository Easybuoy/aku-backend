exports.up = (knex) =>
  knex.schema.createTable("accounts", (tbl) => {
    tbl.increments();
    tbl.float("total_contributions").notNullable();
    tbl
      .integer("user_id", 128)
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

exports.down = (knex) => knex.schema.dropTableIfExists("accounts");
