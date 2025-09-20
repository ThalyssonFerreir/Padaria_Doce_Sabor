import React, { useState, useEffect } from 'react';

import { useCart } from '../context/CartContext';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';


const API_URL = 'http://localhost:3000';


function Paes() {

    const [paes, setPaes] = useState([]);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const { addToCart } = useCart();


    useEffect(() => {

        const fetchPaes = async () => {

            try {

                const response = await fetch(`${API_URL}/api/produtos`);

                if (!response.ok) throw new Error('Falha ao buscar os pães.');

                let data = await response.json();

                data = data.filter(p => p.tipo === 'Pães');

                setPaes(data);

            } catch (error) {

                toast.error(error.message);

            } finally {

                setLoading(false);

            }

        };

        fetchPaes();

    }, []);


    const handleGoToMenu = () => {

        navigate('/');

        setTimeout(() => {

            const element = document.getElementById('cardapio');

            if (element) {

                element.scrollIntoView({ behavior: 'smooth' });

            }

        }, 100);

    };


    // --- ProductCard ATUALIZADO ---

    const ProductCard = ({ produto }) => {

        const isOutOfStock = produto.estoque === 0;


        return (

            // Adiciona a classe 'produto-esgotado' ao card se o estoque for zero

            <div className={`product-card ${isOutOfStock ? 'produto-esgotado' : ''}`}>

                <div className="product-image-container">

                    <img src={produto.imagemUrl ? `${API_URL}/${produto.imagemUrl}` : 'https://via.placeholder.com/200'} alt={produto.nome} />

                    {/* Mostra uma tag de "Esgotado" sobre a imagem */}

                    {isOutOfStock && <div className="tag-esgotado">Esgotado</div>}

                </div>

                <div className="product-card-content">

                    <h2 className="product-card-title">{produto.nome}</h2>

                    <p className="product-card-price">R$ {produto.preco.toFixed(2).replace('.', ',')}</p>

                    <p className="product-card-description">{produto.descricao}</p>

                </div>

                <div className="product-card-button-wrapper">

                    <button

                        className="product-card-button"

                        onClick={() => addToCart(produto)}

                        // Desabilita o botão se o estoque for zero

                        disabled={isOutOfStock}

                    >

                        {/* Muda o texto do botão com base no estoque */}

                        {isOutOfStock ? 'Sem Estoque' : 'Adicionar ao Carrinho'}

                    </button>

                </div>

            </div>

        );

    };


    if (loading) return <div style={{ padding: "40px", textAlign: 'center' }}><h1>Carregando pães...</h1></div>;


    return (

        <div style={{ padding: "40px", textAlign: 'center' }}>

            <h1 style={{ color: "#d2691e" }}>

                Nossos Pães

            </h1>

            <button onClick={handleGoToMenu} className="back-to-menu-btn">

                &larr; Voltar ao Cardápio

            </button>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginTop: '20px' }}>

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