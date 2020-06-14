exports.up = (knex) =>
  knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.text("email", 128).notNullable().unique();
    tbl.text("name", 128).notNullable();
    tbl.text("password", 128).notNullable();
    tbl
      .integer("association_id", 128)
      .unsigned()
      .references("id")
      .inTable("associations")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTableIfExists("users");
