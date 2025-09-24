import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

const API_URL = 'http://localhost:3000';

Modal.setAppElement('#root');

const getStatusClass = (status) => {
    switch (status) {
        case 'PENDENTE': return 'status-pendente';
        case 'EM PREPARO': return 'status-preparo';
        case 'A CAMINHO': return 'status-caminho';
        case 'ENTREGUE': return 'status-entregue';
        case 'CANCELADO': return 'status-cancelado';
        default: return '';
    }
};

function ListaPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPedido, setSelectedPedido] = useState(null);

    const fetchPedidos = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/api/pedidos/vendedor`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Falha ao buscar pedidos.');
            const data = await response.json();
            setPedidos(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    const handleStatusChange = async (pedidoId, newStatus) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/api/pedidos/${pedidoId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) throw new Error('Falha ao atualizar o status.');

            setPedidos(pedidos.map(p => p.id === pedidoId ? { ...p, status: newStatus } : p));
            toast.success(`Pedido #${pedidoId} atualizado para "${newStatus}"!`);

        } catch (error) {
            toast.error(error.message);
        }
    };

    const openModal = (pedido) => {
        setSelectedPedido(pedido);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedPedido(null);
    };

    if (loading) return <div className="painel-placeholder"><h2>Carregando pedidos...</h2></div>;

    return (
        <>
            <div className="painel-header">
                <h2 className="painel-titulo">Pedidos Recebidos</h2>
            </div>
            <div className="painel-corpo">
                <div className="content-card tabela-container">
                    <table className="tabela-produtos">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Data</th>
                                <th>Valor Total</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.map(pedido => (
                                <tr key={pedido.id}>
                                    <td><strong>#{pedido.id}</strong></td>
                                    <td>{pedido.usuario.nome}</td>
                                    <td>{new Date(pedido.createdAt).toLocaleDateString('pt-BR')}</td>
                                    <td>R$ {pedido.valorTotal.toFixed(2).replace('.', ',')}</td>
                                    <td>
                                        {/* --- MUDANÇA AQUI --- */}
                                        {/* O select agora está dentro de uma div wrapper */}
                                        <div className={`status-select-wrapper ${getStatusClass(pedido.status)}`}>
                                            <select
                                                value={pedido.status}
                                                onChange={(e) => handleStatusChange(pedido.id, e.target.value)}
                                            >
                                                <option value="PENDENTE">Pendente</option>
                                                <option value="EM PREPARO">Em Preparo</option>
                                                <option value="A CAMINHO">A Caminho</option>
                                                <option value="ENTREGUE">Entregue</option>
                                                <option value="CANCELADO">Cancelado</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <button className="btn-painel btn-editar" onClick={() => openModal(pedido)}>
                                            <i className="bi bi-eye-fill"></i> Detalhes
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedPedido && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Detalhes do Pedido"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    <h2>Detalhes do Pedido #{selectedPedido.id}</h2>
                    <p><strong>Cliente:</strong> {selectedPedido.usuario.nome} ({selectedPedido.usuario.email})</p>
                    <p><strong>Data:</strong> {new Date(selectedPedido.createdAt).toLocaleString('pt-BR')}</p>
                    <p><strong>Status:</strong> <span className={`status-pill ${getStatusClass(selectedPedido.status)}`}>{selectedPedido.status}</span></p>

                    <h3 className='modal-itens-titulo'>Itens do Pedido:</h3>
                    <ul className='modal-itens-lista'>
                        {selectedPedido.itens.map(item => (
                            <li key={item.id}>
                                <span>{item.quantidade}x {item.produto.nome}</span>
                                <span>R$ {(item.precoUnitario * item.quantidade).toFixed(2).replace('.', ',')}</span>
                            </li>
                        ))}
                    </ul>

                    <div className='modal-total'>
                        <strong>Total:</strong>
                        <strong>R$ {selectedPedido.valorTotal.toFixed(2).replace('.', ',')}</strong>
                    </div>

                    <button className="btn-painel btn-secondary-red modal-fechar" onClick={closeModal}>Fechar</button>
                </Modal>
            )}
        </>
    );
}

export default ListaPedidos;