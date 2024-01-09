const Hapi = require('@hapi/hapi');
const assert = require('assert')
const http = require('http')
const { describe, it } = require('mocha')

describe('Testes API-Herois', () => {
  it('Deve retornar todos os dados', (done) => {
    http.get('http://localhost:2024/RetornarValoresMongo', (res) => {
      let data = ""
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        const responseBody = JSON.parse(data);
        const resultado = (responseBody.length === 0) ? console.log('Valores nao retornados') : console.log('Valores retornados com sucesso')
        done()
      })
    })
  })

  it('Deve retornar apenas os 3 usuarios', (done) => {
    http.get('http://localhost:2024/RetornarComSkipELimit?limit=3', (res) => {
      let data = ""
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        const responseBody = JSON.parse(data)
        const expected = 3
        assert.strictEqual(responseBody.length , expected, 'O tamanho da variavel ultrapassa o limite de 3')
        done()
      })
    })
  })
/*
  it('Deve retornar com skip de 3 usuarios', (done) => {
    http.get('http://localhost:2024/RetornarComSkipELimit?skip=3&limit=1', (res) => {
      let data = ""
      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        const responseBody = JSON.parse(data)
        const idTerceiroLugar = responseBody[0]._id
        assert.strictEqual(200, res.statusCode, 'Skip funcionando corretamente!')
        assert.strictEqual('6543f44484c7d4c24cbf5677', idTerceiroLugar, 'Skip nao funcionou corretamente, id')
        done()
      })
    })
  })
*/
  it('Deve retornar com limit de 3 usuarios', (done) => {
    http.get('http://localhost:2024/RetornarComSkipELimit?limit=3', (res) => {
      var data = ""
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        const DadosRequisitados = JSON.parse(data)
        assert.strictEqual(200, res.statusCode, 'Limit funcionando corretamente!')
        assert.strictEqual(DadosRequisitados.length, 3, 'A array excedeu o limite de 3 usuarios')
        done()
      })
    })
  })

  it('Deve adicionar um usuario ao banco de dados!', async () => {
    const NovoUsuario = {
      nome: 'Daniel',
      poder: 'prospeção temporal'
    };
  
    const options = {
      hostname: 'localhost',
      port: 2024,
      path: '/AdicionarUsuario',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = '';
  
        res.on('data', (chunk) => {
          data += chunk;
        });
  
        res.on('end', () => {
          const responseBody = JSON.parse(data);
          console.log('Responsebody', res.statusCode);
          console.log('Real Response:', responseBody); // Adicionado para logar a resposta real
          assert.strictEqual(201, res.statusCode, 'Usuario criado com sucesso');
          resolve();
        });
      });
  
      req.on('error', (error) => {
        reject(error);
      });
  
      req.write(JSON.stringify(NovoUsuario));
      req.end();
    });
  });
  
})