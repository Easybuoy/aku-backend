exports.up = (knex) =>
  knex.schema.createTable("interests_log", (tbl) => {
    tbl.increments();
    tbl.integer("status", 128).notNullable();
    tbl
      .integer("user_id", 128)
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTableIfExists("interests_log");
