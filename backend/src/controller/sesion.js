import sesionModel from '../model/sesion.js'

const acceder = async (req,res) => {
  try {
    const admin = await sesionModel.administrador(req.body);
    req.session.administrador = admin;
    res.redirect('/');
    res.json({result: true});
  }
  catch (error) {
    res.status(501).json({ message: "Error al insertar acceder", error: error.message });
  }
}

