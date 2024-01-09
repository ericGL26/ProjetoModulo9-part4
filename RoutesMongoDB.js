const ObterDadosMongoDB = require('./Mongodb');

async function CriarRotasMongoDB() {
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
      handler: (request, h) => {
        const NovoUsuario = request.payload; 
        return h.response({ mensagem: 'Usuário adicionado com sucesso!' }).code(201);
      },
    },
  ];
}

module.exports = CriarRotasMongoDB;
