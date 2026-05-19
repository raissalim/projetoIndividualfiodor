
CREATE DATABASE noitesbrancas;


drop database noitesbrancas;
USE noitesbrancas;



CREATE TABLE usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nomeUsuario VARCHAR (100),
email varchar(100) unique,
senha varchar (45),
tipoUsuario ENUM('admin', 'comum') DEFAULT 'comum'
);

ALTER TABLE usuario add column dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE pergunta(
idPergunta INT PRIMARY KEY AUTO_INCREMENT,
enunciado VARCHAR(255)

);

CREATE TABLE alternativaPergunta(
idAlternativaPergunta INT PRIMARY KEY AUTO_INCREMENT,
fkPergunta int,
alternativaCerta tinyint(1),
descricao VARCHAR(255),
FOREIGN KEY (fkPergunta)
REFERENCES pergunta(idPergunta) -- vai ser usado para true e false aonde a validação vai ser se if(alternativaCerta!==1) false 
);


CREATE TABLE tentativas(
idTentativa int primary key auto_increment,
 fkUsuario INT,
 pontuacao INT,
 dataTentativa DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (fkUsuario)REFERENCES usuario(idUsuario)
);


CREATE TABLE respostaUsuario(
    idResposta INT PRIMARY KEY AUTO_INCREMENT,
    fkPergunta INT,
    fkAlternativa INT,
    fkUsuario INT,
     fkTentativa INT,
 FOREIGN KEY (fkTentativa)REFERENCES tentativas(idTentativa),
FOREIGN KEY (fkPergunta) REFERENCES pergunta(idPergunta),

    FOREIGN KEY (fkAlternativa) REFERENCES alternativaPergunta(idAlternativaPergunta),

    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
   
);


INSERT INTO pergunta (enunciado)	
VALUES ('Quem é o personagem principal?'),
('Qual é o tema principal do livro?'),
('Em que cidade a história de Noites Brancas se passa?'),
('Como o protagonista é descrito?'),
('O que acontece no final da história?');


SELECT*FROM pergunta;
SELECT *FROM alternativaPergunta;


INSERT INTO alternativaPergunta (fkPergunta, descricao, alternativaCerta)
VALUES
(1, 'Machado de assis ', 0),
(1, 'Fiódor Dostoiévski', 1),
(1, 'Jose de alencar', 0),
(1, 'Liev Tolstói', 0),

(2, '  A vida no campo', 0),
(2, 'Uma história de amor e solidão', 1),
(2, ' Aventuras de guerra', 0),
(2, '  Investigação policial', 0),


(3, 'Moscou ', 0),
(3, 'São Petersburgo', 1),
(3, ' Paris ', 0),
(3, ' Londres ', 0),

(4, 'Um jovem sonhador e solitário', 1),
(4, ' Um soldado experiente', 0),
(4, ' Um comerciante rico', 0),
(4, 'Um médico famoso', 0),


(5, 'O protagonista se casa com a amada', 0),
(5, ' São Ele encontra sua felicidade imediata', 0),
(5, 'A relação amorosa não se concretiza como ele esperava', 1),
(5, 'Ele viaja para outro país', 0);






SELECT * FROM respostaUsuario;



SELECT * FROM respostaUsuario;

SELECT*FROM pergunta;
Select*from alternativaPergunta;

TRUNCATE alternativaPergunta;

SELECT* FROM respostausuario;
SELECT*FROM tentativas;
SELECT *FROM usuario;



SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE respostaUsuario;
TRUNCATE alternativaPergunta;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO usuario (nomeUsuario, email, senha, tipoUsuario)
VALUES ('Cherry', 'diva123@gmail.com', 'Che_1505', 'admin');


TRUNCATE usuario;

SELECT 
    u.nomeUsuario,
    p.enunciado,
    a.descricao,
    a.alternativaCerta
FROM respostaUsuario r
JOIN usuario u ON r.fkUsuario = u.idUsuario
JOIN pergunta p ON r.fkPergunta = p.idPergunta
JOIN alternativaPergunta a ON r.fkAlternativa = a.idAlternativaPergunta;
