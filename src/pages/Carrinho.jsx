import React from 'react';
import { useCart } from '../context/CartContext';
import styles from './Carrinho.module.css';
import { useNavigate, Link } from 'react-router-dom';
import FinalizePurchaseButton from './FinalizePurchaseButton';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000';

const Carrinho = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart, loading, updateCartItemQuantity, removeCartItem } = useCart();
    const user = localStorage.getItem('user');

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity > 0) {
            updateCartItemQuantity(productId, newQuantity);
        } else {
            removeCartItem(productId);
        }
    };

    const handleRemove = (productId) => {
        removeCartItem(productId);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.preco * item.quantity, 0).toFixed(2).replace('.', ',');
    };

    const handlePurchaseComplete = () => {
        toast.success("Obrigado pela sua compra! Seu pedido foi registrado.");
        clearCart();
        navigate('/meu-perfil');
    };

    const handleGoToMenu = () => {
        navigate('/');
        setTimeout(() => {
            const element = document.getElementById('cardapio');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    if (loading) {
        return <div className={styles.container}><h1 className={styles.title}>Carregando carrinho...</h1></div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Minha Cesta de Delícias</h1>
            {cartItems.length === 0 ? (
                <div className={styles.emptyCart}>
                    <p>Sua cesta está vazia. Que tal adicionar alguns pães quentinhos?</p>
                    <button onClick={handleGoToMenu} className="back-to-menu-btn">
                        &larr; Voltar ao Cardápio
                    </button>
                </div>
            ) : (
                <div className={styles.cartGrid}>
                    <div className={styles.cartItems}>
                        {cartItems.map((item) => (
                            <div key={item.id} className={styles.cartItem}>
                                <img src={item.imagemUrl ? `${API_URL}/${item.imagemUrl}`: 'https://via.placeholder.com/100'} alt={item.nome} className={styles.cartItemImage} />
                                <div className={styles.cartItemDetails}>
                                    <h2>{item.nome}</h2>
                                    <p>R$ {item.preco.toFixed(2).replace('.', ',')}</p>
                                    <div className={styles.quantitySelector}>
                                        <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className={styles.quantityButton}>-</button>
                                        <span className={styles.quantityDisplay}>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className={styles.quantityButton}>+</button>
                                    </div>
                                </div>
                                <button onClick={() => handleRemove(item.id)} className={styles.removeButton}>Remover</button>
                            </div>
                        ))}
                    </div>
                    <div className={styles.cartSummary}>
                        <h3>Resumo do Pedido</h3>
                        <div className={styles.total}>
                            <span>Total</span>
                            <span>R$ {calculateTotal()}</span>
                        </div>
                        {user ? (
                            <FinalizePurchaseButton onPurchaseComplete={handlePurchaseComplete} />
                        ) : (
                            <Link to="/login" className={styles.loginButton}>Faça login para finalizar a compra</Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carrinho;