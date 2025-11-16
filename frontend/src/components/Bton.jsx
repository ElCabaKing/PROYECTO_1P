/* Carpeta Components
    Llamado por: Pages
    llama: NADIE:
    En esta parte esta los componentes que se planean reutilizar
    puededn recbr parametros pero si es algun componente que interactue con algo
    en su componente padre este debe enviarlo como en el ejemplo
*/
function Bton({addList}){
    const ingresar = () => {
        addList(2)
    }
    return(
        <button onClick={ingresar}>Jj</button>
    )
}
export default Bton;