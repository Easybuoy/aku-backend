exports.up = (knex) =>
  knex.schema.createTable("associations", (tbl) => {
    tbl.increments();
    tbl.text("name", 128).notNullable();
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTableIfExists("associations");
