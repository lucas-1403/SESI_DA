var qtd_calculos = 0;

const campo = document.getElementById("campo");

function digitar(valor) {

     if (qtd_calculos >= 3) {
        
    }else if (valor == 'limpar') {
        campo.value = "";
    } else if (valor == "=") {
        campo.value = eval(campo.value)
    } else {
        campo.value = campo.value + valor;
    }

}