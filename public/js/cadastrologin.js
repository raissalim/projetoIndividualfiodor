function cadastro(nome, email, senha, confirmarsenha) {

    let regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    let regexNome = /^[A-Za-zÀ-ÿ\s]+$/;
    let posArroba = email.indexOf("@");
    let posCom = email.indexOf(".com");
    let erros = [];

    // campoos nulos 
    if (nome === "" || email === "" || senha === "" || confirmarsenha === "") {
        erros.push("por favor preencha todos os campos ");

    }

    if (!regexNome.test(nome)) {
        erros.push("Nome inválido (apenas letras)");
    }

    if (!regexSenha.test(senha)) {
        erros.push("Senha deve ter 8 caracteres com maiúscula, minúscula, número e especial");
    }

    if (confirmarsenha !== senha) {
        erros.push("As senhas não coincidem");
    }

    if (posArroba === -1 || posCom === -1 || posArroba > posCom) {
    erros.push("Email inválido");
   
}


    if (erros.length > 0) {
        alert(erros.join("\n"));
        return false;
    }

     fetch("http://localhost:3333/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

            body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha
        })
    })
    .then(function (resposta) {

    if (resposta.ok) {

        alert("Cadastro realizado com sucesso!");

        setTimeout(() => {
            window.location = "login.html";
        }, 3000);

    } else {
        return resposta.text().then(texto => {
            console.log(texto);
            alert("Erro ao cadastrar");
        });
    }
})
.catch(function (erro) {
    console.log(erro);
    alert("Erro de conexão com servidor");
});
return false;
}

function Login(email, senha) {


    fetch("http://localhost:3333/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email,
            senhaServer: senha
        })
    })
    .then(function (resposta) {
        if (resposta.ok) {
            return resposta.json();
        } else {
            throw new Error("Login inválido");
        }
    })
    .then(json => {

        sessionStorage.EMAIL_USUARIO = json.email;
        sessionStorage.NOME_USUARIO = json.nome;
        sessionStorage.ID_USUARIO = json.id;
        sessionStorage.TIPO_USUARIO = json.tipoUsuario;

        console.log(json);

    if (json.tipoUsuario === "admin") {
                window.location = "dashboard.html";
            } else {
                window.location = "quiz.html";
            }

          
    })
    .catch(err => {
        alert("Email ou senha inválidos");
        console.log(err);
    });

  
}
