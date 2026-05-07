var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email) {
        return res.status(400).send("Email undefined");
    }
    if (!senha) {
        return res.status(400).send("Senha undefined");
    }

    usuarioModel.autenticar(email, senha)
        .then(function (resultado) {

            if (resultado.length == 1) {
                res.json({
                    id: resultado[0].idUsuario,
                    nome: resultado[0].nomeUsuario,
                    email: resultado[0].email
                });

            } else if (resultado.length == 0) {
                res.status(403).send("Email ou senha inválidos");
            } else {
                res.status(403).send("Erro: usuários duplicados");
            }

        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
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

module.exports = {
    autenticar,
    cadastrar
};