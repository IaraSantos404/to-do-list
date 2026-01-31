import * as z from 'zod';

//em projetos maiores isso poderia ficar dentro da pasta midelwares ou schemas
export const tarefaSchemaCreate = z.object({
  nome: z.string().min(3,  "Nome deve ter no mínimo 3 caracteres"),
  descricao: z.string().min(5, "Descrição deve ter no mínimo 5 caracteres"),
});

//vem o id de parametro e o body pode ser parcial
export const updateTarefaParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

//é o mesmo do create, mas todos os campos são opcionais
export const updateTarefaBodySchema = tarefaSchemaCreate.partial();

//só parametro
export const deleteTarefaSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export const listAllTarefasSchema = z.object({
  //para filtros futuros
  search: z.string().optional(),
})

export const getTaskByIdSchema = z.object({
  id: z.coerce.number().int().positive(),
})