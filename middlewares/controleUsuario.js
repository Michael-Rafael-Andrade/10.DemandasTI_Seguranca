const { passport } = require('../config/passport');

// Middleware que verifica se a requisição possui um token JWT válido no header Authorization.
// Se o token for válido, o Passport popula req.user com os dados do usuário autenticado.
// Se não houver token ou ele for inválido, retorna automaticamente 401 unauthorized.
// O { session: false } é essencial: instrui o Passport a não usar sessões (API stateless).

exports.ehAutenticado = passport.authenticate('jwt', { session: false });