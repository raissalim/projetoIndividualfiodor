var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email){
         return res.status(400).send("Email undefined");
    }
    if (!senha) {
        return res.status(400).send("Senha undefined");
    }

    usuarioModel.autenticar(email, senha)
        .then(function (resultado) {

            console.log("RESULTADO LOGIN:", resultado);

            if (resultado.length == 1) {

                return res.json({
                    id: resultado[0].idUsuario,
                    nome: resultado[0].nomeUsuario,
                    email: resultado[0].email,
                    tipoUsuario: resultado[0].tipoUsuario
                });

            }

            if (resultado.length == 0) {
                return res.status(403).send("Email ou senha inválidos");
            }

            return res.status(403).send("Erro: usuários duplicados");

        })
        .catch(function (erro) {
            console.log(erro);
            return res.status(500).json(erro.sqlMessage);
        });
}
function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
      if (!nome) {
        return res.status(400).send("Nome inválido");
    }
    if (!email) {
        return res.status(400).send("Email inválido");
    }
    if (!senha) {
        return res.status(400).send("Senha inválida");
    }

    usuarioModel.cadastrar(nome, email, senha)
        .then(function () {
            return res.status(200).send("Usuário cadastrado com sucesso!");
        })
        .catch(function (erro) {
            console.log(erro);
            return res.status(500).json(erro.sqlMessage);
        });
}


function buscarTotalUsuarios(req, res) {

    usuarioModel.buscarTotalUsuarios()
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).send(erro.sqlMessage);
        });
}

function usuariosativos(req,res){
     usuarioModel.usuariosativos()
    .then(resultado =>{
        res.json(resultado);

    })
    .catch(erro =>{
        console.log(erro)
        res.status(500).send(erro.sqlMessage)
    });
}

function usuariosInativos(req,res){
      usuarioModel.usuariosInativos()
      .then(resultado =>{
           res.json(resultado);
      })
      .catch(erro =>{
        console.log(erro)
          res.status(500).send(erro.sqlMessage)
      });
}

 function obterDados(req,res){
    usuarioModel.dadosGrafico()
      
    .then(function(resultado){

        res.json(resultado);

    })

    .catch(function(erro){

        console.log(erro);
        res.status(500).json(erro);

    });

 }
 
module.exports = {
    autenticar,
    cadastrar,
    usuariosativos,
    usuariosInativos,
    obterDados,
    buscarTotalUsuarios
};