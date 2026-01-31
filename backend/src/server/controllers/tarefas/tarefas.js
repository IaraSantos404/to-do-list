//nome, descrição
import { tarefasSchemas } from "../../validations/index.js";
import * as tarefasService from "../../services/tarefasService.js"
import * as z from 'zod';


//nesse caso ele recebe o query, pois é lá que vem os filtros
export const getAllTasks = (req, res) => {
  try{
    const filters = tarefasSchemas.listAllTarefasSchema.parse(req.query);
    const result = tarefasService.listarTodasTarefas(filters);
    
    if(!result.success ){
      return res.status(500).send({error: result.error});
    }
    
    return res.status(200).send({tarefas: result.tarefas});

  } catch(e){
    if (e instanceof z.ZodError){
      return res.status(400).send(z.flattenError(e));
    }
    return res.status(500).send({error: "Erro interno do servidor"});

  }
}

export const getTaskById = (req, res) => {
  const id = req.params.id;
  try{
    tarefasSchemas.getTaskByIdSchema.parse({id});
    const result = tarefasService.listarTarefaPorId(id);

    if(!result.success){
      return res.status(500).send({error: result.error});
    }
    return res.status(200).send({tarefa: result.tarefa});
  } catch(e){
    return res.status(400).send(z.flattenError(e));
  }
}

export const createTask = (req, res) => {
  const data = req.body;
  //essa parte de validação poderia ser um middleware em projetos maiores
  try {
    tarefasSchemas.tarefaSchemaCreate.parse(data);
    const result = tarefasService.criarTarefa(data.nome, data.descricao);

    if (!result.success) {
      return res.status(500).send({ error: result.error });
    }
    return res.status(201).send({ message: "Tarefa criada com sucesso" });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).send(z.flattenError(e));
    }
    return res.status(500).send({ error: "Erro interno do servidor" });
  }
}

//no update tem a validação de id e do body
export const updateTask = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try{
    tarefasSchemas.updateTarefaParamsSchema.parse({id});
    tarefasSchemas.updateTarefaBodySchema.parse(data)

    const result = tarefasService.atualizarTarefa(id, data.nome, data.descricao);

    if(!result.success){
      return res.status(500).send({error: result.error});
    }

    return res.status(200).send({ message: "Tarefa atualizada com sucesso" });
  }catch(e){
    if(e instanceof z.ZodError){
      return res.status(400).send(z.flattenError(e));
    }
    return res.status(500).send({ error: "Erro interno do servidor" });
  }
}

//em rotas que trabalham em cima de id vc tem q validar os parametros (params) q são passados na url
export const deleteTask = (req, res) => {
  const id = req.params.id;
  try {
    tarefasSchemas.deleteTarefaSchema.parse({ id });
    const result = tarefasService.deletarTarefa(id);
    if (!result.success) {
      return res.status(500).send({ error: result.error });
    }
    return res.status(200).send({ message: "Tarefa deletada com sucesso" });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).send(z.flattenError(e));
    }
    return res.status(500).send({ error: "Erro interno do servidor" });
  }
}