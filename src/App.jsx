import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Produtos from './pages/Produtos'; // A página que queremos rotear
import Carrinho from './pages/Carrinho';

const HomePage = () => (
  <>
    <Inicio />
    <Historia />
    <Menu />
    {/* O componente <Produtos /> foi REMOVIDO daqui */}
    <Testimonials />
    <Kits />
    <Chefs />
    <Gallery />
    <TrabalheConosco />
  </>
);

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* ROTAS PARA AS PÁGINAS SEPARADAS */}
          <Route path="/paes" element={<Paes />} />
          <Route path="/salgados" element={<Salgados />} />
          <Route path="/doces" element={<Doces />} />
          <Route path="/bebidas" element={<Bebidas />} />
          <Route path="/carrinho" element={<Carrinho />} />

          {/* ROTA ADICIONADA: A rota para a página de produtos */}
          <Route path="/produtos" element={<Produtos />} />

        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;