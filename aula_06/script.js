 const campo1 = document.getElementById("campo1");
    const campo2 = document.getElementById("campo2");
    const resultado = document.getElementsByTagName("h1")[0];

    function somadedoisvalores (){

      var soma = Number(campo1.value) + Number(campo2.value);

    // alert("a soma dos dois valores é igual =" + soma)
    resultado.innerHTML = "resultado:" + soma;
    }

    

   