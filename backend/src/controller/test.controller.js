/*Carpeta Controller
  llamado por: routes
  llama: model
  controller llama a la funcion en model y capta los errores que puede surgir
  al usarse
  Ojo y recomendacion: usen un codigo de error 5xx para lo que necesiten no es 
  obligatorio usar el 500 pero generalment la estructura es asi:
*/

import testModel from '../model/test.model.js'

export const testCon = async (req,res) => {
  console.log('llego')
    try {
    const data = await testModel.testCon();
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: "Error al obtener los datos", error: error.message });
  }
}

export const testInser = async(req,res) => {
  console.log('llego2')
  try{
    const data= await testModel.testInser(req.body)
    res.json({result: true})
  }
  catch(error){
    res.status(501).json({ message: "Error al insertar dato", error: error.message});
  }
}

export const testDelete= async(req,res) => {
  console.log('llego3')
  try{
    await testModel.testDelete(req.body)
    res.json({result: true})
  }
  catch(error){
    res.status(502).json({ message: "Error al eliminar dato", error: error.message});
  }
}

export const testUpdate = async(req,res) => {
  console.log('llego4',req.body)
  try{
    await testModel.testUpdate(req.body)
    res.json({result: true})
  }
  catch(error){
    res.status(503).json({ message: "Error al actualizar dato", error: error.message});
  }
}
export default {
    testCon,
    testInser,
    testDelete,
    testUpdate
}