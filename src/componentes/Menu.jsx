import { Link } from 'react-router-dom';

function Menu() {
  const menuItems = [
    {
      category: "Pães Artesanais",
      link: "/paes",
      description: "Uma seleção de pães feitos com fermentação natural e os melhores ingredientes.",
      img: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      category: "Doces e Sobremesas",
      link: "/doces",
      description: "Delícias que adoçam o dia, desde bolos caseiros até doces finos.",
      img: "https://images.pexels.com/photos/2144200/pexels-photo-2144200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      category: "Salgados",
      link: "/salgados",
      description: "Opções perfeitas para um lanche rápido ou para sua festa.",
      img: "https://cdn0.tudoreceitas.com/pt/posts/0/2/9/salgado_diplomata_o_salgado_de_padaria_original_10920_orig.jpg"
    },
    {
      category: "Bebidas",
      link: "/bebidas",
      description: "Cafés especiais, sucos naturais e outras bebidas para acompanhar.",
      img: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      category: "Mercearia da Padaria",
      link: "/produtos",
      description: "Leve para casa nossas geleias, cafés e outros produtos artesanais.",
      img: "https://promarket.ind.br/wp-content/uploads/2023/08/Capa-Comper-loja-102-76.jpg"
    }
  ];

  return (
    <section id="cardapio" className="menu section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Nosso Cardápio</h2>
        <p><span>Confira nosso</span> <span>Cardápio Saboroso</span></p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {menuItems.map((item, index) => (
            <div className="col-lg-4 col-md-6" key={index} data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
              <div className="menu-item-card">
                <div className="card-img-wrapper">
                  <img src={item.img} className="card-img-top" alt={item.category} />
                </div>
                <div className="card-body">
                  <div>
                    <Link to={item.link} className="card-title-link">
                      <h5 className="card-title">{item.category}</h5>
                    </Link>
                    <p className="card-text">{item.description}</p>
                  </div>
                  <div className="mt-auto">
                    <Link to={item.link} className="btn-menu">Ver Produtos</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Menu;