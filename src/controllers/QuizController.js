var quizModel = require("../models/quizModel");



function iniciar(req,res){
    var fkUsuario = req.body.fkUsuario;
   quizModel.iniciarTentativa(fkUsuario)
   .then((resultado)=>{
    res.json({ idTentativa: resultado.insertId });
   })
   .catch((erro=>{
    console.log(erro)
    res.status(500).send(erro.sqlMessagem)
   }));
}


function listarPerguntas(req, res) {
  quizModel.listarPerguntas()
  .then((resultado) => {
    res.status(200).json(resultado);
  })
   .catch(erro=>{
     res.status(500).json(erro)
   });
}

function responder(req, res) {
    console.log("BODY RECEBIDO:", req.body);
  var fkUsuario = req.body.fkUsuario;
  var fkPergunta =req.body.fkPergunta;
  var fkAlternativa= req.body.fkAlternativa
    var fkTentativa = req.body.fkTentativa;

  console.log(req.body);

  quizModel.responder(fkUsuario,fkPergunta,fkAlternativa,fkTentativa).
  then((resultado) => {
    res.status(200).json(resultado);
  })
     .catch(erro=>{
        res.status(500).json(erro)
     });
}
function listarAlternativas(req, res) {
    var idPergunta = req.params.idPergunta;

    quizModel.listarAlternativas(idPergunta)
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch(erro => {
            res.status(500).json(erro);
        });
}

 function finalizar(req,res){
   var fkTentativa = req.body.fkTentativa;

    var pontuacao = req.body.pontuacao;

 console.log("FINALIZAR CHAMADO")
    console.log("Tentativa:", fkTentativa)
    console.log("Pontuação:", pontuacao)

   

    if (!fkTentativa || pontuacao == null) {
        return res.status(400).send("Dados inválidos");
    }


   quizModel.finalizar(fkTentativa,pontuacao)
      .then((resultado)=>{
        res.status(200).json(resultado);
      })
      .catch(erro =>{
        res.status(500).json(erro)
      });
 }

 
module.exports = {
  iniciar,
  listarPerguntas,
  responder,
  listarAlternativas,
  finalizar
};
