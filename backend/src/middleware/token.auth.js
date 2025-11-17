import jwt from "jsonwebtoken";

export const tokenAuth = (req,res,next) => {
    const token = req.cookies.auth_token;
    if(!token){
        return res.status(401).json({message:"No hay o no se envio token"});
    }
    try{
        jwt.verify(token,process.env.Proyecto_parcial1);
        next();
    }
    catch(error){
        return res.status(402).json({message: "El token no es valido"})
    }
}