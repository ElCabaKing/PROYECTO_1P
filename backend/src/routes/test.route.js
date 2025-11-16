/* Carpeta Routes
    IMPORTANTE: Router es lo que nos permite usar las rutas por ende siempre va
    llamado por: Nuestro frontend
    llama: Controller
    Esto simplemente es donde llevara nuestro URL la estructura es asi junto con su
    metodo http y la funcion que se quiere ejecutar
*/

import { Router } from "express";
import TestController from '../controller/test.controller.js';
const router = Router();

router.get('/test',TestController.testCon);
router.post('/test',TestController.testInser);
router.put('/test',TestController.testUpdate);
router.delete('/test',TestController.testDelete);

export default router;