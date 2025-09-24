import Login from './pages/Login';
import Register from './pages/Register';
import Cadvendedor from './pages/Cadvendedor';
import ForgotPassword from "./pages/ForgotPassword";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./assets/css/main.css";

// Importações para as bibliotecas de UI
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

// Componentes Principais
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";

// Seções da Página Inicial
import Inicio from "./componentes/Inicio";
import Historia from "./componentes/Historia";
import Menu from "./componentes/Menu";
import Testimonials from "./componentes/Testimonials";
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
import PerfilCliente from './pages/PerfilCliente';

const HomePage = () => (
    <>
        <Inicio />
        <Historia />
        <Menu />
        <Testimonials />
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
                {/* Páginas que NÃO TÊM Header/Footer (páginas de autenticação e painel) */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cadvendedor" element={<Cadvendedor />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/perfil-vendedor" element={<PerfilVendedor />} />

                {/* Rota "coringa" que aplica o layout com Header/Footer a TODAS as outras páginas */}
                <Route
                    path="/*"
                    element={
                        <>
                            <Header />
                            <main>
                                <Routes>
                                    {/* A rota principal (/) e a /homepage agora mostram a HomePage */}
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/homepage" element={<HomePage />} />
                                    <Route path="/meu-perfil" element={<PerfilCliente />} />

                                    {/* Todas as suas outras páginas da loja */}
                                    <Route path="/paes" element={<Paes />} />
                                    <Route path="/salgados" element={<Salgados />} />
                                    <Route path="/doces" element={<Doces />} />
                                    <Route path="/bebidas" element={<Bebidas />} />
                                    <Route path="/carrinho" element={<Carrinho />} />
                                    <Route path="/produtos" element={<Produtos />} />
                                </Routes>
                            </main>
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
            <ToastContainer /> 
        </Router>
    );
}

export default App;