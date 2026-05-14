var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/buscarTotalUsuarios",function (req,res){
    usuarioController.buscarTotalUsuarios(req,res);
});

router.get("/usuariosativos", function (req,res){
 usuarioController.usuariosativos(req,res);
});

router.get("/usuariosInativos", function (req,res){
    usuarioController.usuariosInativos(req,res)
});
router.get("/dadosGrafico", function(req, res){
    usuarioController.obterDados(req, res);
});

module.exports = router;