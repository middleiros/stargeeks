function femaillogado(){
    let dados = JSON.parse(sessionStorage.getItem("logado"));
    if (dados == null){
        window.location.assign("cadastrodeprodutos.html");
    } else{
        emaillogado = dados[0].email;
    }
}