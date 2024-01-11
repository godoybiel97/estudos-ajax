//Função que instancia o objeto XMLHttpRequest e controla os estados das requisições
function requisicao(url) {
    //Faz com que o conteúdo sempre inicie em branco
    document.getElementById("conteudo").innerHTML = ""

    //Incluir o gif de loading
    if(!document.getElementById("loading")) {
        let img = document.createElement("img")
        img.id = "loading"
        img.src = "../img/loading.gif"
        img.className = "rounded mx-auto d-block"

        let loading = document.getElementById("conteudo")
        loading.appendChild(img)
    }
    
    //instanciar o objeto ajax
    let ajax = new XMLHttpRequest()

    //0: request not initialized (requisição não iniciada)
    //1: server connection established (conexão estabelecida com servidor)
    //2: request received (requisição recebida)
    //3: processing request (processando requisição)
    //4: request finished and response is ready (requisição finalizada)
    
    console.log(ajax.readyState)

    //Tipo de requisição e a URL
    ajax.open("GET", url)

    console.log(ajax.readyState)

    //Observa a mudança de estado até a requisição ser concluída
    ajax.onreadystatechange = () => {
        //Condição requer estado e status
        if(ajax.readyState == 4 && ajax.status == 200) {
            //Se corresponder, a resposta será de sucesso
            document.getElementById("conteudo").innerHTML = ajax.responseText
            console.log("Requisição finalizada com sucesso !")

            //Remove o gif assim que a requisição finalizar
            //document.getElementById("loading").remove()
        }

        //Condição requer estado e status
        if(ajax.readyState == 4 && ajax.status == 404) {
            //Se não corresponder, a resposta será de erro
            document.getElementById("conteudo").innerHTML = "Essa requisição não foi encontrada !"
            console.log("Requisição não encontrada !")

            //Remove o gif assim que a requisição finalizar
            //document.getElementById("loading").remove()
        }
    }

    ajax.send()
}
