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
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTableIfExists("accounts");
