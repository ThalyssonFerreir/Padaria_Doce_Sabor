import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleMobileNavToggle = () => {
    document.body.classList.toggle('mobile-nav-active');
  };

  const handleNavigateAndScroll = (sectionId) => {
    navigate('/');
    document.body.classList.remove('mobile-nav-active');
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (sectionId === 'inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container position-relative d-flex align-items-center justify-content-between">

        {/* Logo e Nome do Site */}
        <Link to="/" className="logo d-flex align-items-center" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('inicio'); }}>
          <img className="logoSite" src="/assets/img/imgsPadaria/PadariaLogo.webp" alt="Logo Doce Sabor" />
          <h1 className="sitename">
            Doce <br />Sabor
          </h1>
        </Link>

        {/* Menu de Navegação */}
        <nav id="navmenu" className="navmenu">
          <ul>
            <li><a href="#inicio" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('inicio'); }}>Inicio</a></li>
            <li><a href="#sobre" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('sobre'); }}>Nossa História</a></li>
            <li><a href="#cardapio" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('cardapio'); }}>Cardápio</a></li>
            <li><a href="#kits" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('kits'); }}>Kit Festas</a></li>
            <li><a href="#clientes" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('clientes'); }}>Nossos clientes</a></li>
            <li><a href="#chefs" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('chefs'); }}>Nossos chefs</a></li>
            <li><a href="#produtos" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('produtos'); }}>Nossos produtos</a></li>
            <li><a href="#trabalhe-conosco" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('trabalhe-conosco'); }}>Trabalhe conosco</a></li>
          </ul>
        </nav>

        {/* Carrinho e Menu Mobile Agrupados */}
        <div className="cart-and-toggle d-flex align-items-center">
          <Link to="/carrinho" className="btn-book-a-table">
            <i className="bi bi-cart"></i>
            <span className="cart-text">
              Carrinho<br />({totalItems})
            </span>
          </Link>
          <i
            className="mobile-nav-toggle d-xl-none bi bi-list"
            onClick={handleMobileNavToggle}
          ></i>
        </div>

      </div>
    </header>
  );
}

export default Header;