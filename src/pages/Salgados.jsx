import React from 'react';
import '../assets/css/main.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate

function Salgados() {
  const navigate = useNavigate(); // Hook para navegação
  const { addToCart } = useCart();

  // Dados dos salgados
  const salgados = [
  {
    id: 1,
    nome: "Coxinha de Frango com Requeijão",
    valor: "5,00",
    descricao: "Salgado clássico, massa macia e dourada, recheio cremoso de frango com requeijão.",
    imagem: "/assets/img/imgsPadaria/salgad1.png",
  },
  {
    id: 2,
    nome: "Risole de Carne",
    valor: "5,00",
    descricao: "Salgado frito, massa saborosa e crocante, recheado com carne bem temperada.",
    imagem: "/assets/img/imgsPadaria/salgad2.png",
  },
  {
    id: 3,
    nome: "Bolinho de Queijo",
    valor: "2,50",
    descricao: "Pequeno e saboroso, casquinha crocante e recheio cremoso de queijo derretido.",
    imagem: "/assets/img/imgsPadaria/salgad3.png",
  },
  {
    id: 4,
    nome: "Mini Pizza (Calabresa, Queijo)",
    valor: "3,50",
    descricao: "Massa macia, molho saboroso e perfeita para festas.",
    imagem: "/assets/img/imgsPadaria/salgad4.png",
  },
  {
    id: 5,
    nome: "Esfiha Aberta (Carne, Queijo)",
    valor: "6,99",
    descricao: "Massa leve em formato aberto, recheios suculentos, tradicional árabe.",
    imagem: "/assets/img/imgsPadaria/salgad5.png",
  },
  {
    id: 6,
    nome: "Quiche Lorraine",
    valor: "6,50",
    descricao: "Torta francesa, recheio cremoso de ovos, bacon e queijo em massa amanteigada.",
    imagem: "/assets/img/imgsPadaria/salgad6.png",
  },
  {
    id: 7,
    nome: "Quiche de Alho-Poró",
    valor: "8,00",
    descricao: "Versão leve da quiche, recheada com alho-poró refogado e creme suave.",
    imagem: "/assets/img/imgsPadaria/salgad7.png",
  },
  {
    id: 8,
    nome: "Empada de Palmito",
    valor: "5,50",
    descricao: "Massa quebradiça, amanteigada, recheada com palmito cremoso e bem temperado.",
    imagem: "/assets/img/imgsPadaria/salgad8.png",
  },
  {
    id: 9,
    nome: "Empada de Frango",
    valor: "10,90",
    descricao: "Casquinha delicada, recheio cremoso e suculento de frango temperado.",
    imagem: "/assets/img/imgsPadaria/salgad9.png",
  },
  {
    id: 10,
    nome: "Pastel de Feira (Carne, Queijo, Frango, Palmito)",
    valor: "7,60",
    descricao: "Massa fina e crocante frita, recheios variados, clássico das feiras.",
    imagem: "/assets/img/imgsPadaria/salgad10.png",
  },
  {
    id: 11,
    nome: "Croissant de Presunto e Queijo",
    valor: "4,99",
    descricao: "Folhado leve e amanteigado, recheio derretido de presunto e queijo.",
    imagem: "/assets/img/imgsPadaria/salgad11.png",
  },
  {
    id: 12,
    nome: "Kibe",
    valor: "6,00",
    descricao: "Kibe com carne selecionada e temperos especiais, crocante por fora e macio por dentro.",
    imagem: "/assets/img/imgsPadaria/salgad12.png",
  },
  {
    id: 13,
    nome: "Enroladinho de Salsicha",
    valor: "4,00",
    descricao: "Massa fina envolvendo salsicha, ótimo para lanches rápidos e festas.",
    imagem: "/assets/img/imgsPadaria/salgad13.png",
  },
  {
    id: 14,
    nome: "Pão de Queijo Tradicional",
    valor: "2,00",
    descricao: "Macio, leve e saboroso, com muito queijo, clássico da culinária mineira.",
    imagem: "/assets/img/imgsPadaria/salgad14.png",
  },
  {
    id: 15,
    nome: "Folhado de Frango com Catupiry",
    valor: "4,50",
    descricao: "Massa crocante e leve, recheio cremoso de frango com catupiry.",
    imagem: "/assets/img/imgsPadaria/salgad15.png",
  },
  {
    id: 16,
    nome: "Torta Salgada (Frango, Legumes)",
    valor: "50,00",
    descricao: "Massa macia e recheio suculento, perfeita para lanches ou eventos.",
    imagem: "/assets/img/imgsPadaria/salgad16.png",
  },
  {
    id: 17,
    nome: "Mini Sanduíche Natural (Frango, Atum)",
    valor: "2,00",
    descricao: "Sanduíches frios, recheios leves e cremosos, ideais para coffee breaks.",
    imagem: "/assets/img/imgsPadaria/salgad17.png",
  },
  {
    id: 18,
    nome: "Salgadinho de queijo de padaria",
    valor: "1,50",
    descricao: "Delicado salgado, massa saborosa, polvilhado com queijo ralado.",
    imagem: "/assets/img/imgsPadaria/salgad18.png",
  },
  {
    id: 19,
    nome: "Croque Monsieur (Sanduíche quente)",
    valor: "5,00",
    descricao: "Sanduíche francês quente, gratinado, recheado com presunto, queijo e molho béchamel.",
    imagem: "/assets/img/imgsPadaria/salgad19.png",
  },
  {
    id: 20,
    nome: "Fogazza (Mussarela, Calabresa)",
    valor: "9,99",
    descricao: "Massa frita e macia, recheio generoso de queijo ou calabresa, muito saborosa.",
    imagem: "/assets/img/imgsPadaria/salgad20.png",
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
        Nossos Salgados
      </h1>

      {/* BOTÃO ATUALIZADO com a nova classe de estilo */}
      <button onClick={handleGoToMenu} className="back-to-menu-btn">
        &larr; Voltar ao Cardápio
      </button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {salgados.map((salgado) => (
          <ProductCard
            key={salgado.id}
            produto={salgado}
          />
        ))}
      </div>
    </div>
  );
}

export default Salgados;