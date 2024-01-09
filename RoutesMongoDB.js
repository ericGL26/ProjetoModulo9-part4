const Joi = require('joi');

async function CriarRotasMongoDB() {
  const ObterDadosMongoDB = require('./Mongodb');
  const DadosMongoDB = await ObterDadosMongoDB();

  return [
    {
      method: 'GET',
      path: '/RetornarValoresMongo',
      handler: (request, h) => {
        return DadosMongoDB;
      },
    },
    {
      method: 'GET',
      path: '/RetornarComSkipELimit',
      handler: (request, h) => {
        const skip = parseInt(request.query.skip) || 0;
        const limit = parseInt(request.query.limit) || 2;

        const resultados = DadosMongoDB.slice(skip, skip + limit);

        return resultados;
      },
    },
    {
      method: 'POST',
      path: '/AdicionarUsuario',
      options: {
        validate: {
          payload: Joi.object({
            nome: Joi.string().required(),
            poder: Joi.string().required()
          })
        }
      },
      handler: async (request, h) => {
        console.log('OLAD')
        const db = request.mongo.db;
        const collection = db.collection('usuarios');
        try {
          const novoUsuario = {
            nome: request.payload.nome,
            poder: request.payload.poder
          };
          const resultado = await collection.insertOne(novoUsuario);

          return h.response({ statusCode: 201, mensagem: 'Usuário adicionado com sucesso', id: resultado.insertedId }).code(201);
        } catch (error) {
          console.log('error depois do statuscode201')
        }
      },
    },
  ];
}

module.exports = CriarRotasMongoDB;
