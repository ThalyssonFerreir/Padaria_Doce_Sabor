import { Link } from 'react-router-dom';

function Menu() {
  const links = [
    { label: 'Pães Artesanais e Especiais', href: '/paes' },
    { label: 'Salgados Assados e Fritos', href: '/salgados' },
    { label: 'Doce Confeitaria', href: '/doces' },
    { label: 'Bebidas e Cafeteria', href: '/bebidas' },
    { label: 'Produtos de Mercearia da Padaria', href: '/produtos' },
  ];

  return (
    <section id="cardapio" className="menu section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Cardápio</h2>
        <p><span>Cheque o</span> <span className="description-title">Cardápio</span></p>
      </div>

      <div className="container d-flex justify-content-center">
        <ul className="nav flex-column align-items-center" data-aos="fade-up" data-aos-delay="100">
          {links.map((link, index) => (
            <li key={index} className="nav-item mb-2">
              <Link to={link.href} className="nav-link" style={{ fontSize: '1.2rem' }}>
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
