var express = require("express");
var cors = require("cors");
var path = require("path"); 

var ambiente_processo = 'desenvolvimento';
var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

var app = express();

// ROTAS
var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var quizRouter = require("./src/routes/quiz");

// CONFIG
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/quiz", quizRouter);



var PORTA_APP = process.env.APP_PORT || 3333;



// SERIDOR
app.listen(PORTA_APP, function () {
    console.log(`🚀 Servidor rodando em http://localhost:${PORTA_APP}`);
});