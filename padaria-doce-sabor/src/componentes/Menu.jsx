import { useState } from 'react';

function Menu() {
  const [activeTab, setActiveTab] = useState('pães');

  const tabs = [
    { id: 'pães', label: 'Pães' },
    { id: 'doces', label: 'Doces' },
    { id: 'salgados', label: 'Salgados' },
    { id: 'bolos', label: 'Bolos' },
  ];

  const items = {
    pães: [
      { name: 'Pão Carioca', price: 'R$ 0,50', img: '/assets/img/menu/menu-item-1.png' },
      { name: 'Pão Baguete', price: 'R$ 1,50', img: '/assets/img/menu/menu-item-2.png' },
      { name: 'Pão Doce', price: 'R$ 1,00', img: '/assets/img/menu/menu-item-3.png' },
      { name: 'Pão Centeio', price: 'R$ 6,50', img: '/assets/img/menu/menu-item-4.png' },
      { name: 'Pão Ciabatta', price: 'R$ 4,00', img: '/assets/img/menu/menu-item-5.png' },
      { name: 'Pão Alentejano', price: 'R$ 4,00', img: '/assets/img/menu/menu-item-6.png' },
    ],
    doces: [
      { name: 'Ganache de Café', price: 'R$ 10,99', img: '/assets/img/menu/menu-item3-1.png' },
      { name: 'Tortilha Doce', price: 'R$ 7,50', img: '/assets/img/menu/menu-item3-2.png' },
      { name: 'Pudim', price: 'R$ 6,00', img: '/assets/img/menu/menu-item3-3.png' },
      { name: 'Antonella', price: 'R$ 7,00', img: '/assets/img/menu/menu-item3-4.png' },
      { name: 'Tortilha de Canela', price: 'R$ 10,00', img: '/assets/img/menu/menu-item3-5.png' },
      { name: 'Donuts', price: 'R$ 12,00', img: '/assets/img/menu/menu-item3-6.png' },
    ],
    salgados: [
      { name: 'Coxinha de Frango', price: 'R$ 8,00', img: '/assets/img/menu/menu-item2-1.png' },
      { name: 'Empada de Frango', price: 'R$ 7,50', img: '/assets/img/menu/menu-item2-2.png' },
      { name: 'Kibe', price: 'R$ 6,00', img: '/assets/img/menu/menu-item2-3.png' },
      { name: 'Croissant', price: 'R$ 8,00', img: '/assets/img/menu/menu-item2-4.png' },
      { name: 'Esfiha Fechada', price: 'R$ 7,50', img: '/assets/img/menu/menu-item2-5.png' },
      { name: 'Salgado misto', price: 'R$ 6,00', img: '/assets/img/menu/menu-item2-6.png' },
    ],
    bolos: [
      { name: 'Bolo de Laranja', price: 'R$ 10,00', img: '/assets/img/menu/menu-item4-1.png' },
      { name: 'Bolo Confeitado', price: 'R$ 23,00', img: '/assets/img/menu/menu-item4-2.png' },
      { name: 'Bolo de mel russo', price: 'R$ 26,00', img: '/assets/img/menu/menu-item4-3.png' },
      { name: 'Bolo de Milho', price: 'R$ 13,00', img: '/assets/img/menu/menu-item4-4.png' },
      { name: 'Bolo de Chocolate', price: 'R$ 13,00', img: '/assets/img/menu/menu-item4-5.png' },
      { name: 'Brownie', price: 'R$ 6,00', img: '/assets/img/menu/menu-item4-6.png' },
    ]
  };

  return (
    <section id="cardapio" className="menu section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Cardápio</h2>
        <p><span>Cheque o</span> <span className="description-title">Cardápio</span></p>
      </div>

      <div className="container">
        <ul className="nav nav-tabs justify-content-center" data-aos="fade-up" data-aos-delay="100">
          {tabs.map(tab => (
            <li className="nav-item" key={tab.id}>
              <button
                className={`nav-link ${activeTab === tab.id ? 'active show' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <h4>{tab.label}</h4>
              </button>
            </li>
          ))}
        </ul>

        <div className="tab-content" data-aos="fade-up" data-aos-delay="200">
          <div className="tab-pane fade show active">
            <div className="row gy-5">
              {items[activeTab].map(item => (
                <div className="col-lg-4 menu-item" key={item.name}>
                  <a href={item.img} className="glightbox">
                    <img src={item.img} className="menu-img img-fluid" alt={item.name} />
                  </a>
                  <h4>{item.name}</h4>
                  <p className="price">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;
