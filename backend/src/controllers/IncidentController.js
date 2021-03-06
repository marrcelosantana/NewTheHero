const connection = require('../database/connection');

module.exports = {
  async list(request, response){
    const { page = 1 } = request.query; // Usei essa variável para fazer a paginação dos casos.

    const [count] = await connection('incidents').count(); //Para contar todos os casos e mostrar no front-end.

    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5) // Mostrará apenas 5 casos por página.
    .offset((page - 1) * 5) // Aqui ele passa a página e depois mostra mais 5 casos.
    .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
    
    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },

  async create(request, response){
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    })
    return response.json({ id });
  },
  
  async delete(request, response){
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents').where('id', id).select('ong_id').first();

    if(incident.ong_id !== ong_id){ // Aqui comparo se os id's são diferentes e apresento o erro.
      return response.status(401).json({ error: 'Não autorizado!!' });
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  }
}