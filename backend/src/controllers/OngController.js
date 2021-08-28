const connection = require('../database/connection');
const crypto = require('crypto'); //Usei o crypto para criar um ID aleatório.


module.exports = {
  async list(request, response){
    const ongs = await connection('ongs').select('*'); //Seleciono todos os registros da tabela ongs.
    return response.json(ongs);
  },

  async create(request, response){
    const { name, email, whatsapp, city, uf } = request.body;
    
    const id = crypto.randomBytes(4).toString('HEX'); // Aqui eu digo que o ID terá 4 caracteres randoms em hexadecimal.

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    return response.json({ id });
  }
}
