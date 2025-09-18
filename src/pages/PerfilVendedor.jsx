import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link
import ListaProdutos from '../componentes/ListaProdutos.jsx';
import FormularioProduto from '../componentes/FormularioProduto.jsx';

// Componentes de placeholder para as outras telas
const PlaceholderView = ({ title }) => (
    <div className="painel-placeholder">
        <h2>{title}</h2>
        <p>Esta área será implementada futuramente.</p>
    </div>
);


function PerfilVendedor() {
    const [view, setView] = useState('produtos');

    const renderView = () => {
        switch (view) {
            case 'produtos':
                return <ListaProdutos onNavigateToForm={() => setView('cadastrar')} />;
            case 'cadastrar':
                return (
                    <>
                        <div className="painel-header">
                            <div>
                                <h2 className="painel-titulo">Cadastrar Produto</h2>
                                <nav className="breadcrumbs">
                                    <a href="#" onClick={() => setView('produtos')}>Produtos</a>
                                    <span>&gt;</span>
                                    <span>Cadastrar</span>
                                </nav>
                            </div>
                        </div>
                        <FormularioProduto />
                    </>
                );
            case 'pedidos':
                return <PlaceholderView title="Pedidos" />;
            case 'painel-de-controle':
                return <PlaceholderView title="Painel de Controle" />;
            default:
                return <PlaceholderView title="Página não encontrada" />;
        }
    };

    return (
        <div className="dashboard-layout">
            {/* Coluna 1: O Menu Lateral (Sidebar) */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    {/* LOGO AGORA É CLICÁVEL E LEVA PARA A HOME */}
                    <Link to="/" className="sidebar-logo">
                        <h3>Doce Sabor</h3>
                    </Link>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        {/* ITEM: PAINEL DE CONTROLE */}
                        <li className={view === 'painel-de-controle' ? 'active' : ''}>
                            <button onClick={() => setView('painel-de-controle')}>
                                <i className="bi bi-speedometer2"></i> Painel de Controle
                            </button>
                        </li>

                        {/* ITEM: PEDIDOS (ANTES ERA MINHAS VENDAS) */}
                        <li className={view === 'pedidos' ? 'active' : ''}>
                            <button onClick={() => setView('pedidos')}>
                                <i className="bi bi-receipt"></i> Pedidos
                            </button>
                        </li>

                        {/* SEÇÃO: CATÁLOGO COM SUB-MENU */}
                        <li className="has-submenu">
                            <a><i className="bi bi-tag-fill"></i> Catálogo</a>
                            <ul className="submenu">
                                <li className={view === 'produtos' || view === 'cadastrar' ? 'active' : ''}>
                                    <button onClick={() => setView('produtos')}>
                                        <i className="bi bi-box-seam"></i> Produtos
                                    </button>
                                </li>
                            </ul>
                        </li>

                        {/* ITEM: FILTROS (EXEMPLO DE ITEM NÃO FUNCIONAL) */}
                        <li className="disabled">
                            <button disabled><i className="bi bi-funnel"></i> Filtros</button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Coluna 2: A Área de Conteúdo Principal */}
            <div className="dashboard-main-content">
                <header className="dashboard-header">
                    <div className="header-left">
                        <i className="bi bi-list"></i>
                    </div>
                    <div className="header-right">
                        <div className="user-menu">
                            <img src="/assets/img/foto/foto.png" alt="Avatar do Vendedor" className="user-avatar" />
                            <span>Vendedor</span>
                            <i className="bi bi-caret-down-fill"></i>
                        </div>
                        <a href="#" className="logout-link">
                            <i className="bi bi-box-arrow-right"></i> Sair
                        </a>
                    </div>
                </header>

                <main className="dashboard-content">
                    {renderView()}
                </main>
            </div>
        </div>
    );
}

export default PerfilVendedor;