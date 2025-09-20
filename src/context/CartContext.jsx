import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000';

// 1. O contexto é criado, mas não exportado diretamente daqui.
const CartContext = createContext();

// 2. O hook personalizado para usar o contexto. É exportado para que outros componentes possam usá-lo.
export const useCart = () => useContext(CartContext);

// 3. O Componente Provider. Esta é a exportação principal (default) do arquivo.
function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    const fetchCart = useCallback(async () => {
        if (!token) {
            setCartItems([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/carrinho`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Falha ao buscar carrinho.');
            const data = await response.json();
            const formattedCart = data.map(item => ({...item.produto, quantity: item.quantidade }));
            setCartItems(formattedCart);
        } catch (error) {
            console.error(error.message);
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const addToCart = async (product) => {
        if (!token) {
            toast.error('Você precisa estar logado para adicionar itens.');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/carrinho/adicionar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ produtoId: product.id, quantidade: 1 }),
            });
             if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Não foi possível adicionar o item.');
            }
            await fetchCart();
            toast.success(`"${product.nome}" adicionado ao carrinho!`);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const updateCartItemQuantity = async (produtoId, quantidade) => {
        if (!token) return;
        try {
            const response = await fetch(`${API_URL}/api/carrinho/item`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ produtoId, quantidade }),
            });
            if (!response.ok) throw new Error("Erro ao atualizar a quantidade.");
            await fetchCart();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const removeCartItem = async (produtoId) => {
        if (!token) return;
        try {
            const response = await fetch(`${API_URL}/api/carrinho/item/${produtoId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}`},
            });
            if (!response.ok && response.status !== 204) throw new Error("Erro ao remover o item.");
            await fetchCart();
            toast.success("Item removido do carrinho.");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const clearCart = () => setCartItems([]);

    const value = { cartItems, addToCart, clearCart, fetchCart, updateCartItemQuantity, removeCartItem, loading };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;