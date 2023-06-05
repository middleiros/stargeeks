const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const foto = document.getElementById("foto");
const botaocadastrar = document.querySelector(".btncadastrar");

const url = new URL(window.location.href);
const peditar = url.searchParams.get("peditar");
const pindice = url.searchParams.get("indice");

if (peditar === "true") {
  editar(pindice);
}

botaocadastrar.onclick = async (evento) => {
  if (peditar !== "true" || peditar === null) {
    evento.preventDefault();
    const result = await fenvio();
    if (result) {
      const dados = JSON.parse(localStorage.getItem("catalogo")) || [];
      dados.push({
        nome: nome.value,
        descricao: descricao.value,
        foto: nomeArq
      });
      localStorage.setItem("catalogo", JSON.stringify(dados));
      window.location.assign("catalogo.html");
    } else {
      alert("Houve um erro no envio do arquivo.");
    }
  } else {
    editarenvio(evento);
  }
};

function editar(indice) {
  nome.value = "editar";
  descricao.value = "editar";
  foto.files[0] = null;
  const dados = JSON.parse(localStorage.getItem("catalogo"));
  nome.value = dados[indice].nome;
  descricao.value = dados[indice].descricao;
  fotoa = dados[indice].foto;
}

var fotoa;

function editarenvio(evento) {
  evento.preventDefault();
  if (fotoa !== foto.value && foto.value !== "") {
    fenvio().then((result) => {
      if (result) {
        salvaEdicao(nomeArq);
      }
    });
  } else {
    salvaEdicao(fotoa);
  }
}

function salvaEdicao(pfoto) {
  const dados = JSON.parse(localStorage.getItem("catalogo"));
  dados[pindice].nome = nome.value;
  dados[pindice].descricao = descricao.value;
  dados[pindice].foto = pfoto;
  localStorage.setItem("catalogo", JSON.stringify(dados));
  window.location.assign("catalogo.html");
}

var nomeArq;

async function fenvio() {
  const url = 'http://localhost:3005/upload';
  const arquivo = document.getElementById("foto").files[0];
  const formData = new FormData();
  formData.append('arquivo', arquivo);
  console.log(JSON.stringify(formData.values[0]));
  console.log(JSON.stringify(formData.values[1]));
  try {
    const resp = await fetch(url, {
      method: 'POST',
      body: formData
    });
    console.log(resp);
    if (resp.ok) {
      const respText = await resp.text();
      nomeArq = respText;
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}