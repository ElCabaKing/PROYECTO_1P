/* Carpeta Hooks
    Llama a: api
    Llamado por: pages
    La funcion de esta parte es ser toda, repito TODA la logica de nuestro front
    Este proporcionara funciones y variables para el su posterior renderizado
    en pagess
*/

import { useState } from "react";
import { test, insert, deleteList, updateList} from "../api/test.api";

export default function usePrincipal() {
    const [list, setList] = useState([]);

    async function addList() {
        const newlist = await test()
        setList(newlist)
    };

    async function hkInsertList(params) {
        console.log(params)
        const res = await insert(params);
        if (res.result) {
            addList()
        }
    }
    async function hkDeleteList(params) {
        const res = await deleteList(params);
        console.log(res);
        if(res.result){
            addList()
        }
    }
    async function hkEditList(params) {
        const res = await updateList(params);
        console.log(res);
        if(res.result){
            addList()
        }
    }
    return { 
        list,
        addList, 
        hkInsertList, 
        hkDeleteList,
        hkEditList
     };


}


