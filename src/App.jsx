import "aos/dist/aos.css";
import "./assets/css/main.css";
import { useEffect } from "react";
import AOS from "aos";
import Kits from "./componentes/Kits.jsx";
import Chefs from "./componentes/Chefs.jsx";
import Gallery from "./componentes/Gallery.jsx";
import TrabalheConosco from "./componentes/TrabalheConosco.jsx";
import Header from "./componentes/Header.jsx";
import Inicio from "./componentes/Inicio.jsx";
import Historia from "./componentes/Historia.jsx";
import Menu from "./componentes/Menu.jsx";
import Testimonials from "./componentes/Testimonials.jsx";
import Footer from "./componentes/Footer.jsx";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Paes from './pages/Paes';
import Salgados from './pages/Salgados';
import Doces from './pages/Doces';
import Bebidas from './pages/Bebidas';
import Produtos from './pages/Produtos';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.style.display = "none";
    }
  }, []);

  return (
    <Router>
      <main>
        <Header />
        <Inicio />
        <Historia />
        <Menu />
        <Testimonials />
        <Kits />
        <Chefs />
        <Gallery />
        <TrabalheConosco />
        <Footer />

        <Routes>
          <Route path="/Paes" element={<Paes />} />
          <Route path="/Salgados" element={<Salgados />} />
          <Route path="/Doces" element={<Doces />} />
          <Route path="/Bebidas" element={<Bebidas />} />
          <Route path="/Produtos" element={<Produtos />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
