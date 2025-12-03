import { Router } from "express";
import SesionController from '../controller/sesion.js';
const router = Router();

router.post('/acceder', SesionController.acceder);

export default router;
