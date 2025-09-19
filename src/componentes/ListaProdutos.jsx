import React, { useState, useEffect } from 'react';

const produtosDeExemplo = [
    { id: 1, imagemUrl: '/assets/img/imgsPadaria/pao1.png', nome: 'Pão Francês', ID: '1', tipo: 'Pães', preco: 0.75, quantidade: 150, situacao: 'Em estoque' },
    { id: 2, imagemUrl: '/assets/img/imgsPadaria/pao2.png', nome: 'Pão Doce', ID: '2', tipo: 'Doces', preco: 1.50, quantidade: 45, situacao: 'Em estoque' },
    { id: 3, imagemUrl: '/assets/img/imgsPadaria/pao3.png', nome: 'Pão de Queijo', ID: '3', tipo: 'Salgados', preco: 2.00, quantidade: 8, situacao: 'Estoque baixo' },
];

const getQuantidadePill = (quantidade) => {
    if (quantidade === 0) return <span className="qtd-pill qtd-zerado">{quantidade}</span>;
    if (quantidade < 20) return <span className="qtd-pill qtd-baixa">{quantidade}</span>;
    if (quantidade >= 20) return <span className="qtd-pill qtd-alta">{quantidade}</span>;
    return <span>{quantidade}</span>;
};

const getStatusClass = (situacao) => {
    if (situacao === 'Em estoque') return 'status-habilitado';
    if (situacao === 'Estoque baixo') return 'status-estoque-baixo';
    if (situacao === 'Sem estoque') return 'status-desabilitado';
    return '';
};

const normalizeText = (text) => {
    return text.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

function ListaProdutos({ onNavigateToForm, isFilterPanelOpen, onCloseFilters }) {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtros, setFiltros] = useState({ produto: '', id: '', tipo: '', preco: '', situacao: '' });
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);

    useEffect(() => {
        setProdutos(produtosDeExemplo);
        setProdutosFiltrados(produtosDeExemplo);
        setLoading(false);
    }, []);

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({ ...prev, [name]: value }));
    };

    const handleAplicarFiltros = (e) => {
        e.preventDefault();
        let produtosData = [...produtos];
        const filtroProdutoNormalizado = normalizeText(filtros.produto);
        const filtroTipoNormalizado = normalizeText(filtros.tipo);

        if (filtros.produto) {
            produtosData = produtosData.filter(p => normalizeText(p.nome).includes(filtroProdutoNormalizado));
        }
        if (filtros.id) {
            produtosData = produtosData.filter(p => p.ID.toString().includes(filtros.id));
        }
        if (filtros.tipo) {
            produtosData = produtosData.filter(p => normalizeText(p.tipo).includes(filtroTipoNormalizado));
        }
        if (filtros.preco) {
            produtosData = produtosData.filter(p => p.preco >= parseFloat(filtros.preco));
        }
        if (filtros.situacao) {
            produtosData = produtosData.filter(p => p.situacao === filtros.situacao);
        }
        setProdutosFiltrados(produtosData);
        onCloseFilters(); // Fecha o painel de filtros mobile após aplicar
    };

    if (loading) return <div className="painel-placeholder"><h2>Carregando produtos...</h2></div>;
    if (error) return <div className="painel-placeholder"><h2>Erro ao carregar produtos: {error}</h2></div>;

    const FiltrosForm = () => (
        <form className="form-filtros" onSubmit={handleAplicarFiltros}>
            <div className="filtro-grupo">
                <label htmlFor="filtro-produto">Produto</label>
                <input name="produto" value={filtros.produto} onChange={handleFiltroChange} type="text" id="filtro-produto" placeholder="Nome do produto" />
            </div>
            <div className="filtro-grupo">
                <label htmlFor="filtro-ID">ID</label>
                <input name="id" value={filtros.id} onChange={handleFiltroChange} type="text" id="filtro-ID" placeholder="ID ou SKU" />
            </div>
            <div className="filtro-grupo">
                <label htmlFor="filtro-tipo">Tipo</label>
                <input name="tipo" value={filtros.tipo} onChange={handleFiltroChange} type="text" id="filtro-tipo" placeholder="Tipo do produto" />
            </div>
            <div className="filtro-grupo">
                <label htmlFor="filtro-preco">Preço a partir de</label>
                <input name="preco" value={filtros.preco} onChange={handleFiltroChange} type="number" id="filtro-preco" placeholder="Valor" />
            </div>
            <div className="filtro-grupo">
                <label htmlFor="filtro-situacao">Situação</label>
                <select name="situacao" value={filtros.situacao} onChange={handleFiltroChange} id="filtro-situacao">
                    <option value="">Todas</option>
                    <option value="Em estoque">Em estoque</option>
                    <option value="Estoque baixo">Estoque baixo</option>
                    <option value="Sem estoque">Sem estoque</option>
                </select>
            </div>
            <button type="submit" className="btn-painel btn-filtrar">Filtrar</button>
        </form>
    );

    return (
        <>
            <div className="painel-header">
                <div className="header-titulo-caminho">
                    <h2 className="painel-titulo">Produtos</h2>
                    <nav className="breadcrumbs"><a href="#">Principal</a><span>&gt;</span><span>Produtos</span></nav>
                </div>
                <div className="acoes-header">
                    <button className="btn-painel btn-adicionar" onClick={onNavigateToForm}><i className="bi bi-plus-lg"></i> Adicionar</button>
                </div>
            </div>
            
            <div className="painel-corpo">
                <div className="content-card tabela-container">
                    <div className="content-card-header"><h4><i className="bi bi-list-ul"></i> Listando produtos ({produtosFiltrados.length})</h4></div>
                    <div className="content-card-body">
                        <table className="tabela-produtos">
                            <thead>
                                <tr>
                                    <th><input type="checkbox" /></th>
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
                                {produtosFiltrados.map(produto => (
                                    <tr key={produto.id}>
                                        <td><input type="checkbox" /></td>
                                        <td>
                                            <div className="produto-info-cell">
                                                <img src={produto.imagemUrl} alt={produto.nome} className="produto-imagem-tabela" />
                                                <span>{produto.nome}</span>
                                            </div>
                                        </td>
                                        <td>{produto.ID}</td>
                                        <td>{produto.tipo}</td>
                                        <td>R$ {produto.preco.toFixed(2).replace('.', ',')}</td>
                                        <td>{getQuantidadePill(produto.quantidade)}</td>
                                        <td>
                                            <span className={`status-pill ${getStatusClass(produto.situacao)}`}>
                                                <i className="status-icon"></i> {produto.situacao}
                                            </span>
                                        </td>
                                        <td><button className="btn-painel btn-editar"><i className="bi bi-pencil-square"></i></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <aside className="content-card filtros-sidebar desktop-only">
                    <div className="content-card-header"><h4><i className="bi bi-funnel-fill"></i> Filtros</h4></div>
                    <div className="content-card-body">
                        <FiltrosForm />
                    </div>
                </aside>
            </div>

            <div className={`filtros-mobile-wrapper ${isFilterPanelOpen ? 'is-open' : ''}`}>
                <div className="filtros-overlay" onClick={onCloseFilters}></div>
                <div className="filtros-mobile-panel">
                    <div className="filtros-mobile-header">
                        <h4>Filtros</h4>
                        <button onClick={onCloseFilters} className="btn-close-filters"><i className="bi bi-x-lg"></i></button>
                    </div>
                    <div className="filtros-mobile-body">
                         <FiltrosForm />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaProdutos;