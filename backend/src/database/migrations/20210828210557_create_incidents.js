exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table){
    table.increments(); //Cria uma chave primária que se auto incrementa.

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable(); //Cria uma coluna para o id da tabela ongs.

    table.foreign('ong_id').references('id').inTable('ongs'); //Coloca ong_id como chave estrangeira e referencia na tabela ongs.
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
