exports.up = (knex) =>
  knex.schema.createTable("contributions", (tbl) => {
    tbl.increments();
    tbl
      .integer("user_id", 128)
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.float("amount", 128).notNullable();
  });

exports.down = (knex) => knex.schema.dropTableIfExists("contributions");
