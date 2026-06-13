const { DataTypes, Model } = require('sequelize');
const sequelize = require('./server.js');

class Demanda extends Model { } // classe herdando de 'Model'
Demanda.init( // Construtor com a definição dos atributos
    {
        // substituindo o atributo 'chave'
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        titulo: { type: DataTypes.STRING, allowNull: false },
        texto: { type: DataTypes.TEXT, allowNull: false },
        urgencia: { type: DataTypes.INTEGER, allowNull: false, 
            validate: {min: 1, max: 5}
         },

         // Novo tipo ENUM, para limitar os valores possíveis do atributo 'status'
         status: {
            type: DataTypes.ENUM('pendente','em_andamento','concluido'),
            allowNull: false,
            defaultValue: 'pendente'
         }
    } ,
    {   // configurações adicionais do modelo
        sequelize, // para estabelecer conexão com o Banco de Dados
        freezeTableName: true,   // Nome da tabela igual ao nome da classe
        createdAt: 'criada_em',  // nome do atributo 'createdAt'
        updatedAt: 'atualizada_em',  // nome do atributo 'updatedAt'
    },
);
// RODO ESTE COMANDO APENAS UMA VEZ DEPOIS EU CRIO UM COMENTÁRIO NESTAS LINHAS E USO APENAS SE PRECISAR SINCRONIZAR ALGUM DADO COM O BANCO DE DADOS
// sequelize.sync({ alter: true }).then(() => {
//     // alter: true, para aplica alterações de código no Banco de Dados
//     console.log('Modelos sincronizados com o bando de dados.');
// }).catch((error) => {
//     console.error('Erro ao sincronizar modelos com o banco de dados: ', error);
// });

module.exports = Demanda;