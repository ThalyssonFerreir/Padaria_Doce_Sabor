import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Importa a nova função

const API_URL = 'http://localhost:3000';

const getQuantidadePill = (quantidade) => {
    if (quantidade === 0) return <span className="qtd-pill qtd-zerado">{quantidade}</span>;
    if (quantidade < 20) return <span className="qtd-pill qtd-baixa">{quantidade}</span>;
    return <span className="qtd-pill qtd-alta">{quantidade}</span>;
};

const getSituacaoFromEstoque = (estoque) => {
    if (estoque === 0) return 'Sem estoque';
    if (estoque < 20) return 'Estoque baixo';
    return 'Em estoque';
}

const getStatusClass = (situacao) => {
    if (situacao === 'Em estoque') return 'status-habilitado';
    if (situacao === 'Estoque baixo') return 'status-estoque-baixo';
    if (situacao === 'Sem estoque') return 'status-desabilitado';
    return '';
};

function ListaProdutos({ onNavigateToCreateForm, onNavigateToEditForm }) {
    const [produtos, setProdutos] = useState([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [termoBusca, setTermoBusca] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('Todos');
    const [filtroEstoque, setFiltroEstoque] = useState('Todos');

    useEffect(() => {
        const fetchProdutos = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/api/produtos`);
                if (!response.ok) throw new Error('Não foi possível carregar os produtos.');
                const data = await response.json();
                setProdutos(data);
                setProdutosFiltrados(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProdutos();
    }, []);

    useEffect(() => {
        let itemsFiltrados = [...produtos];
        if (termoBusca) {
            itemsFiltrados = itemsFiltrados.filter(p =>
                p.nome.toLowerCase().includes(termoBusca.toLowerCase())
            );
        }
        if (filtroTipo !== 'Todos') {
            itemsFiltrados = itemsFiltrados.filter(p => p.tipo === filtroTipo);
        }
        if (filtroEstoque !== 'Todos') {
            itemsFiltrados = itemsFiltrados.filter(p => getSituacaoFromEstoque(p.estoque) === filtroEstoque);
        }
        setProdutosFiltrados(itemsFiltrados);
    }, [termoBusca, filtroTipo, filtroEstoque, produtos]);

    const handleDelete = (produtoId, produtoNome) => {
        confirmAlert({
            title: 'Confirmar Exclusão',
            message: `Você tem certeza que deseja excluir o produto "${produtoNome}"? Esta ação não pode ser desfeita.`,
            buttons: [
                {
                    label: 'Sim, excluir',
                    onClick: async () => {
                        const token = localStorage.getItem('token');
                        try {
                            const response = await fetch(`${API_URL}/api/produtos/${produtoId}`, {
                                method: 'DELETE',
                                headers: { 'Authorization': `Bearer ${token}` }
                            });
                            if (response.status !== 204) {
                                const errorData = await response.json();
                                throw new Error(errorData.error || 'Falha ao deletar o produto.');
                            }
                            // Atualiza a lista principal E a lista filtrada para consistência
                            const novaLista = produtos.filter(p => p.id !== produtoId);
                            setProdutos(novaLista);
                            setProdutosFiltrados(novaLista);
                            toast.success(`"${produtoNome}" foi excluído com sucesso!`);
                        } catch (err) {
                            toast.error(err.message);
                        }
                    }
                },
                {
                    label: 'Não, cancelar'
                }
            ]
        });
    };

    const tiposUnicos = ['Todos', ...new Set(produtos.map(p => p.tipo).filter(Boolean))];

    if (loading) return <div className="painel-placeholder"><h2>Carregando produtos...</h2></div>;
    if (error) return <div className="painel-placeholder"><h2>Erro ao carregar produtos: {error}</h2></div>;

    return (
        <>
            <div className="painel-header">
                <div className="header-titulo-caminho">
                    <h2 className="painel-titulo">Produtos</h2>
                    <nav className="breadcrumbs"><a href="#">Principal</a><span>&gt;</span><span>Produtos</span></nav>
                </div>
                <div className="acoes-header">
                    <button className="btn-painel btn-adicionar" onClick={onNavigateToCreateForm}>
                        <i className="bi bi-plus-lg"></i> Adicionar
                    </button>
                </div>
            </div>

            <div className="filtros-container">
                <div className="filtro-busca">
                    <i className="bi bi-search"></i>
                    <input
                        type="search"
                        placeholder="Buscar por nome..."
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                    />
                </div>
                <div className="filtro-select">
                    <label>Tipo</label>
                    <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                        {tiposUnicos.map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
                    </select>
                </div>
                <div className="filtro-select">
                    <label>Estoque</label>
                    <select value={filtroEstoque} onChange={(e) => setFiltroEstoque(e.target.value)}>
                        <option value="Todos">Todos</option>
                        <option value="Em estoque">Em estoque</option>
                        <option value="Estoque baixo">Estoque baixo</option>
                        <option value="Sem estoque">Sem estoque</option>
                    </select>
                </div>
            </div>

            <div className="painel-corpo">
                <div className="content-card tabela-container">
                    <div className="content-card-header"><h4><i className="bi bi-list-ul"></i> Listando produtos ({produtosFiltrados.length})</h4></div>
                    <div className="content-card-body">
                        <table className="tabela-produtos">
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>ID</th>
                                    <th>Tipo</th>
                                    <th>Preço</th>
                                    <th>Quantidade</th>
                                    <th>Situação</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtosFiltrados.map(produto => {
                                    const situacao = getSituacaoFromEstoque(produto.estoque);
                                    return (
                                        <tr key={produto.id}>
                                            <td>
                                                <div className="produto-info-cell">
                                                    <img
                                                        src={produto.imagemUrl ? `${API_URL}/${produto.imagemUrl}` : `https://via.placeholder.com/40`}
                                                        alt={produto.nome}
                                                        className="produto-imagem-tabela"
                                                    />
                                                    <span>{produto.nome}</span>
                                                </div>
                                            </td>
                                            <td>{produto.id}</td>
                                            <td>{produto.tipo}</td>
                                            <td>R$ {produto.preco.toFixed(2).replace('.', ',')}</td>
                                            <td>{getQuantidadePill(produto.estoque)}</td>
                                            <td>
                                                <span className={`status-pill ${getStatusClass(situacao)}`}>
                                                    <i className="status-icon"></i> {situacao}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="btn-painel btn-editar" onClick={() => onNavigateToEditForm(produto)}>
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>
                                                <button className="btn-painel btn-deletar" onClick={() => handleDelete(produto.id, produto.nome)}>
                                                    <i className="bi bi-trash-fill"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {produtosFiltrados.length === 0 && !loading && (
                            <div className="nenhum-resultado">
                                <p>Nenhum produto encontrado com os filtros aplicados.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaProdutos;