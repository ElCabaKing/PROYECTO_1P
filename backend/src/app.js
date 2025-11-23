//imports
import express from "express";
import cors from 'cors';
//rutas
import testRoute from './routes/test.route.js'
import reparacionRoute from './routes/reparacion.js'

const app = express();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,               
}));

// Registrar rutas

app.use(testRoute);
app.use(reparacionRoute);

export default app;
