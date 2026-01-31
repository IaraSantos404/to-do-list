import db from "./db.js";

//run em insert, delete e update
//get e all em select

//insert
export function createTarefa(nome, descricao){
  const stmt = db.prepare("INSERT INTO tarefas (nome, descricao) VALUES (?, ?)").run(nome, descricao);
  // console.log(stmt);
  // console.log("tarefa criada com sucesso, id:", stmt.lastInsertRowid);
  return stmt;
}
//delete
export function deleteTarefa(id){
  const stmt = db.prepare("DELETE FROM tarefas WHERE id = ?").run(id);
  
  return stmt;
}
//update
export function updateTarefa(id, nome, descricao){
  const stmt = db.prepare("UPDATE tarefas SET nome = ?, descricao = ? WHERE id = ?").run(nome, descricao, id);
  return stmt;
}
//select one by id
export function getTarefaById(id){
  const stmt= db.prepare("SELECT * FROM tarefas WHERE id = ?").get(id);
  
  return stmt;
}

//select all
export function getAllTarefas(){
  const stmt = db.prepare("SELECT * FROM tarefas").all();
  return stmt;
}


// console.log(getTarefaById(1));
