
let tarefas = [];
const button = document.getElementById("new-task");
const inputTitle = document.getElementById("input-title");
const inputD = document.getElementById("input-description");
const taskList = document.querySelector(".task-list");

button.addEventListener('click', (event) => {
  event.preventDefault();
  AdicionarTarefa(inputTitle.value, inputD.value);
});

function extrairMensagensDeErro(erro) {
  const mensagens = [];

  if (erro.formErrors) {
    mensagens.push(...erro.formErrors);
  }

  if (erro.fieldErrors) {
    for (const campo in erro.fieldErrors) {
      mensagens.push(...erro.fieldErrors[campo]);
    }
  }

  return mensagens.join("\n");
}


async function AdicionarTarefa(titulo, descricao) {
  try {
    const resposta = await fetch("http://localhost:3333/tarefas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: titulo,
        descricao: descricao
      })
    });
    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(extrairMensagensDeErro(dados));
      return;
    }

  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
  }

  renderizarTarefas();
}

function renderizarTarefas() {
  fetch("http://localhost:3333/tarefas").then(res => res.json()).then(data => {
    if (!data.tarefas || data.tarefas.length === 0) {
      taskList.innerHTML = "<p class='no-tasks'>Nenhuma tarefa ainda. Crie a primeira!</p>";
      return;
    }
    taskList.innerHTML = "";
    data.tarefas.forEach(tarefa => {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task-item");

      taskItem.innerHTML += `
      <h3>${tarefa.nome}</h3>
      <p>${tarefa.descricao}</p>
      <button class="edit-button" onclick="editarTarefa(${tarefa.id})">Editar</button>
      <button class="delete-button" onclick="deletarTarefa(${tarefa.id})">Deletar</button>
      `;

      taskList.appendChild(taskItem);
    })
  })
}


async function deletarTarefa(id) {
  try {
    const confirmar = confirm("tem certeza que deseja deletar essa tarefa?");
    if (!confirmar) {
      return;
    }
    const resposta = await fetch(`http://localhost:3333/tarefas/${id}`, {
      method: "DELETE"
    });

    if (resposta.ok) {
      alert("Tarefa deletada com sucesso");
      renderizarTarefas();
    }
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
  }

}

async function editarTarefa(id) {
  try {
    const nome = prompt("Digite o novo nome da tarefa:");
    const descricao = prompt("Digite a nova descrição da tarefa:");
    const resposta = await fetch(`http://localhost:3333/tarefas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        nome: nome,
        descricao: descricao
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(extrairMensagensDeErro(dados));
      return;
    }
    alert("Tarefa editada com sucesso");
    renderizarTarefas();
  } catch (error) {
    console.error("Erro ao editar tarefa:", error);
  }
}


renderizarTarefas();
