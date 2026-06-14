const helmet = require('helmet');

// função que retorna o middleware do Helmet configurado, com base 
// no ambiente de execução (produção ou desenvolvimento).
module.exports = function (emProd) {
    return helmet({

        // --- hidePoweredBy ---
        // Remove o header "X-Powered-By: Express" das respostas.
        // Evita expor a tecnologia do servidor, dificultando ataques direcionados.
        hidePoweredBy: true,

        // --- fameguard ---
        // Define o header "X-Frame-Options: DENY".
        // Impede que a aplicação seja embutida em <iframe> de outros sites, protegendo contra ataques de Clickjacking.
        frameguard: { action: 'deny' },

        // --- noSniff ---
        // Define o header "X-Content-Type-Options: nosniff".
        // Impede que o navegador "adivinhe" (sniff) o tipo MIME de um arquivo e o execute como um tipo diferente do declarado pelo servidor.
        // Ex: impede que um arquivo .txt seja interpretado como JavaScript.
        noSniff: true,

        // --- referrerPolicy ---
        // Define o header "Referrer-Policy: no referrer".
        // Impede que a URL da página atual seja enviada no header "Referer", quando o usuário navega para outro site,
        // evitando vazamento de URLs internas, parâmetros de query ou dados sensíveis.
        referrerPolicy: { policy: 'no-referrer' },

        // --- hsts (HTTP Strict Transport Security) ---
        // Define o header "Stric-Transport-Security".
        // Instrui o navegador a acessar o domínio SOMENTE via HTTPS pelo período
        // definido em maxAge (segundos). "incluedeSubDomains" aplica a regra também a todos os subdomínios.
        // IMPORTANTE: ativar apenas em produção com HTTPS configurado. Em HTTP local, o HSTS tornaria o site inacessível por tempo equivalente ao maxAge.
        // A variável "emProd" (process.env.ENV === 'prod') controla essa ativação.
        hsts: emProd ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false,


        // --- ContentSecurityPolicy (CSP) ---
        // Define o header "Content-Security-Policy".
        // É a proteção mais importante contra XSS (Cross-Site Scripting).
        // A CSP declara quais origens (domínios) o navegador pode usar para carregar cada tipo de recurso. Se um atacante injetar um <script> externo, o navegador o bloqueará porque a origem não está na lista permitida.
        contentSecurityPolicy: {
            directives: {

                // Controla de onde scripts JavaScript podem ser carregados.
                // "'self'" permite apenas arquivos .js servidos pelo próprio servidor
                // (Bootstrap JS local em public/javascripts/).
                scriptSrc: ["'self'"],

                // Controla de onde estilos CSS podem ser carregados.
                // "'self'" permite arquivos .css locais (Bootstrap CSS em public/stylesheets/).
                // Adicionamos o CDN do Bootstrap Icons para permitir o carregamento do stylesheet hospedado em https://cdn.jsdeliv.net.
                styleSrc: ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],


                // Controla de onde imagens podem ser carregadas
                // "'self'" permite imagens locais (public/images/).
                // "data:" permite imagens embutidas em base64 (ex: ícones inline).
                imgSrc: ["'self'", "data:"],

                // Controla de onde fontes podem ser carregadas.
                // Inclui o CDN do Bootstrap Icons para que as fontes referenciadas pelo stylesheet remoto possam ser baixadas corretamente.
                fontSrc: ["'self'", "http://cdn.jsdelivr.net"],

                // Bloqueia completamente plugins de objeto (Flash, Silverlight, etc).
                // "'none'" é a opção mais restritiva e recomendada para aplicações modernas.
                objectSrc: ["'none'"],

                // Controla para quais destinos os <form> da aplicação podem enviar dados.
                // "'self'" garante que formulários só submetam para o próprio servidor, protegendo contra ataques onde um formulário é redirecionado para um servidor malicioso.
                formAction: ["'self'"],

                // Complementa o frameguard: define quais páginas podem embutir esta aplicação em <frame>, <iframe>, <embed> ou <object>.
                // "'none'" impede completamente (equivale a X-Frame-Options: DENY).
                frameAncestors: ["'none'"],

                // Regra padrão para qualquer tipo de recurso não coberto pelas demais diretivas. "'self'" significa apenas o próprio servidor defaultSrc: ["'self'"],
                defaultSrc: ["'self'"],


            },
        },

    });
};