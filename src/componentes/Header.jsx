function Header() {
  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container position-relative d-flex align-items-center justify-content-between">
        <a href="#inicio" className="logo d-flex align-items-center me-auto me-xl-0">
          <h1 className="sitename"><img class="logoSite" src="/assets/img/imgsPadaria/PadariaLogo.png"></img></h1>
        </a>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><a href="#inicio" className="active">Inicio</a></li>
            <li><a href="#sobre">Nossa História</a></li>
            <li><a href="#cardapio">Cardápio</a></li>
            <li><a href="#kits">Kit Festas</a></li>
            <li><a href="#clientes">Nossos clientes</a></li>
            <li><a href="#chefs">Nossos chefs</a></li>
            <li><a href="#produtos">Nossos produtos</a></li>
            <li><a href="#trabalhe-conosco">Trabalhe conosco</a></li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
      </div>
    </header>
  );
}

export default Header;
