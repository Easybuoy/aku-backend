exports.up = (knex) =>
  knex.schema.createTable("transaction_history", (tbl) => {
    tbl.increments();
    tbl.float("amount", 128).notNullable();
    tbl.text("type", 128).notNullable();
    tbl
      .integer("user_id", 128)
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTableIfExists("transaction_history");
