//Aqui haremos las rutas, aqui solo llaman a las pages junto con su URL
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./pages/Principal";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Principal/>}/>
        <Route path="*" element={<h1>LOST</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
