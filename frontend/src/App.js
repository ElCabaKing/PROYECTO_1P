//Aqui haremos las rutas, aqui solo llaman a las pages junto con su URL
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./pages/Principal";
import Login from "./pages/Login/Login";
import Home from "./pages/Home"
import MainMenu from "./pages/MainMenu";
import Input from "./components/Input/Input";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Principal/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/main" element={<MainMenu/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<h1>LOST</h1>}/>
        <Route path="/component" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
