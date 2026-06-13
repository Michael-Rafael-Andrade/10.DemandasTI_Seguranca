const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'demandas_ti', // nome da base de dados
    'fullstack',  // nome do usuário do banco de dados
    'BancoDeDados', // senha do usuáio
    {
        host: 'localhost',  // endereço do Banco de Dados
        dialect: 'mysql'    // dialeto do Banco de Dados
    }
);
// APÓS TESTAR EU FAÇO UM COMENTÁRIO NESTAS LINHAS QUE TESTA O SERVIDOR
// sequelize.authenticate().then(() => {
//     console.log('Conexão com banco de dados estabelecida com sucesso.');
// }).catch((error) => {
//     console.error('Erro ao se conectar ao banco de dados: ', error);
// })

module.exports = sequelize; // exportar o módulo server.sequelize