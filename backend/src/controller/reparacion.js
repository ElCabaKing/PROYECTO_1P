import reparacionModel from '../model/reparacion.js'

const es_admin = (req,res) => { return req.session.administrador == true; }

const estado = async (req,res) => {
  console.log('Estado de la reparacion No.' + req.body.id);
  try {
    const data = await reparacionModel.estado(req.body);
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: "Error al obtener los datos", error: error.message });
  }
}

const crear = async(req,res) => {
  if (!es_admin(req,res)) { res.redirect('/');return; }
  console.log('Crear pedido de raparacion')
  if (!es_admin(req)) 
  try {
    const data = await reparacionModel.crear(req.body)
    res.json({result: true})
  }
  catch(error){
    res.status(501).json({ message: "Error al insertar dato", error: error.message });
  }
}

const actualizar = async(req,res) => {
  if (!es_admin(req,res)) { res.redirect('/');return; }
  console.log('Modificado estado de la reparacion')
  try {
    const data = await reparacionModel.actualizar(req.body)
    res.json({result: true})
  }
  catch(error){
    res.status(503).json({ message: "Error al actualzar dato", error: error.message });
  }
}

const listar = async(req,res) => {
  if (!es_admin(req,res)) { res.redirect('/');return; }
  console.log('Listar reparaciones')
  try {
    const data = await reparacionModel.listar()
    res.json({result: true})
  }
  catch(error){
    res.status(503).json({ message: "Error al obtener los datos", error: error.message });
  }
}

export default {
    estado,
    crear,
    actualizar,
    listar
};
