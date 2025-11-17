import { useNavigate } from "react-router-dom"
function Home(){
    const navigate = useNavigate();

    return(
        <div>
            <p>Tienes un producto con nosotros?</p>
            <p>Ingresa su codigo aqui</p>
            <input></input>
            <button>Buscar</button>
            <p>Eres un empleado ingresa aqui</p>
            <button onClick={() => navigate('/login') }>Ir al login</button>
        </div>
    )
}

export default Home;