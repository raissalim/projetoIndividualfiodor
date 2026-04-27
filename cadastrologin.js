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

   let usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    if (usuarioSalvo && usuarioSalvo.email === email) {
        erros.push("Esse email já está cadastrado");
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

    let usuario = { nome, email, senha };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert("Cadastro realizado com sucesso!");
    return true;
}
let tentativas = 3;

function Login(email, senha) {

    let usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioSalvo) {
        alert("Nenhum usuário cadastrado");
        return;
    }

    if (!email || !senha) {
        alert("Preencha todos os campos");
        return;
    }

    if (email === usuarioSalvo.email && senha === usuarioSalvo.senha) {
       
        tentativas = 3;
         window.location.href = "./index.html"
        return true;
    }

 

    tentativas--;

    if (tentativas > 0) {
        alert("Email ou senha incorretos. Restam " + tentativas + " tentativas");
    } else {
        alert("Conta bloqueada!");
    }

    return false;
}