import React from 'react';
import '../assets/css/main.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate

function Doces() {
  const navigate = useNavigate(); // Hook para navegação
  const { addToCart } = useCart();

  // Dados dos doces
 const doces = [
  {
    id: 1,
    nome: "Brigadeiro Tradicional",
    valor: "12,50", 
    descricao: "O clássico brigadeiro de chocolate, cremoso e coberto com granulado macio.",
    imagem: "/assets/img/imgsPadaria/doces/brigadeiro-tradicional.jpg",
  },
  {
    id: 2,
    nome: "Beijinho de Coco",
    valor: "12,00", 
    descricao: "Doce de coco cremoso e enrolado em coco ralado, finalizado com um cravo.",
    imagem: "/assets/img/imgsPadaria/doces/beijinho-de-coco.png",
  },
  {
    id: 3,
    nome: "Torta de Limão",
    valor: "7,50", 
    descricao: "Fatia de torta com base crocante, recheio de creme de limão e cobertura de marshmallow.",
    imagem: "/assets/img/imgsPadaria/doces/torta-de-limao.png",
  },
  {
    id: 4,
    nome: "Pudim de Leite",
    valor: "6,00", 
    descricao: "Pudim de leite condensado cremoso e lisinho, com uma calda de caramelo perfeita.",
    imagem: "/assets/img/imgsPadaria/doces/pudim-de-leite.jpg",
  },
  {
    id: 5,
    nome: "Sonho de Creme",
    valor: "9,00",
    descricao: "Massa fofinha e frita, recheada com um delicioso creme de baunilha e polvilhada com açúcar.",
    imagem: "/assets/img/imgsPadaria/doces/sonho-de-creme.jpg",
  },
  {
    id: 6,
    nome: "Quindim",
    valor: "15,00", 
    descricao: "Doce intenso de gema de ovo e coco, com uma calda brilhante e textura única.",
    imagem: "/assets/img/imgsPadaria/doces/quindim.webp",
  },
  {
    id: 7,
    nome: "Carolina de Doce de Leite",
    valor: "14,00", 
    descricao: "Pequena bomba de massa choux recheada com doce de leite e coberta com chocolate.",
    imagem: "/assets/img/imgsPadaria/doces/carolina-doce-de-leite.jpg",
  },
  {
    id: 8,
    nome: "Mousse de Maracujá",
    valor: "7,00", 
    descricao: "Creme aerado e azedinho de maracujá, com uma calda da própria fruta por cima.",
    imagem: "/assets/img/imgsPadaria/doces/mousse-maracuja.png",
  },
  {
    id: 9,
    nome: "Bolo de Cenoura com Chocolate",
    valor: "6,50",
    descricao: "Fatia de bolo de cenoura fofinho com uma generosa cobertura de brigadeiro cremoso.",
    imagem: "/assets/img/imgsPadaria/doces/bolo de cenoura.jpg",
  },
  {
    id: 10,
    nome: "Torta Holandesa",
    valor: "8,50",
    descricao: "Fatia de torta com base de biscoito, creme branco e cobertura de ganache de chocolate.",
    imagem: "/assets/img/imgsPadaria/doces/torta-holandesa.webp",
  },
  {
    id: 11,
    nome: "Alfajor de Biscoito",
    valor: "11,00", 
    descricao: "Dois biscoitos macios recheados com doce de leite e banhados em chocolate meio amargo.",
    imagem: "/assets/img/imgsPadaria/doces/alfajor-de-biscoito.jpg",
  },
  {
    id: 12,
    nome: "Cheesecake de Frutas Vermelhas",
    valor: "9,50", 
    descricao: "Fatia de cheesecake cremoso com base de biscoito e uma calda artesanal de frutas vermelhas.",
    imagem: "/assets/img/imgsPadaria/doces/cheesecake-frutas-vermelhas.webp",
  },
  {
    id: 13,
    nome: "Mil-folhas de Creme",
    valor: "10,00",
    descricao: "Massa folhada crocante intercalada com creme de confeiteiro e polvilhada com açúcar.",
    imagem: "/assets/img/imgsPadaria/doces/mil-folhas-creme.jpg",
  },
  {
    id: 14,
    nome: "Palha Italiana",
    valor: "9,00",
    descricao: "Doce cremoso de brigadeiro com pedaços de biscoito maisena, coberto com açúcar.",
    imagem: "/assets/img/imgsPadaria/doces/palha-italiana.png",
  },
  {
    id: 15,
    nome: "Brownie de Chocolate com Nozes",
    valor: "8,00", 
    descricao: "Bolo de chocolate denso e úmido, com uma casquinha crocante e pedaços de nozes.",
    imagem: "/assets/img/imgsPadaria/doces/brownie-chocolate-nozes.webp",
  },
  {
    id: 16,
    nome: "Pastel de Nata",
    valor: "13,00", 
    descricao: "O tradicional doce português, com massa folhada crocante e recheio cremoso de natas.",
    imagem: "/assets/img/imgsPadaria/doces/pastel-de-nata.png",
  },
  {
    id: 17,
    nome: "Rocambole de Doce de Leite",
    valor: "7,00", 
    descricao: "Fatia de uma massa de pão de ló fofinha, enrolada com um recheio generoso de doce de leite.",
    imagem: "/assets/img/imgsPadaria/doces/rocambole-doce-de-leite.png",
  },
  {
    id: 18,
    nome: "Cajuzinho",
    valor: "11,00", 
    descricao: "Docinho de amendoim e leite condensado, enrolado em açúcar e finalizado com um amendoim.",
    imagem: "/assets/img/imgsPadaria/doces/cajuzinho.avif",
  },
  {
    id: 19,
    nome: "Bomba de Chocolate",
    valor: "9,50",
    descricao: "Massa choux comprida e macia, recheada com creme de chocolate e coberta com ganache.",
    imagem: "/assets/img/imgsPadaria/doces/bomba-de-chocolate.jpg",
  },
  {
    id: 20,
    nome: "Cocada Cremosa",
    valor: "7,00", 
    descricao: "Doce de coco fresco cozido com leite condensado até atingir uma textura macia e cremosa.",
    imagem: "/assets/img/imgsPadaria/doces/cocada-cremosa.jpg",
  },
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
        Nossos Doces
      </h1>

      {/* BOTÃO ATUALIZADO com a nova classe de estilo */}
      <button onClick={handleGoToMenu} className="back-to-menu-btn">
        &larr; Voltar ao Cardápio
      </button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {doces.map((doce) => (
          <ProductCard
            key={doce.id}
            produto={doce}
          />
        ))}
      </div>
    </div>
  );
}

export default Doces;