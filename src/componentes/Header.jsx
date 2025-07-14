import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { cartItems } = useCart();
  const navigate = useNavigate(); // Hook para navegação programática
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  

  // Função definitiva para navegar para a home e rolar para a seção
  const handleNavigateAndScroll = (sectionId) => {
    // Primeiro, navega para a página inicial
    navigate('/');

    // Dá um tempo mínimo para a página inicial renderizar antes de tentar rolar
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Rola suavemente até o elemento
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (sectionId === 'inicio') {
        // Caso especial para o topo da página
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container position-relative d-flex align-items-center justify-content-between">
        <a href="#inicio" className="logo d-flex align-items-center me-auto me-xl-0">
          <h1 className="sitename"><img class="logoSite" src="/assets/img/imgsPadaria/PadariaLogo.webp"></img></h1>
        </a>

        {/* O logo agora também usa a função de scroll para garantir que vá para o topo */}
        <a href="/" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('inicio'); }} className="logo d-flex align-items-center me-auto me-xl-0">
          <h1 className="sitename">Doce Sabor</h1>
        </a>

        <nav id="navmenu" className="navmenu">
          <ul>
            {/* Todos os links agora usam a mesma função para garantir consistência */}
            <li><a href="#inicio" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('inicio'); }}>Inicio</a></li>
            <li><a href="#sobre" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('sobre'); }}>Nossa História</a></li>
            <li><a href="#cardapio" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('cardapio'); }}>Cardápio</a></li>
            <li><a href="#kits" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('kits'); }}>Kit Festas</a></li>
            <li><a href="#clientes" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('clientes'); }}>Nossos clientes</a></li>
            <li><a href="#chefs" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('chefs'); }}>Nossos chefs</a></li>

            {/* CORREÇÃO PRINCIPAL: "Nossos Produtos" agora aponta para a seção correta */}
            <li><a href="#produtos" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('produtos'); }}>Nossos produtos</a></li>

            <li><a href="#trabalhe-conosco" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('trabalhe-conosco'); }}>Trabalhe conosco</a></li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        {/* Este Link para o carrinho está correto, pois é uma página diferente */}
        <Link to="/carrinho" className="btn-book-a-table">
          <i className="bi bi-cart"></i> Carrinho ({totalItems})
        </Link>
      </div>
    </header>
  );
}

export default Header;