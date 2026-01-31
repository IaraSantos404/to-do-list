import { Router } from "express";
import { tarefasControllers } from "../controllers/tarefas/index.js";

const router = Router();

router.get("/tarefas", tarefasControllers.getAllTasks);

router.get("/tarefas/:id", tarefasControllers.getTaskById);

router.post("/tarefas", tarefasControllers.createTask);

router.put("/tarefas/:id", tarefasControllers.updateTask);

router.delete("/tarefas/:id", tarefasControllers.deleteTask);



export default router;