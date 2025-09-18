import React, { useState } from 'react'; // useEffect não é mais necessário para o filtro

const produtosDeExemplo = [
    { id: 1, imagemUrl: '/assets/img/imgsPadaria/pao1.png', nome: 'Pão 1', ID: '1', preco: 0.75, quantidade: 150, situacao: 'Em estoque' },
    { id: 2, imagemUrl: '/assets/img/imgsPadaria/pao2.png', nome: 'Pão 2', ID: '2', preco: 1.50, quantidade: 45, situacao: 'Em estoque' },
    { id: 3, imagemUrl: '/assets/img/imgsPadaria/pao3.png', nome: 'Pão 3', ID: '3', preco: 2.00, quantidade: 8, situacao: 'Estoque baixo' },
    { id: 4, imagemUrl: '/assets/img/imgsPadaria/salgado1.png', nome: 'Salgado 1', ID: '4', preco: 6.00, quantidade: 0, situacao: 'Sem estoque' },
    { id: 5, imagemUrl: '/assets/img/imgsPadaria/salgado2.png', nome: 'Salgado 2', ID: '5', preco: 12.00, quantidade: 12, situacao: 'Estoque baixo' },
    { id: 6, imagemUrl: '/assets/img/imgsPadaria/salgado3.png', nome: 'Salgado 3', ID: '6', preco: 7.50, quantidade: 994, situacao: 'Em estoque' },
    { id: 7, imagemUrl: '/assets/img/imgsPadaria/salgado4.png', nome: 'Salgado 4', ID: '7', preco: 7.50, quantidade: 1000, situacao: 'Em estoque' },
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
}

function ListaProdutos({ onNavigateToForm }) {
    // Estado para os valores dos inputs (o que o usuário digita)
    const [filtros, setFiltros] = useState({ produto: '', id: '', preco: '', situacao: '' });

    // Estado para a lista de produtos que realmente aparece na tela
    const [produtosFiltrados, setProdutosFiltrados] = useState(produtosDeExemplo);

    // Função para atualizar o estado dos filtros conforme o usuário digita
    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            [name]: value
        }));
    };

    // O useEffect FOI REMOVIDO. A lógica de filtro agora está aqui:
    const handleAplicarFiltros = (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        let produtosData = [...produtosDeExemplo];

        // Aplica cada filtro um por um
        if (filtros.produto) {
            produtosData = produtosData.filter(p => p.nome.toLowerCase().includes(filtros.produto.toLowerCase()));
        }
        if (filtros.id) {
            produtosData = produtosData.filter(p => p.ID.toString().includes(filtros.id.toString()));
        }
        if (filtros.preco) {
            produtosData = produtosData.filter(p => p.preco >= parseFloat(filtros.preco));
        }
        if (filtros.situacao) {
            produtosData = produtosData.filter(p => p.situacao === filtros.situacao);
        }

        // Atualiza a lista que é exibida na tela com os resultados do filtro
        setProdutosFiltrados(produtosData);
    };

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
                                    <th>ID <i className="bi bi-caret-down-fill"></i></th>
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
                <aside className="content-card filtros-sidebar">
                    <div className="content-card-header"><h4><i className="bi bi-funnel-fill"></i> Filtros</h4></div>
                    <div className="content-card-body">
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
                    </div>
                </aside>
            </div>
        </>
    );
}

export default ListaProdutos;