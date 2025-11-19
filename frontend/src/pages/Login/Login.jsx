import { useState } from "react"
import useLogin from "../../hooks/useLogin";
import logo from "../../media/icon.png"
import "../Login/Login.css"
import Input from "../../components/Input/Input";
function Login() {
    const { hkValidateLogin, hkmLogin, hkbLogin, hkRedirectRecovery } = useLogin()
    const [user_nombre, setUser_nombre] = useState('');
    const [user_password, setUser_password] = useState('');

    return (
        <div className="container">
            <div className="imgContainer">
                <p>Reparacion Carlitos</p>
                <img src={logo}></img>
            </div>
            {hkbLogin && (<p>{hkmLogin}</p>)}
            <Input
                name="user_name"
                type="text"
                value={user_nombre}
                onChange={(e) => setUser_nombre(e.target.value)}
                placeholder="Nombre de Usuario"
            />
            <Input
                name="user_password"
                type="password"
                value={user_password}
                onChange={(e) => setUser_password(e.target.value)}
                placeholder="Contrasena"
            />
            <p className="pDirect" onClick={() => hkRedirectRecovery()}>Has olvidado tu contrasena?</p>
            <button onClick={() => hkValidateLogin({ user_nombre: user_nombre, user_password: user_password })}>Login</button>
        </div>
    )
}
export default Login;