var express = require("express");
var router = express.Router();  

var QuizController = require("../controllers/QuizController");

router.get("/perguntas", QuizController.listarPerguntas);
   
router.get("/alternativas/:idPergunta", QuizController.listarAlternativas);


router.post("/responder", QuizController.responder);

router.post("/finalizar", QuizController.finalizar );

router.post("/iniciar",QuizController.iniciar)


module.exports = router;