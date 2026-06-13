const Demanda = require('../model/modelos');

exports.cria_get = function (req, res) {
    const contexto = {
        titulo_pagina: "Criar nova demanda",
    }

    res.render('cria_demanda', contexto);
}

exports.cria_post = async function (req, res) {
    const nova_demanda = {
        titulo: req.body.titulo,
        texto: req.body.texto,
        urgencia: req.body.urgencia,
        // status padrão 'pendente', definido no modelo
    };
    // validação simples no controller
    const erros = [];
    if(!nova_demanda.titulo || nova_demanda.titulo.trim() === ''){
        erros.push({ msg: 'Título é obrgatório' });
    }
    if(!nova_demanda.texto || nova_demanda.texto.trim() === ''){
        erros.push({ msg: 'Texto é obrigatório'});
    }
    const urg = Number(nova_demanda.urgencia);
    if(!nova_demanda.urgencia || Number.isNaN(urg) || urg < 1 || urg > 5){
        erros.push({ msg: 'Urgência deve ser um número entre 1 e 5'});
    }

    if(erros.length > 0){
        const contexto = {
            titulo_pagina: 'Criar nova demanda',
            erros: erros,
            old: { titulo: nova_demanda.titulo, texto: nova_demanda.texto, urgencia: nova_demanda.urgencia }
        };
        return res.status(400).render('cria_demanda', contexto);
    }

    try {
        await Demanda.create({titulo: nova_demanda.titulo, texto: nova_demanda.texto, urgencia: urg });
        return res.redirect('/');
    } catch (error) {
        console.error('Erro ao criar demanda: ', error);
        return res.status(500).send('Erro ao criar demanda');
    }
};

exports.consulta = async function (req, res) {
    const id_demanda = Number(req.params.id);

    // validação do parâmetro id (deve ser inteiro positivo)
    if(!id_demanda || Number.isNaN(id_demanda) || !Number.isInteger(id_demanda) || id_demanda <= 0){
        return res.status(400).send('ID inválido');
    }

    try {
        const demanda = await Demanda.findByPk(id_demanda);
        if (!demanda) {
            return res.status(404).send('Demanda não encontrada');
        }

        // formata a data de criação de cada demanda para o formato brasileiro
        demanda.criada_em_fmt = new Date(demanda.criada_em).toLocaleDateString('pt-BR');

        const contexto = {
            titulo_pagina: "Detalhes da Demanda",
            demanda: demanda,
        };
        return res.render('consulta_demanda', contexto);
    } catch (error) {
        console.error('Erro ao recuperar demanda: ', error);
        return res.status(500).send('Erro ao recuperar demanda');
    }
};

exports.altera_status = async function (req, res) {
    const id_demanda = Number(req.params.id);
    const novo_status = req.params.novo_status;

    // validação dos parâmetros
    const status_permitidos = ['pendente', 'em_andamento', 'concluido'];
    if(!id_demanda || Number.isNaN(id_demanda) || !Number.isInteger(id_demanda) || id_demanda <= 0){
        return res.status(400).send('ID inválido');
    }
    if(!status_permitidos.includes(novo_status)){
        return res.status(400).send('Status inválido');
    }

    try {
        await Demanda.update(
            { status: novo_status },  // novos valores dos atributos
            { where: { id: id_demanda } } // condição para encontrar a demanda a ser utilizada
        );
        return res.redirect('/');
    } catch(error){
        console.error('Erro ao alterar status da demanda: ', error);
        return res.status(500).send('Erro ao alterar status da demanda');
    }
};