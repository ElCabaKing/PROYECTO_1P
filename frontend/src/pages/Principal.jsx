/*Carpeta Pages
    llamado por: App.js
    llama: hooks y a components
    Aqui es donde ocurre la magia, aqui se renderizara OJO RENDERIZARA nada mas
    las cosas que queremos mostrar en nuestro front a lo mucho control de variables
    para enviar a las funciones verdaderas,
    Si llegaste hasta aqui no hare el de style pero se entiende para que sirves solo css
*/

import { useState } from "react";
import Bton from "../components/Bton";
import usePrincipal from "../hooks/usePrincipal"
function Principal() {
    const { list, addList, hkInsertList, hkDeleteList, hkEditList } = usePrincipal();
    const [showModal, setShowModal] = useState(false);
    const [nombre, setNombre] = useState('');
    const [edit, setEdit] = useState({ id: "", nombre: "" });
    const [showModalEdit, setShowModalEdit] = useState(false);
    return (
        <div>
            <button onClick={() => setShowModal(true)}>+</button>
            {list.map((item) => (
                <div key={item.id}>
                    <h1>{item.nombre}</h1>
                    <button onClick={() => hkDeleteList(item.id)}>-</button>
                    <button onClick={() => { setShowModalEdit(true); setEdit(item) }}>edit</button>
                </div>))}
            <Bton addList={addList} />
            {showModal && (<div>
                <input value={nombre} onChange={(input) => setNombre(input.target.value)}></input>
                <button onClick={() => { hkInsertList(nombre); setShowModal(false) }}>grabar</button>
            </div>)}
            {showModalEdit && (
                <div>
                    <input
                        value={edit.nombre}
                        onChange={(e) =>
                            setEdit({ ...edit, nombre: e.target.value })
                        }
                    />
                    <button
                        onClick={() => {
                            hkEditList(edit);
                            setShowModalEdit(false);
                        }}
                    >
                        grabar
                    </button>
                </div>
            )}

        </div>
    )
}
export default Principal; 