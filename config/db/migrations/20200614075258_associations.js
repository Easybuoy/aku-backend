exports.up = (knex) =>
  knex.schema.createTable("associations", (tbl) => {
    tbl.increments();
    tbl.text("name", 128).notNullable();
  });

exports.down = (knex) => knex.schema.dropTableIfExists("associations");
