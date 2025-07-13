import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./assets/css/main.css";

import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import Inicio from "./componentes/Inicio";
import Historia from "./componentes/Historia";
import Menu from "./componentes/Menu";
import Testimonials from "./componentes/Testimonials";
import Kits from "./componentes/Kits";
import Chefs from "./componentes/Chefs";
import Gallery from "./componentes/Gallery";
import TrabalheConosco from "./componentes/TrabalheConosco";

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
      <Routes>
        <Route
          path="/"
          element={
            <>
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
            </>
          }
        />
        <Route
          path="/paes"
          element={
            <>
              <Paes />
            </>
          }
        />
        <Route
          path="/salgados"
          element={
            <>
              <Salgados />
            </>
          }
        />
        <Route
          path="/doces"
          element={
            <>
              <Doces />
            </>
          }
        />
        <Route
          path="/bebidas"
          element={
            <>
              <Bebidas />
            </>
          }
        />
        <Route
          path="/produtos"
          element={
            <>
              <Produtos />
            </>
          }
        />
      </Routes>
    </Router>


  );
}

export default App;
