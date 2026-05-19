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
  function maiorPontuacao() {

    var instrucaoSql = `
        SELECT MAX(pontuacao) AS maiorPontuacao
        FROM tentativas;
    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

   function mediaPontuacao(){
    var instrucaoSql=`
     SELECT AVG(pontuacao) AS mediapontuacao
        FROM tentativas; `;

    console.log(instrucaoSql)

    return database.executar(instrucaoSql)
   }

   function ranking(){
    var instrucaoSql=`

       SELECT 
            usuario.nomeUsuario,
            MAX(tentativas.pontuacao) AS pontuacao
        FROM tentativas
        JOIN usuario
            ON tentativas.fkUsuario = usuario.idUsuario
        GROUP BY usuario.nomeUsuario
        ORDER BY pontuacao DESC
        LIMIT 5;
    `;

     console.log(instrucaoSql)

    return database.executar(instrucaoSql)
   }

   function perguntaserradas(){
     var instrucaoSql=`SELECT 
    pergunta.enunciado,
    COUNT(*) AS erros
    FROM respostaUsuario
    JOIN alternativaPergunta
    ON respostaUsuario.fkAlternativa = alternativaPergunta.idAlternativaPergunta
    JOIN pergunta
        ON respostaUsuario.fkPergunta = pergunta.idPergunta
    WHERE alternativaPergunta.alternativaCerta = 0
    GROUP BY pergunta.enunciado
    ORDER BY erros DESC;`;

     console.log(instrucaoSql)
     return database.executar(instrucaoSql);
   }
module.exports =

{ 
    iniciarTentativa,
    responder,
    finalizar,
    listarPerguntas,
    maiorPontuacao,
    mediaPontuacao,
    ranking,
    perguntaserradas,
    listarAlternativas

  };
