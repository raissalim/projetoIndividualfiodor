var quizModel = require("../models/quizModel");


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

  console.log(req.body);

  quizModel.responder(fkUsuario,fkPergunta,fkAlternativa).
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
    var fkUsuario = req.body.fkUsuario;
    var pontuacao = req.body.pontuacao;


    if (!fkUsuario || pontuacao == null) {
        return res.status(400).send("Dados inválidos");
    }


   quizModel.finalizar(idTentativa)
      .then((resultado)=>{
        res.status(200).json(resultado);
      })
      .catch(erro =>{
        res.status(500).json(erro)
      });
 }

 
module.exports = {
  listarPerguntas,
  responder,
  listarAlternativas,
  finalizar
};
