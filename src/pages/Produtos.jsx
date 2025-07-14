import React from 'react';
import '../assets/css/main.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate

function Produtos() {
  const navigate = useNavigate(); // Hook para navegação
  const { addToCart } = useCart();

  // Dados dos produtos de mercearia
  const mercearia = [
    {
      id: 1,
      nome: "Café Torrado e Moído (500g)",
      valor: "25,00",
      descricao: "Café de alta qualidade, torrado e moído na medida certa para um aroma irresistível.",
      imagem: "/assets/img/imgsPadaria/mercearia/cafe_torrado.jpg",
    },
    {
      id: 2,
      nome: "Açúcar Refinado (1kg)",
      valor: "7,00",
      descricao: "Açúcar branco refinado, essencial para todas as suas receitas doces.",
      imagem: "/assets/img/imgsPadaria/mercearia/acucar_refinado.jpg",
    },
    {
      id: 3,
      nome: "Farinha de Trigo (1kg)",
      valor: "6,50",
      descricao: "Farinha de trigo tipo 1, ideal para pães, bolos e massas em geral.",
      imagem: "/assets/img/imgsPadaria/mercearia/farinha_trigo.jpg",
    },
    {
      id: 4,
      nome: "Ovos Brancos (Dúzia)",
      valor: "15,00",
      descricao: "Ovos frescos e selecionados, perfeitos para suas receitas e cafés da manhã.",
      imagem: "/assets/img/imgsPadaria/mercearia/ovos_brancos.jpeg", // Modificado para .jpeg
    },
    {
      id: 5,
      nome: "Leite Integral (1L)",
      valor: "8,00",
      descricao: "Leite fresco integral, nutritivo e cremoso, essencial para o dia a dia.",
      imagem: "/assets/img/imgsPadaria/mercearia/leite_integral.jpg",
    },
    {
      id: 6,
      nome: "Manteiga com Sal (200g)",
      valor: "12,00",
      descricao: "Manteiga cremosa e saborosa, ideal para passar no pão ou usar em preparações culinárias.",
      imagem: "/assets/img/imgsPadaria/mercearia/manteiga_sal.jpg",
    },
    {
      id: 7,
      nome: "Margarina (500g)",
      valor: "9,00",
      descricao: "Margarina de uso geral, para diversas aplicações na cozinha e no pão.",
      imagem: "/assets/img/imgsPadaria/mercearia/margarina.jpg",
    },
    {
      id: 8,
      nome: "Óleo de Soja (900ml)",
      valor: "10,00",
      descricao: "Óleo vegetal de soja, prático para frituras e preparo de alimentos.",
      imagem: "/assets/img/imgsPadaria/mercearia/oleo_soja.jpg",
    },
    {
      id: 9,
      nome: "Sal Refinado (1kg)",
      valor: "4,00",
      descricao: "Sal de cozinha refinado, para temperar e realçar o sabor dos seus pratos.",
      imagem: "/assets/img/imgsPadaria/mercearia/sal_refinado.jpeg", // Modificado para .jpeg
    },
    {
      id: 10,
      nome: "Fermento Biológico Seco (10g)",
      valor: "3,50",
      descricao: "Fermento para pães e massas, garantindo crescimento e maciez.",
      imagem: "/assets/img/imgsPadaria/mercearia/fermento_biologico.png", // Modificado para .png
    },
    {
      id: 11,
      nome: "Queijo Minas Padrão (250g)",
      valor: "22,00",
      descricao: "Queijo fresco e versátil, perfeito para sanduíches, pão de queijo ou puro.",
      imagem: "/assets/img/imgsPadaria/mercearia/queijo_minas.jpg",
    },
    {
      id: 12,
      nome: "Presunto Fatiado (200g)",
      valor: "18,00",
      descricao: "Fatias finas de presunto de qualidade, ideal para sanduíches e lanches.",
      imagem: "/assets/img/imgsPadaria/mercearia/presunto_fatiado.jpg",
    },
    {
      id: 13,
      nome: "Leite Condensado (395g)",
      valor: "8,50",
      descricao: "Leite condensado cremoso, base para diversas sobremesas e doces.",
      imagem: "/assets/img/imgsPadaria/mercearia/leite_condensado.jpg",
    },
    {
      id: 14,
      nome: "Creme de Leite (200g)",
      valor: "7,50",
      descricao: "Creme de leite consistente, para molhos doces e salgados.",
      imagem: "/assets/img/imgsPadaria/mercearia/creme_leite.jpg",
    },
    {
      id: 15,
      nome: "Chocolate em Pó 50% Cacau (200g)",
      valor: "15,00",
      descricao: "Chocolate em pó de alta qualidade, para bebidas e receitas com sabor intenso.",
      imagem: "/assets/img/imgsPadaria/mercearia/chocolate_po.png", // Modificado para .png
    },
    {
      id: 16,
      nome: "Coco Ralado Seco (100g)",
      valor: "6,00",
      descricao: "Coco ralado seco, ideal para bolos, doces e decorações.",
      imagem: "/assets/img/imgsPadaria/mercearia/coco_ralado.png", // Modificado para .png
    },
    {
      id: 17,
      nome: "Gelatina em Pó (Sabores Variados)",
      valor: "3,00",
      descricao: "Caixa de gelatina em pó, para sobremesas leves e refrescantes.",
      imagem: "/assets/img/imgsPadaria/mercearia/gelatina.jpg",
    },
    {
      id: 18,
      nome: "Amido de Milho (200g)",
      valor: "5,00",
      descricao: "Amido de milho para engrossar molhos, cremes e dar leveza a massas.",
      imagem: "/assets/img/imgsPadaria/mercearia/amido_milho.png", // Modificado para .png
    },
    {
      id: 19,
      nome: "Bolacha Cream Cracker (200g)",
      valor: "6,00",
      descricao: "Bolacha crocante e salgada, ótima para acompanhar patês ou café.",
      imagem: "/assets/img/imgsPadaria/mercearia/cream_cracker.png", // Modificado para .png
    },
    {
      id: 20,
      nome: "Biscoito Recheado (Pacote)",
      valor: "4,50",
      descricao: "Biscoitos crocantes com recheio cremoso, perfeito para o lanche.",
      imagem: "/assets/img/imgsPadaria/mercearia/biscoito_recheado.jpg",
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
        {mercearia.map((produto) => (
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