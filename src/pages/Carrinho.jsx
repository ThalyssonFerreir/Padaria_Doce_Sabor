import React from 'react';

import { useCart } from '../context/CartContext';

import styles from './Carrinho.module.css';

import { useNavigate } from 'react-router-dom'; // Importe o useNavigate para navegação


// IMPORTAR O COMPONENTE FinalizePurchaseButton

// Ajuste o caminho conforme a localização real do seu arquivo FinalizePurchaseButton.jsx

// Se estiver em src/pages/FinalizePurchaseButton.jsx (como na sua estrutura atual):

import FinalizePurchaseButton from './FinalizePurchaseButton';


const Carrinho = () => {

  const navigate = useNavigate(); // <--- INICIALIZE O HOOK useNavigate AQUI

  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();


  const handleQuantityChange = (productId, newQuantity) => {

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


  // Função para navegar de volta ao menu principal e rolar

  const handleGoToMenu = () => {

    // console.log("Voltando ao cardápio..."); // Remova esta linha se não precisar mais do log

    navigate('/'); // Navega para a rota raiz (onde seu menu principal provavelmente está)

    // O setTimeout é para dar tempo da navegação acontecer antes de tentar rolar

    setTimeout(() => {

      // O ID 'cardapio' é o que você definiu para a seção do seu menu na página principal

      const element = document.getElementById('cardapio');

      if (element) {

        element.scrollIntoView({ behavior: 'smooth' }); // Rola suavemente até a seção

      }

    }, 100); // Um pequeno atraso de 100ms

  };


  // Função apos a finalização da compra

  const handlePurchaseComplete = () => {

    clearCart();

    navigate('/inicio');

   

  };


  return (

    <div className={styles.container}>

      <h1 className={styles.title}>Minha Cesta de Delícias</h1>

      {cartItems.length === 0 ? (

        <div className={styles.emptyCart}>

          <p>Sua cesta está vazia. Que tal adicionar alguns pães quentinhos?</p>


          {/* botao de voltar ao menu */}

          <button onClick={handleGoToMenu} className="back-to-menu-btn">

             &larr; Voltar ao Cardápio

          </button>

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

            <FinalizePurchaseButton onPurchaseComplete={handlePurchaseComplete} />

          </div>
          <button onClick={handleGoToMenu} className="back-to-menu-btn padaria-style">

            &larr; Voltar ao Cardápio
          </button>
        </div>

      )}

    </div>

  );

};


export default Carrinho; 