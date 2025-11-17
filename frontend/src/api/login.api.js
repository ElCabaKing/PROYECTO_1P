import { api } from "../utils/api";



export async function appstLogin(params) {
    console.log("ap",params)
    const res = await api.post("/login",params);
    console.log(res);
    return res;
}


