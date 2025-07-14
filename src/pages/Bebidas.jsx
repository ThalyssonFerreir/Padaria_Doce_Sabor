import React from 'react';
import '../assets/css/main.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate

function Bebidas() {
  const navigate = useNavigate(); // Hook para navegação
  const { addToCart } = useCart();

  // Dados das bebidas (usando pães como modelo)
 const bebidas = [
  {
    id: 1,
    nome: "Café Espresso",
    valor: "6,00",
    descricao: "Um shot de café puro e intenso, tirado sob alta pressão. A base para muitas outras bebidas.",
    imagem: "/assets/img/imgsPadaria/bebidas/cafe-espresso.png",
  },
  {
    id: 2,
    nome: "Cappuccino Italiano",
    valor: "9,50",
    descricao: "A combinação perfeita de café espresso, leite vaporizado e uma cremosa espuma de leite.",
    imagem: "/assets/img/imgsPadaria/bebidas/cappuccino.jpg",
  },
  {
    id: 3,
    nome: "Café com Leite (Média)",
    valor: "7,00",
    descricao: "O clássico pão na chapa brasileiro, servido em um copo americano com café e leite.",
    imagem: "/assets/img/imgsPadaria/bebidas/cafe-com-leite.jpg",
  },
  {
    id: 4,
    nome: "Chocolate Quente Cremoso",
    valor: "12,00",
    descricao: "Nossa receita especial de chocolate quente, denso, cremoso e muito saboroso.",
    imagem: "/assets/img/imgsPadaria/bebidas/chocolate-quente.jpg",
  },
  {
    id: 5,
    nome: "Suco de Laranja Natural",
    valor: "8,00",
    descricao: "Suco feito na hora com laranjas frescas e selecionadas. Pura vitamina C. (300ml)",
    imagem: "/assets/img/imgsPadaria/bebidas/suco-laranja.jpg",
  },
  {
    id: 6,
    nome: "Vitamina de Banana",
    valor: "10,00",
    descricao: "Uma bebida nutritiva e saborosa, feita com bananas frescas, leite e um toque de aveia.",
    imagem: "/assets/img/imgsPadaria/bebidas/vitamina-banana.jpeg",
  },
  {
    id: 7,
    nome: "Açaí na Tigela (300g)",
    valor: "15,00",
    descricao: "Açaí puro batido com banana, servido com granola e mel. Uma explosão de energia.",
    imagem: "/assets/img/imgsPadaria/bebidas/acai-tigela.jpg",
  },
  {
    id: 8,
    nome: "Mocha",
    valor: "11,00",
    descricao: "Uma deliciosa mistura de café espresso, leite vaporizado e calda de chocolate.",
    imagem: "/assets/img/imgsPadaria/bebidas/mocha.jpg",
  },
  {
    id: 9,
    nome: "Affogato",
    valor: "14,00",
    descricao: "Uma bola de sorvete de creme 'afogada' em um shot de café espresso quente.",
    imagem: "/assets/img/imgsPadaria/bebidas/affogato.jpg",
  },
  {
    id: 10,
    nome: "Chá Gelado da Casa",
    valor: "7,50",
    descricao: "Nosso chá mate especial da casa, servido bem gelado com limão e um toque de hortelã.",
    imagem: "/assets/img/imgsPadaria/bebidas/cha-gelado.jpg",
  },
  {
    id: 11,
    nome: "Refrigerante (Lata)",
    valor: "5,00",
    descricao: "Escolha seu sabor preferido de refrigerante em lata, servido bem gelado.",
    imagem: "/assets/img/imgsPadaria/bebidas/refrigerante-lata.png",
  },
  {
    id: 12,
    nome: "Água com Gás",
    valor: "4,00",
    descricao: "Água mineral gaseificada, a opção perfeita para se refrescar e acompanhar seu lanche.",
    imagem: "/assets/img/imgsPadaria/bebidas/agua-com-gas.jpeg",
  },
  {
    id: 13,
    nome: "Espresso Duplo",
    valor: "8,50",
    descricao: "Para quem precisa de energia extra: dois shots de café espresso puro e intenso.",
    imagem: "/assets/img/imgsPadaria/bebidas/espresso-duplo.jpeg",
  },
  {
    id: 14,
    nome: "Macchiato",
    valor: "7,00",
    descricao: "Um café espresso 'manchado' com uma pequena quantidade de espuma de leite vaporizado.",
    imagem: "/assets/img/imgsPadaria/bebidas/macchiato.jpg",
  },
  {
    id: 15,
    nome: "Suco de Abacaxi com Hortelã",
    valor: "8,50",
    descricao: "Uma combinação refrescante e digestiva, feita com a fruta fresca na hora. (300ml)",
    imagem: "/assets/img/imgsPadaria/bebidas/suco-abacaxi-hortela.jpg",
  },
  {
    id: 16,
    nome: "Café Gelado",
    valor: "13,00",
    descricao: "Nosso café espresso batido com gelo, leite e um toque de xarope de baunilha.",
    imagem: "/assets/img/imgsPadaria/bebidas/cafe-gelado.jpeg",
  },
  {
    id: 17,
    nome: "Suco de Morango",
    valor: "9,00",
    descricao: "Clássico e delicioso suco de morango, feito com a fruta fresca e um pouco de açúcar.",
    imagem: "/assets/img/imgsPadaria/bebidas/suco-morango.jpg",
  },
  {
    id: 18,
    nome: "Milkshake de Chocolate",
    valor: "16,00",
    descricao: "Sorvete de chocolate cremoso batido com leite, finalizado com chantilly e calda.",
    imagem: "/assets/img/imgsPadaria/bebidas/milkshake-chocolate.jpg",
  },
  {
    id: 19,
    nome: "Caldo de Cana",
    valor: "7,00",
    descricao: "Garapa moída na hora, servida bem gelada. Pode ser com limão ou abacaxi.",
    imagem: "/assets/img/imgsPadaria/bebidas/caldo-de-cana.jpg",
  },
  {
    id: 20,
    nome: "Chá Quente (Sabores)",
    valor: "5,00",
    descricao: "Escolha entre nossos sabores de chá: Camomila, Hortelã, Erva-doce ou Cidreira.",
    imagem: "/assets/img/imgsPadaria/bebidas/cha-quente.jpg",
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