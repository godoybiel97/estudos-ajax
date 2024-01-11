//Recuperar dados da API
function getDados(cep) {
    let url = `https://viacep.com.br/ws/${cep}/json/`

    let xmlHttp = new XMLHttpRequest()
    xmlHttp.open("GET", url)

    xmlHttp.onreadystatechange = () => {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let jsonText = xmlHttp.responseText
            let jsonObj = JSON.parse(jsonText)

            let endereco = document.getElementById("endereco")
            endereco.value = jsonObj.logradouro

            let cidade = document.getElementById("cidade")
            cidade.value = jsonObj.localidade

            let bairro = document.getElementById("bairro")
            bairro.value = jsonObj.bairro

            let uf = document.getElementById("uf")
            uf.value = jsonObj.uf
        }
    }

    xmlHttp.send()
}