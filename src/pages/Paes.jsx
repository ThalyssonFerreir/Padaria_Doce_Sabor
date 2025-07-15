import React from 'react';
import '../assets/css/main.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate

function Paes() {
  const navigate = useNavigate(); // Hook para navegação
  const { addToCart } = useCart();

  // Dados dos pães
  const paes = [
  {
    id: 1,
    nome: "Pão de fermentação natural",
    valor: "5,00",
    descricao: "Crosta crocante e miolo macio, perfeito para o café da manhã.",
    imagem: "/assets/img/imgsPadaria/pao1.png",
  },
  {
    id: 2,
    nome: "Pão Australiano",
    valor: "5,80",
    descricao: "Pão escuro, macio e levemente adocicado, com notas de mel e cacau.",
    imagem: "/assets/img/imgsPadaria/pao2.png",
  },
  {
    id: 3,
    nome: "Pão Italiano",
    valor: "5,50",
    descricao: "Massa firme e crosta grossa, miolo aerado, perfeito para acompanhar azeite ou antepastos.",
    imagem: "/assets/img/imgsPadaria/pao3.png",
  },
  {
    id: 4,
    nome: "Pão Português",
    valor: "3,00",
    descricao: "Pão rústico, miolo macio e casca crocante, ideal para acompanhar sopas ou recheios.",
    imagem: "/assets/img/imgsPadaria/pao4.png",
  },
  {
    id: 5,
    nome: "Focaccia de Alecrim e Flor de Sal",
    valor: "8,99",
    descricao: "Pão macio, alto e untuoso, coberto com azeite, alecrim fresco e toque crocante de flor de sal.",
    imagem: "/assets/img/imgsPadaria/pao5.png",
  },
  {
    id: 6,
    nome: "Ciabatta",
    valor: "6,50",
    descricao: "Pão leve, de casca crocante e miolo cheio de alvéolos, perfeito para sanduíches ou bruschettas.",
    imagem: "/assets/img/imgsPadaria/pao6.png",
  },
  {
    id: 7,
    nome: "Baguete Tradicional",
    valor: "5,00",
    descricao: "Clássico francês de miolo macio, ótimo para sanduíches ou puro com manteiga.",
    imagem: "/assets/img/imgsPadaria/pao7.png",
  },
  {
    id: 8,
    nome: "Pão de Campanha",
    valor: "6,99",
    descricao: "Pão rústico, firme e de sabor levemente ácido, ideal para tábuas de frios ou queijos.",
    imagem: "/assets/img/imgsPadaria/pao8.png",
  },
  {
    id: 9,
    nome: "Pão de Centeio com Nozes",
    valor: "8,20",
    descricao: "Pão escuro, denso e aromático, com sabor marcante de centeio e crocância das nozes.",
    imagem: "/assets/img/imgsPadaria/pao9.png",
  },
  {
    id: 10,
    nome: "Pão de Mandioquinha",
    valor: "3,00",
    descricao: "Macio, levemente adocicado, com cor amarelinha e sabor delicado da mandioquinha.",
    imagem: "/assets/img/imgsPadaria/pao10.png",
  },
  {
    id: 11,
    nome: "Pão Brioche",
    valor: "4,99",
    descricao: "Pão francês adocicado, macio e amanteigado, perfeito para doces ou hambúrgueres gourmet.",
    imagem: "/assets/img/imgsPadaria/pao11.png",
  },
  {
    id: 12,
    nome: "Pão de Queijo Gourmet",
    valor: "4,00",
    descricao: "Versão sofisticada do clássico mineiro, casquinha crocante e interior macio, com muito queijo.",
    imagem: "/assets/img/imgsPadaria/pao12.png",
  },
  {
    id: 13,
    nome: "Pão Integral com Grãos",
    valor: "3,00",
    descricao: "Rico em fibras, massa macia e recheada de sementes variadas, sabor intenso e saudável.",
    imagem: "/assets/img/imgsPadaria/pao13.png",
  },
  {
    id: 14,
    nome: "Pão de Azeitona",
    valor: "3,99",
    descricao: "Pão rústico, sabor marcante das azeitonas, perfeito para tábuas de frios ou antepastos.",
    imagem: "/assets/img/imgsPadaria/pao14.png",
  },
  {
    id: 15,
    nome: "Pão Árabe",
    valor: "4,50",
    descricao: "Pão fino, flexível e leve, ideal para wraps, pastas ou recheios variados.",
    imagem: "/assets/img/imgsPadaria/pao15.png",
  },
  {
    id: 16,
    nome: "Mini Pão Francês",
    valor: "1,00",
    descricao: "Versão pequena do clássico pãozinho brasileiro, crocante por fora e macio por dentro.",
    imagem: "/assets/img/imgsPadaria/pao16.png",
  },
  {
    id: 17,
    nome: "Pão de Batata",
    valor: "8,99",
    descricao: "Pão macio e leve, com textura úmida e sabor suave, ótimo para lanches recheados.",
    imagem: "/assets/img/imgsPadaria/pao17.png",
  },
  {
    id: 18,
    nome: "Pão de Milho",
    valor: "5,20",
    descricao: "Pão amarelinho, sabor levemente adocicado do milho, textura macia e úmida.",
    imagem: "/assets/img/imgsPadaria/pao18.png",
  },
  {
    id: 19,
    nome: "Pão de Forma Artesanal",
    valor: "5,00",
    descricao: "Fatias macias e mais rústicas que o industrializado, sabor delicado e textura fofinha.",
    imagem: "/assets/img/imgsPadaria/pao19.png",
  },
  {
    id: 20,
    nome: "Pão de Alho",
    valor: "3,99",
    descricao: "Pão recheado com creme de alho amanteigado, ideal para churrascos ou entradas.",
    imagem: "/assets/img/imgsPadaria/pao20.png",
  },
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