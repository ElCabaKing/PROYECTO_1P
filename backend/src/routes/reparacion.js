/* Carpeta Routes
    IMPORTANTE: Router es lo que nos permite usar las rutas por ende siempre va
    llamado por: Nuestro frontend
    llama: Controller
    Esto simplemente es donde llevara nuestro URL la estructura es asi junto con su
    metodo http y la funcion que se quiere ejecutar
*/

import { Router } from "express";
import ReparacionController from '../controller/reparacion.js';
const router = Router();

router.get ('/reparacion/:id', ReparacionController.estado);     // Cliente y Administrador
router.post('/reparacion/:id', ReparacionController.crear);      // Solo Administrador
router.put ('/reparacion/:id', ReparacionController.actualizar); // Solo Administrador

router.get('/reparaciones', ReparacionController.listar); // Solo Administrador

export default router;
