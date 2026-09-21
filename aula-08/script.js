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
