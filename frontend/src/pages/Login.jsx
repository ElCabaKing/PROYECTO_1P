import { useState } from "react"
import useLogin from "../hooks/useLogin";
function Login(){
    const {hkValidateLogin} = useLogin()
    const [user_nombre, setUser_nombre] = useState('');
    const [user_password, setUser_password] = useState('');

    return(
        <div>
            <input value={user_nombre} onChange={(e) => setUser_nombre(e.target.value)}></input>
            <input value={user_password} onChange={(e) => setUser_password(e.target.value)}></input>
            <button onClick={() => hkValidateLogin({user_nombre: user_nombre,user_password:user_password})}>Login</button>
        </div>
    )
}
export default Login;