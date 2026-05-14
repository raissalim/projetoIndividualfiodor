var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nomeUsuario, email, tipoUsuario
        FROM usuario
        WHERE email = ? AND senha = ?
    `;
                return database.executar(instrucaoSql, [email, senha]);
            }
// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
   var instrucaoSql = `
        INSERT INTO usuario (nomeUsuario, email, senha)
        VALUES ('${nome}', '${email}', '${senha}')
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function usuariosativos(){
    var instrucaoSql = 
    `SELECT COUNT(DISTINCT fkUsuario) AS usuariosAtivos
     FROM tentativas`;
      return database.executar(instrucaoSql);
}
function usuariosInativos() {

    var instrucaoSql = `
        SELECT COUNT(*) AS usuariosInativos
        FROM usuario
        WHERE idUsuario NOT IN (
            SELECT DISTINCT fkUsuario
            FROM tentativas
        );
    `;

    return database.executar(instrucaoSql);
}

function buscarTotalUsuarios() {

    var instrucaoSql = `
        SELECT COUNT(*) AS totalUsuarios
        FROM usuario;
    `;

    return database.executar(instrucaoSql);
}

function dadosGrafico(){

    let instrucaoSql = `
    SELECT 
    WEEK(dataCadastro) as Semana,
    COUNT(idUsuario) as totalUsuarios
    FROM usuario
    GROUP BY WEEK(dataCadastro)
    ORDER BY Semana ;

    `;

    return database.executar(instrucaoSql);
}



module.exports = {
    autenticar,
    cadastrar,
    usuariosativos,
    usuariosInativos,
    dadosGrafico,
    buscarTotalUsuarios
};