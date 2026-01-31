import db from "./db.js"

db.exec(`
  CREATE TABLE IF NOT EXISTS tarefas(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL)
`)

