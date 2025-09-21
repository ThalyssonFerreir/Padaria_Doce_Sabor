import React, { useState, useEffect } from 'react';
import '../assets/css/main.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000';

function Salgados() {
    const [salgados, setSalgados] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchSalgados = async () => {
            try {
                const response = await fetch(`${API_URL}/api/produtos`);
                if (!response.ok) throw new Error('Falha ao buscar os salgados.');
                let data = await response.json();
                // Filtra para mostrar apenas produtos do tipo "Salgados"
                data = data.filter(p => p.tipo === 'Salgados');
                setSalgados(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSalgados();
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
                        onClick={() => addToCart(produto)}
                        disabled={isOutOfStock}
                    >
                        {isOutOfStock ? 'Sem Estoque' : 'Adicionar ao Carrinho'}
                    </button>
                </div>
            </div>
        );
    };

    if (loading) return <div style={{ padding: "40px", textAlign: 'center' }}><h1>Carregando salgados...</h1></div>;

    return (
        <div style={{ padding: "40px", textAlign: 'center' }}>
            <h1 style={{ color: "#d2691e" }}>
                Nossos Salgados
            </h1>
            <button onClick={handleGoToMenu} className="back-to-menu-btn">
                &larr; Voltar ao Cardápio
            </button>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginTop: '20px' }}>
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