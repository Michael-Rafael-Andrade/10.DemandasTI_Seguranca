// IMPORTAÇÃO DA CLASSE QUE GERENCIA AS NOTAS NA MEMÓRIA
const Demanda = require('../model/modelos.js');

// cria e já exporta a função que será responsável pela tela principal
exports.tela_principal = async function (req, res) {

    try {

        // Lista todas as demandas utilizando o método do Sequelize
        const demandas = await Demanda.findAll();

        // Formata a data de criação de cada demanda para o formato brasileiro
        demandas.forEach(demanda => {
            demanda.criada_em_fmt = new Date(demanda.criada_em).toLocaleDateString('pt-BR');
        });

        const contexto = {
            titulo_pagina: "Gerenciador de Demandas de TI",
            demandas: demandas,
        }

        // Criando uma nova demanda, utilizando o método do Sequelize
        // await Demanda.create({
        //     titulo: 'Primeira demanda',
        //     texto: 'Texto da primeira demanda',
        //     urgencia: 3,
        // })

        // renderiza o arquivo index.hbs, dentro da pasta view
        return res.render('index', contexto);

    } catch (error) {
        console.error('Erro ao listar demandas: ', error);
        return res.status(500).send('Erro ao listar demandas');
    }

}
