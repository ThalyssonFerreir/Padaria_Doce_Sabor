import Login from './pages/Login';
import Register from './pages/Register';
import Cadvendedor from './pages/Cadvendedor';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./assets/css/main.css";

// Componentes Principais
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";

// Seções da Página Inicial
import Inicio from "./componentes/Inicio";
import Historia from "./componentes/Historia";
import Menu from "./componentes/Menu";
import Testimonials from "./componentes/Testimonials";
import Kits from "./componentes/Kits";
import Chefs from "./componentes/Chefs";
import Gallery from "./componentes/Gallery";
import TrabalheConosco from "./componentes/TrabalheConosco";

// Páginas Separadas
import Paes from './pages/Paes';
import Salgados from './pages/Salgados';
import Doces from './pages/Doces';
import Bebidas from './pages/Bebidas';
import Produtos from './pages/Produtos';
import Carrinho from './pages/Carrinho';
import PerfilVendedor from './pages/PerfilVendedor';

const HomePage = () => (
    <>
        <Inicio />
        <Historia />
        <Menu />
        <Testimonials />
        <Kits />
        <Chefs />
        <Gallery />
        <TrabalheConosco />
    </>
);

function AppContent() {
    const location = useLocation();
    const isDashboardPage = location.pathname.startsWith('/perfil-vendedor');

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        if (isDashboardPage) {
            document.body.classList.add('dashboard-active');
        } else {
            document.body.classList.remove('dashboard-active');
        }
        return () => {
            document.body.classList.remove('dashboard-active');
        };
    }, [isDashboardPage]);

    return (
        <>
            <Routes>
                {/* Páginas de autenticação (sem Header/Footer) */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cadvendedor" element={<Cadvendedor />} />

                {/* Rota do Painel (sem Header/Footer) */}
                <Route path="/perfil-vendedor" element={<PerfilVendedor />} />

                {/* Páginas normais da loja (com Header/Footer) */}
                <Route
                    path="/*"
                    element={
                        <>
                            <Header />
                            <Routes>
                                <Route path="/homepage" element={<HomePage />} />
                                <Route path="/paes" element={<Paes />} />
                                <Route path="/salgados" element={<Salgados />} />
                                <Route path="/doces" element={<Doces />} />
                                <Route path="/bebidas" element={<Bebidas />} />
                                <Route path="/carrinho" element={<Carrinho />} />
                                <Route path="/produtos" element={<Produtos />} />
                            </Routes>
                            <Footer />
                        </>
                    }
                />
            </Routes>
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;