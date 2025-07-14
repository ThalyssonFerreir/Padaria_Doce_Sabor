import React from 'react';
import '../assets/css/main.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate

function Paes() {
  const navigate = useNavigate(); // Hook para navegação
  const { addToCart } = useCart();

  // Dados dos pães (você pode manter ou alterar)
  const paes = [
    { id: 1, nome: "Pão de fermentação natural", valor: "5,00", descricao: "Crosta crocante e miolo macio...", imagem: "/assets/img/imgsPadaria/pao1.png" },
    { id: 2, nome: "Pão Australiano", valor: "5,80", descricao: "Pão escuro, macio e levemente adocicado...", imagem: "/assets/img/imgsPadaria/pao2.png" },
    { id: 3, nome: "Pão Italiano", valor: "5,50", descricao: "Massa firme e crosta grossa...", imagem: "/assets/img/imgsPadaria/pao3.png" },
  ];

  // Função que navega para a home e rola até a seção #cardapio
  const handleGoToMenu = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('cardapio');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const ProductCard = ({ produto }) => (
    <div className="product-card">
      <img src={produto.imagem} alt={produto.nome} />
      <div className="product-card-content">
        <h2 className="product-card-title">{produto.nome}</h2>
        <p className="product-card-price">R$ {produto.valor}</p>
        <p className="product-card-description">{produto.descricao}</p>
      </div>
      <div className="product-card-button-wrapper">
        <button className="product-card-button" onClick={() => addToCart(produto)}>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "40px", textAlign: 'center' }}>
      <h1 style={{ color: "#d2691e" }}>
        Nossos Pães
      </h1>

      {/* BOTÃO ATUALIZADO com a nova classe de estilo */}
      <button onClick={handleGoToMenu} className="back-to-menu-btn">
        &larr; Voltar ao Cardápio
      </button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {paes.map((pao) => (
          <ProductCard
            key={pao.id}
            produto={pao}
          />
        ))}
      </div>
    </div>
  );
}

export default Paes;