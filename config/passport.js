const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Usuario } = require('../model/modelos');

// Chave secreta usada para assinar e verificar os tokens JWT.
// Em produção, deve ser armazenada em variável de ambiente (ex: process.env.JWT_SECRET).
const JWT_SECRET = 'CHAVE_SECRETA_DE_DESENVOLVIMENTO';

// Opções da estratégia JWT:
const opcoes = {
    // define como o token será extraído da requisição: do header Authorization: Bearer <token>
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // chave para verificar a assinatura do token
    secretOrKey: JWT_SECRET,
};

passport.use(
    new JwtStrategy(opcoes, async(jwt_payload, done) => {
        try{
            // Busca o usuário pelo id armazenado no payload do token
            const usuario = await Usuario.findByPk(jwt_payload.id);

            if(!usuario){
                // Usuário não encontrado: token inválido ou usuário removido
                return done(null, false);
            }

            // Usuário encontrado: passa o objeto para req.user nas rotas protegidas
            return done(null, usuario);
        } catch(error){
            return done(error);
        }
    })
);

// Exporta a instância do passport configurada e a constante JWT_SECRET
// JWT_SECRET é exportada para ser reutilizada no controller de login (geração do token)
module.exports = { passport, JWT_SECRET };