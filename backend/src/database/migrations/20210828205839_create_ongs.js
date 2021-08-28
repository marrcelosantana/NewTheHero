exports.up = function(knex) { // O que você quer que seja feito.
  return knex.schema.createTable('ongs', function(table){
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  })
};

exports.down = function(knex) { // O que você precisa fazer, caso algo dê errado.
  return knex.schema.dropTable('ongs');
};
