
import { useNavigate } from "react-router-dom";
import { appstLogin } from "../api/login.api";
export default function useLogin(){
    const navigate = useNavigate();
    async function hkValidateLogin(params) {
        const res = await appstLogin(params);
        if(res.login){
            navigate('/main')
        } 
    }

    return{
        hkValidateLogin
    }
}