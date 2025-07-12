import { Link } from 'react-router-dom';


function Menu() {
  const links = [
    { label: 'Pães Artesanais e Especiais', href: '/Paes' },
    { label: 'Salgados Assados e Fritos', href: '/Salgados' },
    { label: 'Doce Confeitaria', href: '/Doces' },
    { label: 'Bebidas e Cafeteria', href: '/Bebidas' },
    { label: 'Produtos de Mercearia da Padaria', href: '/Produtos' },
  ];

  return (
    <section id="cardapio" className="menu section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Cardápio</h2>
        <p><span>Cheque o</span> <span className="description-title">Cardápio</span></p>
      </div>

      <div className="container d-flex justify-content-center">
        <ul className="menu-links" data-aos="fade-up" data-aos-delay="100">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.href} className="menu-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Menu;
