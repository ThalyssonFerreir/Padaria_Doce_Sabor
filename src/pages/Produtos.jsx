import React from 'react';
import '../assets/css/main.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate

function Produtos() {
  const navigate = useNavigate(); // Hook para navegação
  const { addToCart } = useCart();

  // MODELO DE DADOS: Seus colegas podem substituir pelos produtos de mercearia
  const produtosMercearia = [
    { id: 401, nome: "Geleia Artesanal de Morango", valor: "15,50", descricao: "Feita com morangos frescos e um toque de baunilha.", imagem: "/assets/img/imgsPadaria/pao1.png" }, // Imagem modelo
    { id: 402, nome: "Café Especial em Grãos 250g", valor: "25,80", descricao: "Grãos selecionados da Chapada Diamantina.", imagem: "/assets/img/imgsPadaria/pao2.png" }, // Imagem modelo
    { id: 403, nome: "Manteiga com Sal", valor: "12,00", descricao: "Cremosa e perfeita para acompanhar nossos pães.", imagem: "/assets/img/imgsPadaria/pao3.png" }, // Imagem modelo
  ];
  // FIM DO MODELO

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

  // Componente do Card de produto (não precisa ser alterado)
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
        Nossos Produtos de Mercearia
      </h1>

      {/* Botão "Voltar ao Cardápio" com o estilo correto */}
      <button onClick={handleGoToMenu} className="back-to-menu-btn">
        &larr; Voltar ao Cardápio
      </button>

      {/* Container que exibe os produtos */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {produtosMercearia.map((produto) => (
          <ProductCard
            key={produto.id}
            produto={produto}
          />
        ))}
      </div>
    </div>
  );
}

export default Produtos;