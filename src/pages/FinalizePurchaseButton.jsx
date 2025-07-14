import React, { useState } from 'react';
import './FinalizePurchaseButton.css';
import { useNavigate } from 'react-router-dom';

// animação do botão de finalização de compra
function FinalizePurchaseButton({ onPurchaseComplete }) {
  const [buttonState, setButtonState] = useState('idle');
  const navigate = useNavigate(); // <<< 2. ADICIONE ESTA LINHA

  const handleClick = () => {
    if (buttonState === 'idle') {
      setButtonState('loading');

      setTimeout(() => {
        setButtonState('finishing');
      }, 2000);

      // Bloco de código da finalização da compra
      setTimeout(() => {
        setButtonState('completed');

        if (onPurchaseComplete) {
          onPurchaseComplete();
        }

        // <<< 3. ADICIONE A CHAMADA PARA REDIRECIONAR AQUI
        // Adiciona um pequeno atraso para o usuário ver a mensagem de sucesso
        setTimeout(() => {
          navigate('/'); // Redireciona para a página inicial (rota raiz)
        }, 1200); // 1.2 segundos de atraso antes de redirecionar

      }, 4000);

      // Este último timeout provavelmente não será executado,
      // pois a página já terá sido redirecionada.
      setTimeout(() => {
        setButtonState('idle');
      }, 6000);
    }
  };

  let buttonText = 'Finalizar Compra';
  let buttonClass = '';

  switch (buttonState) {
    case 'loading':
      buttonText = 'Preparando seu Café...';
      buttonClass = 'loading';
      break;
    case 'finishing':
      buttonText = 'Finalizando Compra...';
      buttonClass = 'finishing';
      break;
    case 'completed':
      buttonText = 'Compra Finalizada!';
      buttonClass = 'completed';
      break;
    default:
      buttonText = 'Finalizar Compra';
      buttonClass = '';
  }

  return (
    <button
      className={`finalize-button ${buttonClass}`}
      onClick={handleClick}
      disabled={buttonState !== 'idle'}
    >
      <span className="button-text">{buttonText}</span>
    </button>
  );
}

export default FinalizePurchaseButton;