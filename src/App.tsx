import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Usuarios from "./pages/Usuarios";
import Productos from "./pages/Productos";
import Inventario from "./pages/Inventario";
import Movimientos from "./pages/Movimientos";
import Pedidos from "./pages/Pedidos";
import Proveedores from "./pages/Proveedores";
import AcercaDe from "./pages/AcercaDe";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Roles from "./pages/Roles";
import Empresas from "./pages/Empresas";
import Categorias from "./pages/Categorias";
import { AuthProvider } from "./context/AuthProvider"; // ✅ Importamos el AuthProvider

import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

function App() {
  return (
    <AuthProvider> {/* ✅ Envuelve toda la app en AuthProvider */}
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/movimientos" element={<Movimientos />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/acerca-de" element={<AcercaDe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/categorias" element={<Categorias />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
