import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appstLogin } from "../api/login.api";
export default function useLogin() {
    const navigate = useNavigate();
    const [hkmLogin, setHkmLogin] = useState('');
    const [hkbLogin, setHkbLogin] = useState(false)
    async function hkValidateLogin(params) {
        const res = await appstLogin(params);
        if (res.login) {
            localStorage.setItem(
                "menuList",
                btoa(JSON.stringify(res.permisos))
            );
            navigate('/main')
        }
        else{
            setHkmLogin("Usuario o contrasena invalido trata de nuevo")
            setHkbLogin(true)
        }
    }

    return {
        hkValidateLogin,
        hkmLogin,
        hkbLogin
    }
}
