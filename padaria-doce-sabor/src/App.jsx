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



function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

     const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.style.display = "none";
    }

  return (
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
    </main>
  );
}

export default App;
