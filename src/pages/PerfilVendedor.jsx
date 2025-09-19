import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListaProdutos from '../componentes/ListaProdutos.jsx';
import FormularioProduto from '../componentes/FormularioProduto.jsx';
import '../assets/css/DashboardForm.css';

const PlaceholderView = ({ title }) => (
    <div className="painel-placeholder">
        <h2>{title}</h2>
        <p>Esta área será implementada futuramente.</p>
    </div>
);

function PerfilVendedor() {
    const [view, setView] = useState('produtos');
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const fileInputRef = useRef(null);
    const [avatarSrc, setAvatarSrc] = useState('/assets/img/foto/foto.png');

    useEffect(() => {
        return () => {
            if (avatarSrc.startsWith('blob:')) {
                URL.revokeObjectURL(avatarSrc);
            }
        };
    }, [avatarSrc]);

    const handleTrocarFotoClick = () => {
        fileInputRef.current.click();
        setIsProfileMenuOpen(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newAvatarUrl = URL.createObjectURL(file);
            setAvatarSrc(newAvatarUrl);
            console.log("Arquivo selecionado para futuro upload:", file);
        }
    };

    const handleMenuNavigation = (newView) => {
        setView(newView);
        setIsProfileMenuOpen(false);
    };

    const renderView = () => {
        switch (view) {
            case 'produtos':
                return <ListaProdutos onNavigateToForm={() => setView('cadastrar')} />;
            case 'cadastrar':
                return <FormularioProduto onCancel={() => setView('produtos')} />;
            case 'pedidos':
                return <PlaceholderView title="Pedidos" />;
            case 'meu-perfil':
                return <PlaceholderView title="Meu Perfil" />;
            default:
                return <ListaProdutos onNavigateToForm={() => setView('cadastrar')} />;
        }
    };

    return (
        <div className="dashboard-layout">
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <Link to="/" className="sidebar-logo">
                        <h3>Doce Sabor</h3>
                    </Link>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className={view === 'pedidos' ? 'active' : ''}>
                            <button onClick={() => setView('pedidos')}>
                                <i className="bi bi-receipt"></i> Pedidos
                            </button>
                        </li>
                        <li className={view === 'produtos' || view === 'cadastrar' ? 'active' : ''}>
                            <button onClick={() => setView('produtos')}>
                                <i className="bi bi-box-seam"></i> Produtos
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            <div className="dashboard-main-content">
                <header className="dashboard-header">
                    <div className="header-left">
                        <i className="bi bi-list"></i>
                    </div>
                    <div className="header-right">
                        <div className="user-menu-container">
                            <button className="user-menu" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                                <img src={avatarSrc} alt="Avatar do Vendedor" className="user-avatar" />
                                <span>Vendedor</span>
                                <i className={`bi bi-caret-down-fill ${isProfileMenuOpen ? 'open' : ''}`}></i>
                            </button>
                            
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                accept="image/png, image/jpeg"
                            />

                            {isProfileMenuOpen && (
                                <ul className="profile-dropdown-menu">
                                    <li><button onClick={() => handleMenuNavigation('meu-perfil')}><i className="bi bi-person-circle"></i> Meu Perfil</button></li>
                                    <li><button onClick={handleTrocarFotoClick}><i className="bi bi-image"></i> Trocar Foto</button></li>
                                    <li className="divider"></li>
                                    <li><Link to="/" onClick={() => setIsProfileMenuOpen(false)}><i className="bi bi-box-arrow-right"></i> Sair</Link></li>
                                </ul>
                            )}
                        </div>
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