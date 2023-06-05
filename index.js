const cards = document.querySelector(".produtinhos");



carregarCatalogo();
function carregarCatalogo(){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    let divcard = document.createElement("");
    if(dados == null){
        divcard.innerHTML = "<p>Nenhum item cadsatrado</p>";
        cards.appendChild(divcard);
        return null;
    }

    dados.forEach((elemento, indice) => {
        let divcard = document.createElement("li");
        divcard.setAttribute("class", "card")
        divcard.innerHTML = `<img src="img/${elemento.foto}"> 
        <h4${elemento.nome}</h4>
        <div class="info"><a onclick="editar(${indice})">editar</a>
        <a onclick="excluir(${indice})">excluir</a></div>
        </div>`;
        
        cards.appendChild(divcard);
        
    });
}

function excluir(indice){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    if(dados.length == 1)
    {localStorage.clear("catalogo");}
    else{
    dados.splice(indice,1);
    localStorage.setItem("catalogo", JSON.stringify(dados));
    }
    window.location.reload();
}

function editar(indice){
    var url ="cadastro.html?peditar=true&indice="+ encodeURIComponent(indice);
    window.location.href = url;
}
