import React, { useState, useEffect } from 'react';
import '../assets/css/main.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000';

function Doces() {
    const [doces, setDoces] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    
        const fetchDoces = async () => {
            try {
                const response = await fetch(`${API_URL}/api/produtos`);
                if (!response.ok) throw new Error('Falha ao buscar os doces.');
                let data = await response.json();
                // Filtra para mostrar apenas produtos do tipo "Doces e Bolos"
                data = data.filter(p => p.tipo === 'Doces e Bolos');
                setDoces(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        useEffect(() => {
        fetchDoces();
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

    const ProductCard = ({ produto }) => {
        const isOutOfStock = produto.estoque === 0;

    const handleAddToCart = async () => {
      try {
        await addToCart(produto);
        setDoces(prev =>
            prev.map(p =>
                p.id === produto.id ? { ...p, estoque: p.estoque - 1} : p
            )
        );
      } catch (err) {
        toast.error("Erro ao adicionar ao carrinho");
      }
    };

        return (
            <div className={`product-card ${isOutOfStock ? 'produto-esgotado' : ''}`}>
                <div className="product-image-container">
                    <img src={produto.imagemUrl ? `${API_URL}/${produto.imagemUrl}` : 'https://via.placeholder.com/200'} alt={produto.nome} />
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
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                    >
                        {isOutOfStock ? 'Sem Estoque' : 'Adicionar ao Carrinho'}
                    </button>
                </div>
            </div>
        );
    };

    if (loading) return <div style={{ padding: "40px", textAlign: 'center' }}><h1>Carregando doces...</h1></div>;

    return (
        <div style={{ padding: "40px", textAlign: 'center' }}>
            <h1 style={{ color: "#d2691e" }}>
                Nossos Doces e Bolos
            </h1>
            <button onClick={handleGoToMenu} className="back-to-menu-btn">
                &larr; Voltar ao Cardápio
            </button>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginTop: '20px' }}>
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