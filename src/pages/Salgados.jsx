import { Link } from 'react-router-dom';
import '../assets/css/main.css'

function Salgados() {
  const paes = [
    {
      nome: "Coxinha de Frango com Requeijão",
      valor: "5,00",
      descricao: "Salgado clássico, massa macia e dourada, recheio cremoso de frango com requeijão.",
      imagem: "/assets/img/imgsPadaria/salgad1.png",
    },
    {
      nome: "Risole de Carne",
      valor: "5,00",
      descricao: "Salgado frito, massa saborosa e crocante, recheado com carne bem temperada.",
      imagem: "/assets/img/imgsPadaria/salgad2.png",
    },
    {
      nome: "Bolinho de Queijo",
      valor: "2,50",
      descricao: "Pequeno e saboroso, casquinha crocante e recheio cremoso de queijo derretido.",
      imagem: "/assets/img/imgsPadaria/salgad3.png",
    },
    {
      nome: "Mini Pizza (Calabresa, Queijo)",
      valor: "3,50",
      descricao: "Massa macia, molho saboroso e perfeita para festas.",
      imagem: "/assets/img/imgsPadaria/salgad4.png",
    },
    {
      nome: "Esfiha Aberta (Carne, Queijo)",
      valor: "6,99",
      descricao: "Massa leve em formato aberto, recheios suculentos, tradicional árabe.",
      imagem: "/assets/img/imgsPadaria/salgad5.png",
    },
    {
      nome: "Quiche Lorraine",
      valor: "6,50",
      descricao: "Torta francesa, recheio cremoso de ovos, bacon e queijo em massa amanteigada.",
      imagem: "/assets/img/imgsPadaria/salgad6.png",
    },
    {
      nome: "Quiche de Alho-Poró",
      valor: "8,00",
      descricao: "Versão leve da quiche, recheada com alho-poró refogado e creme suave.",
      imagem: "/assets/img/imgsPadaria/salgad7.png",
    },
    {
      nome: "Empada de Palmito",
      valor: "5,50",
      descricao: "Massa quebradiça, amanteigada, recheada com palmito cremoso e bem temperado.",
      imagem: "/assets/img/imgsPadaria/salgad8.png",
    },
    {
      nome: "Empada de Frango",
      valor: "10,90",
      descricao: "Casquinha delicada, recheio cremoso e suculento de frango temperado.",
      imagem: "/assets/img/imgsPadaria/salgad9.png",
    },
    {
      nome: "Pastel de Feira (Carne, Queijo, Frango, Palmito)",
      valor: "7,60",
      descricao: "Massa fina e crocante frita, recheios variados, clássico das feiras.",
      imagem: "/assets/img/imgsPadaria/salgad10.png",
    },
    {
      nome: "Croissant de Presunto e Queijo",
      valor: "4,99",
      descricao: "Folhado leve e amanteigado, recheio derretido de presunto e queijo.",
      imagem: "/assets/img/imgsPadaria/salgad11.png",
    },
    {
      nome: "Kibe",
      valor: "6,00",
      descricao: "Kibe com carne selecionada e temperos especiais, crocante por fora e macio por dentro.",
      imagem: "/assets/img/imgsPadaria/salgad12.png",
    },
        {
      nome: "Enroladinho de Salsicha",
      valor: "4,00",
      descricao: "Massa fina envolvendo salsicha, ótimo para lanches rápidos e festas.",
      imagem: "/assets/img/imgsPadaria/salgad13.png",
    },
    {
      nome: "Pão de Queijo Tradicional",
      valor: "2,00",
      descricao: "Macio, leve e saboroso, com muito queijo, clássico da culinária mineira.",
      imagem: "/assets/img/imgsPadaria/salgad14.png",
    },
    {
      nome: "Folhado de Frango com Catupiry",
      valor: "4,50",
      descricao: "Massa crocante e leve, recheio cremoso de frango com catupiry.",
      imagem: "/assets/img/imgsPadaria/salgad15.png",
    },
    {
      nome: "Torta Salgada (Frango, Legumes)",
      valor: "50,00",
      descricao: "Massa macia e recheio suculento, perfeita para lanches ou eventos.",
      imagem: "/assets/img/imgsPadaria/salgad16.png",
    },
    {
      nome: "Mini Sanduíche Natural (Frango, Atum)",
      valor: "2,00",
      descricao: "Sanduíches frios, recheios leves e cremosos, ideais para coffee breaks.",
      imagem: "/assets/img/imgsPadaria/salgad17.png",
    },
    {
      nome: "Salgadingo de queijo de padaria",
      valor: "1,50",
      descricao: "Delicado salgado, massa saborosa, povilhado com queijo ralado.",
      imagem: "/assets/img/imgsPadaria/salgad18.png",
    },
    {
      nome: "Croque Monsieur (Sanduíche quente)",
      valor: "5,00",
      descricao: "Sanduíche francês quente, gratinado, recheado com presunto, queijo e molho béchamel.",
      imagem: "/assets/img/imgsPadaria/salgad19.png",
    },
    {
      nome: "Fogazza (Mussarela, Calabresa)",
      valor: "9,99",
      descricao: "Massa frita e macia, recheio generoso de queijo ou calabresa, muito saborosa.",
      imagem: "/assets/img/imgsPadaria/salgad20.png",
    },
  ];

  const ProductCard = ({ nome, valor, descricao, imagem }) => (
    <div className="product-card">
      <img src={imagem} alt={nome} />
      <div className="product-card-content">
        <h2 className="product-card-title">{nome}</h2>
        <p className="product-card-price">R$ {valor}</p>
        <p className="product-card-description">{descricao}</p>
      </div>
      <div className="product-card-button-wrapper">
        <button className="product-card-button">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ color: "#d2691e", textAlign: "center" }}>
        Salgados - Padaria Doce Sabor
      </h1>

       <div style={{ textAlign: "center" }}>
        <Link to="/" className="btn-voltar-menu">
          Voltar para o Menu
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        {paes.map((pao, index) => (
          <ProductCard
            key={index}
            nome={pao.nome}
            valor={pao.valor}
            descricao={pao.descricao}
            imagem={pao.imagem}
          />
        ))}
      </div>
    </div>
  );
}

export default Salgados;