import '../assets/css/main.css'

function Paes() {
  const paes = [
    {
      nome: "Pão de fermentação natural",
      valor: "5,00",
      descricao: "Crosta crocante e miolo macio, perfeito para o café da manhã.",
      imagem: "/assets/img/imgsPadaria/pao1.png",
    },
    {
      nome: "Pão Australiano",
      valor: "5,80",
      descricao: "Pão escuro, macio e levemente adocicado, com notas de mel e cacau.",
      imagem: "/assets/img/imgsPadaria/pao2.png",
    },
    {
      nome: "Pão Italiano",
      valor: "5,50",
      descricao: "Massa firme e crosta grossa, miolo aerado, perfeito para acompanhar azeite ou antepastos.",
      imagem: "/assets/img/imgsPadaria/pao3.png",
    },
    {
      nome: "Pão Português",
      valor: "3,00",
      descricao: "Pão rústico, miolo macio e casca crocante, ideal para acompanhar sopas ou recheios.",
      imagem: "/assets/img/imgsPadaria/pao4.png",
    },
    {
      nome: "Focaccia de Alecrim e Flor de Sal",
      valor: "8,99",
      descricao: "Pão macio, alto e untuoso, coberto com azeite, alecrim fresco e toque crocante de flor de sal.",
      imagem: "/assets/img/imgsPadaria/pao5.png",
    },
    {
      nome: "Ciabatta",
      valor: "6,50",
      descricao: "Pão leve, de casca crocante e miolo cheio de alvéolos, perfeito para sanduíches ou bruschettas.",
      imagem: "/assets/img/imgsPadaria/pao6.png",
    },
    {
      nome: "Baguete Tradicional",
      valor: "5,00",
      descricao: "Clássico francês de miolo macio, ótimo para sanduíches ou puro com manteiga.",
      imagem: "/assets/img/imgsPadaria/pao7.png",
    },
    {
      nome: "Pão de Campanha",
      valor: "6,99",
      descricao: "Pão rústico, firme e de sabor levemente ácido, ideal para tábuas de frios ou queijos.",
      imagem: "/assets/img/imgsPadaria/pao8.png",
    },
    {
      nome: "Pão de Centeio com Nozes",
      valor: "8,20",
      descricao: "Pão escuro, denso e aromático, com sabor marcante de centeio e crocância das nozes.",
      imagem: "/assets/img/imgsPadaria/pao9.png",
    },
    {
      nome: "Pão de Mandioquinha",
      valor: "3,00",
      descricao: "Macio, levemente adocicado, com cor amarelinha e sabor delicado da mandioquinha.",
      imagem: "/assets/img/imgsPadaria/pao10.png",
    },
    {
      nome: "Pão Brioche",
      valor: "4,99",
      descricao: "Pão francês adocicado, macio e amanteigado, perfeito para doces ou hambúrgueres gourmet.",
      imagem: "/assets/img/imgsPadaria/pao11.png",
    },
    {
      nome: "Pão de Queijo Gourmet",
      valor: "4,00",
      descricao: "Versão sofisticada do clássico mineiro, casquinha crocante e interior macio, com muito queijo.",
      imagem: "/assets/img/imgsPadaria/pao12.png",
    },
        {
      nome: "Pão Integral com Grãos",
      valor: "3,00",
      descricao: "Rico em fibras, massa macia e recheada de sementes variadas, sabor intenso e saudável.",
      imagem: "/assets/img/imgsPadaria/pao13.png",
    },
    {
      nome: "Pão de Azeitona",
      valor: "3,99",
      descricao: "Pão rústico, sabor marcante das azeitonas, perfeito para tábuas de frios ou antepastos.",
      imagem: "/assets/img/imgsPadaria/pao14.png",
    },
    {
      nome: "Pão Árabe",
      valor: "4,50",
      descricao: "Pão fino, flexível e leve, ideal para wraps, pastas ou recheios variados.",
      imagem: "/assets/img/imgsPadaria/pao15.png",
    },
    {
      nome: "Mini Pão Francês",
      valor: "1.000,00",
      descricao: "Versão pequena do clássico pãozinho brasileiro, crocante por fora e macio por dentro.",
      imagem: "/assets/img/imgsPadaria/pao16.png",
    },
    {
      nome: "Pão de Batata",
      valor: "8,99",
      descricao: "Pão macio e leve, com textura úmida e sabor suave, ótimo para lanches recheados.",
      imagem: "/assets/img/imgsPadaria/pao17.png",
    },
    {
      nome: "Pão de Milho",
      valor: "5,20",
      descricao: "Pão amarelinho, sabor levemente adocicado do milho, textura macia e úmida.",
      imagem: "/assets/img/imgsPadaria/pao18.png",
    },
    {
      nome: "Pão de Forma Artesanal",
      valor: "5,00",
      descricao: "Fatias macias e mais rústicas que o industrializado, sabor delicado e textura fofinha.",
      imagem: "/assets/img/imgsPadaria/pao19.png",
    },
    {
      nome: "Pão de Alho",
      valor: "3,99",
      descricao: "Pão recheado com creme de alho amanteigado, ideal para churrascos ou entradas.",
      imagem: "/assets/img/imgsPadaria/pao20.png",
    },
  ];

  // Componente interno do card
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
        Pães - Padaria Doce Sabor
      </h1>

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

export default Paes;