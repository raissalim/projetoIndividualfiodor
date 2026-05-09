var database = require("../database/config");



function iniciarTentativa(fkUsuario){
    var instrucaoSql= `INSERT INTO tentativas (fkUsuario, pontuacao)
        VALUES (${fkUsuario},0)
    `;
    return database.executar(instrucaoSql);
}

function listarPerguntas() {
  var instrucaoSql = `SELECT * FROM pergunta`;

  return database.executar(instrucaoSql);
}

function responder(fkUsuario,fkPergunta,fkAlternativa,fkTentativa) {
  var instrucaoSql = `
  INSERT INTO respostaUsuario (fkUsuario, fkPergunta, fkAlternativa,fkTentativa)
  VALUES (${fkUsuario}, ${fkPergunta}, ${fkAlternativa}, ${fkTentativa})
  `;
  console.log(instrucaoSql)

  return database.executar(instrucaoSql);
}

function listarAlternativas(idPergunta) {

    var instrucaoSql = `
        SELECT 
            idAlternativaPergunta,
            descricao,
            alternativaCerta
        FROM alternativaPergunta
        WHERE fkPergunta = ${idPergunta};
    `;

    return database.executar(instrucaoSql);
}

function finalizar(fkTentativa, pontuacao) {

    var instrucaoSql = `
        UPDATE tentativas
        SET pontuacao = ${pontuacao}
        WHERE idTentativa = ${fkTentativa};
    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports =

{ 
    iniciarTentativa,
    responder,
    finalizar,
    listarPerguntas,
    listarAlternativas

  };
