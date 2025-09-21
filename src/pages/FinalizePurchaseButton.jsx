import React, { useState } from 'react';
import './FinalizePurchaseButton.css';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000';

function FinalizePurchaseButton({ onPurchaseComplete }) {
    const [buttonState, setButtonState] = useState('idle');
    const token = localStorage.getItem('token');

    const handleClick = async () => {
        if (buttonState !== 'idle' || !token) return;

        setButtonState('loading');

        try {
            const response = await fetch(`${API_URL}/api/pedidos/finalizar`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Não foi possível finalizar a compra.');
            }

            setButtonState('completed');

            setTimeout(() => {
                if (onPurchaseComplete) {
                    onPurchaseComplete();
                }
            }, 1500);

        } catch (error) {
            toast.error(error.message);
            setButtonState('idle');
        }
    };

    let buttonText = 'Finalizar Compra';
    let buttonClass = '';

    switch (buttonState) {
        case 'loading':
            buttonText = 'Processando...';
            buttonClass = 'loading';
            break;
        case 'completed':
            buttonText = 'Compra Realizada!';
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