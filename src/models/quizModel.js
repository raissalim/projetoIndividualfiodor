var database = require("../database/config");

function listarPerguntas() {
  var instrucaoSql = `SELECT * FROM pergunta`;

  return database.executar(instrucaoSql);
}

function responder(fkUsuario,fkPergunta,fkAlternativa,fkTentativa) {
  var instrucaoSql = `
  INSERT INTO respostaUsuario (fkUsuario, fkPergunta, fkAlternativa,fkTentativa)
  VALUES (${fkUsuario}, ${fkPergunta}, ${fkAlternativa}, ${fkTentativa})
  `;

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

 function finalizar(fkUsuario, pontuacao) {

    var instrucaoSql = `
        INSERT INTO tentativas
        (fkUsuario, pontuacao)
        VALUES
        (${fkUsuario}, ${pontuacao});
    `;

    return database.executar(instrucaoSql);
}


module.exports = 
{ listarPerguntas, 
  responder,
  listarAlternativas,
  finalizar

  };
