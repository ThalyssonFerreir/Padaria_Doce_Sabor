import React, { useState } from 'react';
import '../assets/css/main.css';

function Doces() {
  const doces = [
    {
      nome: "Brigadeiro Tradicional",
      valor_por_100g: "12,50",
      descricao: "O clássico brigadeiro de chocolate, cremoso e coberto com granulado macio.",
      imagem: "/assets/img/imgsPadaria/doces/brigadeiro-tradicional.jpg",
    },
    {
      nome: "Beijinho de Coco",
      valor_por_100g: "12,00",
      descricao: "Doce de coco cremoso e enrolado em coco ralado, finalizado com um cravo.",
      imagem: "/assets/img/imgsPadaria/doces/beijinho-de-coco.png",
    },
    {
      nome: "Torta de Limão",
      valor_por_100g: "7,50",
      descricao: "Fatia de torta com base crocante, recheio de creme de limão e cobertura de marshmallow.",
      imagem: "/assets/img/imgsPadaria/doces/torta-de-limao.png",
    },
    {
      nome: "Pudim de Leite",
      valor_por_100g: "6,00",
      descricao: "Pudim de leite condensado cremoso e lisinho, com uma calda de caramelo perfeita.",
      imagem: "/assets/img/imgsPadaria/doces/pudim-de-leite.jpg",
    },
    {
      nome: "Sonho de Creme",
      valor_por_100g: "9,00",
      descricao: "Massa fofinha e frita, recheada com um delicioso creme de baunilha e polvilhada com açúcar.",
      imagem: "/assets/img/imgsPadaria/doces/sonho-de-creme.jpg",
    },
    {
      nome: "Quindim",
      valor_por_100g: "15,00",
      descricao: "Doce intenso de gema de ovo e coco, com uma calda brilhante e textura única.",
      imagem: "/assets/img/imgsPadaria/doces/quindim.webp",
    },
    {
      nome: "Carolina de Doce de Leite",
      valor_por_100g: "14,00",
      descricao: "Pequena bomba de massa choux recheada com doce de leite e coberta com chocolate.",
      imagem: "/assets/img/imgsPadaria/doces/carolina-doce-de-leite.jpg",
    },
    {
      nome: "Mousse de Maracujá",
      valor_por_100g: "7,00",
      descricao: "Creme aerado e azedinho de maracujá, com uma calda da própria fruta por cima.",
      imagem: "/assets/img/imgsPadaria/doces/mousse-maracuja.png",
    },
    {
      nome: "Bolo de Cenoura com Chocolate",
      valor_por_100g: "6,50",
      descricao: "Fatia de bolo de cenoura fofinho com uma generosa cobertura de brigadeiro cremoso.",
      imagem: "/assets/img/imgsPadaria/doces/bolo de cenoura.jpg",
    },
    {
      nome: "Torta Holandesa",
      valor_por_100g: "8,50",
      descricao: "Fatia de torta com base de biscoito, creme branco e cobertura de ganache de chocolate.",
      imagem: "/assets/img/imgsPadaria/doces/torta-holandesa.webp",
    },
    {
      nome: "Alfajor de Biscoito",
      valor_por_100g: "11,00",
      descricao: "Dois biscoitos macios recheados com doce de leite e banhados em chocolate meio amargo.",
      imagem: "/assets/img/imgsPadaria/doces/alfajor-de-biscoito.jpg",
    },
    {
      nome: "Cheesecake de Frutas Vermelhas",
      valor_por_100g: "9,50",
      descricao: "Fatia de cheesecake cremoso com base de biscoito e uma calda artesanal de frutas vermelhas.",
      imagem: "/assets/img/imgsPadaria/doces/cheesecake-frutas-vermelhas.webp",
    },
    {
      nome: "Mil-folhas de Creme",
      valor_por_100g: "10,00",
      descricao: "Massa folhada crocante intercalada com creme de confeiteiro e polvilhada com açúcar.",
      imagem: "/assets/img/imgsPadaria/doces/mil-folhas-creme.jpg",
    },
    {
      nome: "Palha Italiana",
      valor_por_100g: "9,00",
      descricao: "Doce cremoso de brigadeiro com pedaços de biscoito maisena, coberto com açúcar.",
      imagem: "/assets/img/imgsPadaria/doces/palha-italiana.png",
    },
    {
      nome: "Brownie de Chocolate com Nozes",
      valor_por_100g: "8,00",
      descricao: "Bolo de chocolate denso e úmido, com uma casquinha crocante e pedaços de nozes.",
      imagem: "/assets/img/imgsPadaria/doces/brownie-chocolate-nozes.webp",
    },
    {
      nome: "Pastel de Nata",
      valor_por_100g: "13,00",
      descricao: "O tradicional doce português, com massa folhada crocante e recheio cremoso de natas.",
      imagem: "/assets/img/imgsPadaria/doces/pastel-de-nata.png",
    },
    {
      nome: "Rocambole de Doce de Leite",
      valor_por_100g: "7,00",
      descricao: "Fatia de uma massa de pão de ló fofinha, enrolada com um recheio generoso de doce de leite.",
      imagem: "/assets/img/imgsPadaria/doces/rocambole-doce-de-leite.png",
    },
    {
      nome: "Cajuzinho",
      valor_por_100g: "11,00",
      descricao: "Docinho de amendoim e leite condensado, enrolado em açúcar e finalizado com um amendoim.",
      imagem: "/assets/img/imgsPadaria/doces/cajuzinho.avif",
    },
    {
      nome: "Bomba de Chocolate",
      valor_por_100g: "9,50",
      descricao: "Massa choux comprida e macia, recheada com creme de chocolate e coberta com ganache.",
      imagem: "/assets/img/imgsPadaria/doces/bomba-de-chocolate.jpg",
    },
    {
      nome: "Cocada Cremosa",
      valor_por_100g: "7,00",
      descricao: "Doce de coco fresco cozido com leite condensado até atingir uma textura macia e cremosa.",
      imagem: "/assets/img/imgsPadaria/doces/cocada-cremosa.jpg",
    },
  ];

  const ProductCard = ({ nome, valor_por_100g, descricao, imagem }) => {
    const [quantidade, setQuantidade] = useState(100);

    return (
      <div className="product-card">
        <img src={imagem} alt={nome} />
        <div className="product-card-content">
          <h2 className="product-card-title">{nome}</h2>
          <p className="product-card-price">R$ {valor_por_100g} / 100g</p>
          <p className="product-card-description">{descricao}</p>
        </div>
        <div className="product-card-button-wrapper" style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <label htmlFor={`qtd-${nome}`}>Peso (g):</label>
            <input
              type="number"
              id={`qtd-${nome}`}
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              min="50"
              step="50"
              style={{ width: '80px', padding: '5px', textAlign: 'center' }}
            />
          </div>
          <button className="product-card-button">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ color: "#d2691e", textAlign: "center" }}>
        Doces e Brigadeiros - Padaria Doce Sabor
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
        {doces.map((doce, index) => (
          <ProductCard
            key={index}
            nome={doce.nome}
            valor_por_100g={doce.valor_por_100g}
            descricao={doce.descricao}
            imagem={doce.imagem}
          />
        ))}
      </div>
    </div>
  );
}

export default Doces;