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

// Criamos um componente interno para poder usar o hook 'useLocation'
function AppContent() {
  const location = useLocation();
  // Verifica se a URL atual começa com /perfil-vendedor
  // const isDashboardPage = location.pathname.startsWith('/perfil-vendedor');

  // Efeito para a biblioteca de animação AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Efeito para adicionar uma classe ao body na página do dashboard
  // useEffect(() => {
  //   if (isDashboardPage) {
  //     document.body.classList.add('dashboard-active');
  //   } else {
  //     document.body.classList.remove('dashboard-active');
  //   }
  //   // Limpa a classe quando o componente é desmontado
  //   return () => {
  //     document.body.classList.remove('dashboard-active');
  //   };
  // }, [isDashboardPage]);

  return (
    <>
      <Routes>
        {/* Páginas de autenticação */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cadvendedor" element={<Cadvendedor />} />

        {/* Páginas normais (com header/footer) */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/paes" element={<><Paes /></>} />
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

        {/* ROTA DO PAINEL */}
        <Route path="/perfil-vendedor" element={<PerfilVendedor />} />
      </Routes>
    </>
  );
}


// O componente App principal agora só envolve o AppContent com o Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;