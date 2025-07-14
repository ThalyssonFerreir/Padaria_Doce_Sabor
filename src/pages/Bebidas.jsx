import React from 'react';
import '../assets/css/main.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate

function Bebidas() {
  const navigate = useNavigate(); // Hook para navegação
  const { addToCart } = useCart();

  // Dados das bebidas (usando pães como modelo)
  const bebidas = [
    { id: 301, nome: "Bebida Modelo 1", valor: "5,00", descricao: "Descrição da bebida modelo 1...", imagem: "/assets/img/imgsPadaria/pao1.png" },
    { id: 302, nome: "Bebida Modelo 2", valor: "5,80", descricao: "Descrição da bebida modelo 2...", imagem: "/assets/img/imgsPadaria/pao2.png" },
  ];

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
        Nossas Bebidas
      </h1>

      {/* BOTÃO ATUALIZADO com a nova classe de estilo */}
      <button onClick={handleGoToMenu} className="back-to-menu-btn">
        &larr; Voltar ao Cardápio
      </button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {bebidas.map((bebida) => (
          <ProductCard
            key={bebida.id}
            produto={bebida}
          />
        ))}
      </div>
    </div>
  );
}

export default Bebidas;