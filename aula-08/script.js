//const nome = localStorage.getItem("nome");

//alert(nome);

//localStorage.setItem("nome", "fernandinho")

//alert(localStorage.getItem("nome"))

//localStorage.removeItem("nome")


function login() {

    const campo_usuario = document.getElementById("usuario").value;
    const campo_senha = document.getElementById("senha").value

    const local_usuario = localStorage.getItem("usuario");
    const local_senha = localStorage.getItem("senha");


    if ((campo_usuario == local_usuario) && (campo_senha == local_senha)) {
        alert("usuario logado");
    } else {
        alert("usuario incorreto");
    }
}

function cadastro(){

const usuario_novo = document.getElementById("usuario_novo").value
const senha_nova = document.getElementById("senha_nova").value
const confirmar_senha = document.getElementById("confirmar_senha").value
const palavra_passe = document.getElementById("palavra_passe").value

if(senha_nova == confirmar_senha){

    localStorage.setItem("usuario", usuario_novo);
    localStorage.setItem("senha", senha_nova);
    localStorage.setItem("palavra_passe", palavra_passe);

    alert("usuario cadastrado");

    window.location.href = "index.html"

}else{

    alert("senha não corresponde");
    
}

}

function recuperar_senha() {
    // 1º Carregar os elementos e seus valores do campo USUARIO e PALAVRA PASSE
    const campo_usuario = document.getElementById("usuario").value;
    const campo_palavra_passe = document.getElementById("palavra_passe").value;
    const nova_senha = document.getElementById("nova_senha").value

    // 2º Buscar no localStorage
    const local_usuario = localStorage.getItem("usuario");
    const local_palavra_passe = localStorage.getItem("palavra_passe");

    // 3º Comparar os valores (Adicionado verificação para garantir que não estão vazios)
    if ((campo_usuario == local_usuario) && (campo_palavra_passe == local_palavra_passe)) {

        alert("redefina sua senha")

        window.location.href = "index4.html"
    } else {
        alert("usuario não encontrado ou palavra passe esta errada")
    }
}

function novaSenha(){
    localStorage.setItem("senha", nova_senha )
}



// são compatíveis com os valores armazenados no localStorage.
//
// Se forem iguais, exibir a senha na tela ou em um alert.
//
// Se forem diferentes, notificar o usuário na tela ou em um alert
// informando que os dados não são compatíveis.
// Além disso, limpar os campos de entrada (inputs).


