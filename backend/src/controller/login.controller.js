import jwt from 'jsonwebtoken'
import modelLogin from "../model/login.model.js";

export const ctLogin = async (req, res) => {
    console.log(req.body.user_nombre)
    try {
        const user_id_password = await modelLogin.mdLogin(req.body.user_nombre);
        if (!user_id_password) { res.json({ login: false }) }
        if (req.body.user_password === user_id_password.user_password) {
            const payload = { id: user_id_password.id, user_nombre: req.body.user_nombre, isLoged: true }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 3600000,
                path: "/"
            });
            const permisos = await modelLogin.mdUserDateLog(user_id_password.id);
            res.json({ login: true, permisos: permisos });

        }
        else {
            res.json({ login: false })
        }
    }
    catch (error) {
        res.status(505).json({ message: "Error al obtener los datos", error: error.message });
    }
}

export default {
    ctLogin
}