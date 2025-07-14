import React from 'react';
import { useCart } from '../context/CartContext';
import styles from './Carrinho.module.css';

const Carrinho = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    // A lógica de não permitir quantidade < 1 já funciona aqui
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.valor.replace(',', '.'));
      return total + price * item.quantity;
    }, 0).toFixed(2).replace('.', ',');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Minha Cesta de Delícias</h1>
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Sua cesta está vazia. Que tal adicionar alguns pães quentinhos?</p>
        </div>
      ) : (
        <div className={styles.cartGrid}>
          <div className={styles.cartItems}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.imagem} alt={item.nome} className={styles.cartItemImage} />
                <div className={styles.cartItemDetails}>
                  <h2>{item.nome}</h2>
                  <p>R$ {item.valor}</p>

                  {/* NOVO SELETOR DE QUANTIDADE */}
                  <div className={styles.quantitySelector}>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span className={styles.quantityDisplay}>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>

                </div>
                <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
                  Remover
                </button>
              </div>
            ))}
          </div>
          <div className={styles.cartSummary}>
            <h3>Resumo do Pedido</h3>
            <div className={styles.total}>
              <span>Total</span>
              <span>R$ {calculateTotal()}</span>
            </div>
            <button className={styles.checkoutButton}>Finalizar Compra</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrinho;