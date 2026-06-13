const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    // OU como opção de fallback
    process.env.DB_NAME || 'demandas_ti',
    process.env.DB_USER || 'fullstack',
    // dados sensíveis sem opção de fallback
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        dialect: process.env.DB_DIALECT || 'mysql'
    }
);
    // 'demandas_ti', // nome da base de dados
    // 'fullstack',  // nome do usuário do banco de dados
    // 'BancoDeDados', // senha do usuário
    // {
    //     host: 'localhost',  // endereço do Banco de Dados
    //     dialect: 'mysql'    // dialeto do Banco de Dados
    // }
// );



// APÓS TESTAR EU FAÇO UM COMENTÁRIO NESTAS LINHAS QUE TESTA O SERVIDOR
// sequelize.authenticate().then(() => {
//     console.log('Conexão com banco de dados estabelecida com sucesso.');
// }).catch((error) => {
//     console.error('Erro ao se conectar ao banco de dados: ', error);
// })

module.exports = sequelize; // exportar o módulo server.sequelize