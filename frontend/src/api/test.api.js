/* Carpeta API
    llamado por: hooks
    llama: funcion en utiils/api
    Esta parte simiplemente es donde daremos una ruta para la funciion api
    En caso de se un metodo post se debe estipular el body
    asi    
    export async function test(parametro) {
    api.get("/test",{nombre_body: parametro});
        }
*/
import { api } from '../utils/api'

export async function test() {
    const res = await api.get("/test");
    console.log(res)
    return res;
}

export async function insert(params) {
    console.log('l')
    const res = await api.post("/test",{nombre: params});
    console.log(res);
    return res;
}

export async function deleteList(params) {
    console.log(params)
    const res = await api.del('/test',{id: params});
    return res;
}

export async function updateList(params) {
    const res = await api.put('/test',{id:params.id, nombre:params.nombre});
    return res;
}