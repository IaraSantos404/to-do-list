import * as tarefasBd from "../database/tarefas.js";
//validação das entradas no banco são aqui no service
//aqui fazemos o try e catch e retorna mensagens de erro ou sucesso pro controller

export function listarTodasTarefas() {
  try {
    const tarefas = tarefasBd.getAllTarefas();
    return { success: true, tarefas: tarefas }
  } catch (e) {
    // console.log("erro ao listar tarefas", e)
    return { success: false, error: e }
  }
}

export function listarTarefaPorId(id) {
  try {
    const tarefa = tarefasBd.getTarefaById(id);
    if (!tarefa) {
      return { success: false, error: "Tarefa não encontrada" };
    }
    return { success: true, tarefa: tarefa }
  } catch (e) {
    return { success: false, error: e }
  }
}

export function criarTarefa(nome, descricao){
  try{
    const resultado = tarefasBd.createTarefa(nome, descricao);
    return {success: true, resultado: resultado};
  } catch(e){
    return {success: false, error: e};
  }
}

export function deletarTarefa(id){
  try{
    const tarefaExiste = tarefasBd.getTarefaById(id);
    if(!tarefaExiste){
      return {sucess: false, error: "Tarefa não encontrada"};
    }
    const resultado = tarefasBd.deleteTarefa(id);
    // if(resultado.changes === 0){
    //   return {sucess: false, error: "Nenhuma tarefa foi deletada"};
    // }
    return {success: true, resultado: resultado};
  }catch(e){
    return {success: false, error: e};
  }
}

export function atualizarTarefa(id, nome, descricao){
  try{
    const tarefaExiste = tarefasBd.getTarefaById(id);
    if(!tarefaExiste){
      return {success: false, error: "Tarefa não encontrada"};
    }
    const resultado = tarefasBd.updateTarefa(id, nome, descricao);
    // if(resultado.changes === 0){
    //   return {sucess: false, error: "Nenhuma tarefa foi atualizada"};
    // }
    return {success: true, resultado: resultado};
  } catch(e){
    return {success: false, error: e};
  }
}