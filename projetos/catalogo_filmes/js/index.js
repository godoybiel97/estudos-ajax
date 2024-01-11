//Essa função seleciona os filmes na URL e os envia
function getFilmes() {

    //Instanciar XMLHttpRequest
    let xmlHttp = new XMLHttpRequest()

    //Solicita um método de uma URL de referência
    xmlHttp.open("GET", "http://localhost/Ajax/projetos/catalogo_filmes/filmes.xml")

    //Verifica a mudança de estado e status
    xmlHttp.onreadystatechange = () => {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {

            //Recebe a resposta como texto
            let xmlFilmes = xmlHttp.responseText
            //console.log(xmlFilmes)

            //Instancia o DOMParser
            let parser = new DOMParser()

            //Converte o arquivo XML para texto
            let domFilmes = parser.parseFromString(xmlFilmes, "text/xml")

            //Converte o texto para JSON
            let jsonFilmes = xmlToJson(domFilmes)
            //console.log(jsonFilmes)

            //Percorre os atributos do JSON e utiliza o que é necessário
            //Os elementos serão criados um a um, inserindo as informações necessárias de forma dinâmica
            for(let i in jsonFilmes.filmes.filme) {
                let item = jsonFilmes.filmes.filme[i]

                let divRow = document.createElement("div")
                divRow.className = "row"

                let divCol = document.createElement("div")
                divCol.className = "col"

                let p1 = document.createElement("p")
                p1.innerHTML = `<strong>Título: </strong>${item.titulo["#text"]}`

                let p2 = document.createElement("p")
                p2.innerHTML = `<strong>Resumo: </strong>${item.resumo["#text"]}`

                //Condição para verificar se já existe o atributo 
                let genero = ""
                for(let g in item.genero) {
                    if(genero) {
                        genero += ", "
                    }

                    genero += item.genero[g]["#text"]
                }

                let p3 = document.createElement("p")
                p3.innerHTML = `<strong>Gênero: </strong>${genero}`

                //Condição para verificar se já existe o atributo 
                let elenco = ""
                for(let e in item.elenco.ator) {
                    if(elenco) {
                        elenco += ", "
                    }

                    elenco += item.elenco.ator[e]["#text"]
                }

                let p4 = document.createElement("p")
                p4.innerHTML = `<strong>Elenco: </strong>${elenco}`

                let p5 = document.createElement("p")
                p5.innerHTML = `<strong>Data: </strong>${item.dataLancamento["#text"]} (${item.dataLancamento["@attributes"].pais})`

                let hr = document.createElement("hr")

                //Encapsular cada elemento no outro respeitando a hierarquia
                divRow.appendChild(divCol)
                divCol.appendChild(p1)
                divCol.appendChild(p2)
                divCol.appendChild(p3)
                divCol.appendChild(p4)
                divCol.appendChild(p5)
                divCol.appendChild(hr)

                //Capturar o id lista para inserir as informações necessárias
                let lista = document.getElementById("lista")
                lista.appendChild(divRow)
            }
        }

        if(xmlHttp.readyState == 4 && xmlHttp.status == 404) {

        }
    }

    //Envia a requisição
    xmlHttp.send()
}
