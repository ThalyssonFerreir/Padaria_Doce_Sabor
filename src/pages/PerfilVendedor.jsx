import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ListaProdutos from '../componentes/ListaProdutos.jsx';
import FormularioProduto from '../componentes/FormularioProduto.jsx';
import ListaPedidos from '../componentes/ListaPedidos.jsx'; // Importando o novo componente
import '../assets/css/DashboardForm.css';
import '../assets/css/Dashboard.css';

const API_URL = 'http://localhost:3000';

// Este é um componente simples para seções ainda não implementadas
const PlaceholderView = ({ title }) => (
    <div className="painel-placeholder">
        <h2>{title}</h2>
        <p>Esta área será implementada futuramente.</p>
    </div>
);

function PerfilVendedor() {
    const [view, setView] = useState('pedidos'); // Inicia na aba de pedidos
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const fileInputRef = useRef(null);
    const [usuario, setUser] = useState(null);
    const [avatarSrc, setAvatarSrc] = useState('/assets/img/foto/foto.png');
    const [productUpdateKey, setProductUpdateKey] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [produtoParaEditar, setProdutoParaEditar] = useState(null);
    const dropdownRef = useRef(null); // Adicionado para o menu dropdown

    useEffect(() => {
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
            const parsedUser = JSON.parse(userDataString);
            setUser(parsedUser);
            if (parsedUser.avatarUrl) {
                setAvatarSrc(`${API_URL}/${parsedUser.avatarUrl}`);
            }
        }
    }, []);

    // Efeito para fechar o dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        }
        if (isProfileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isProfileMenuOpen]);


    const handleTrocarFotoClick = () => {
        fileInputRef.current.click();
        setIsProfileMenuOpen(false);
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const previewUrl = URL.createObjectURL(file);
        setAvatarSrc(previewUrl);
        const formData = new FormData();
        formData.append('avatar', file);
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/api/usuarios/avatar`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Falha no upload.');
            const newAvatarUrl = `${API_URL}/${data.avatarUrl}`;
            setAvatarSrc(newAvatarUrl);
            const updatedUser = { ...usuario, avatarUrl: data.avatarUrl };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
        } catch (error) {
            console.error("Erro ao trocar foto:", error);
            setAvatarSrc(usuario.avatarUrl ? `${API_URL}/${usuario.avatarUrl}` : '/assets/img/foto/foto.png');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleProductSaved = () => {
        setProductUpdateKey(prevKey => prevKey + 1);
        setView('produtos');
        setProdutoParaEditar(null);
    };

    const handleNavigateToEditForm = (produto) => {
        setProdutoParaEditar(produto);
        setView('editar');
    };

    const handleNavigateToCreateForm = () => {
        setProdutoParaEditar(null);
        setView('cadastrar');
    }

    const navigateView = (newView) => {
        setView(newView);
        setIsSidebarOpen(false);
    };

    const renderView = () => {
        switch (view) {
            case 'produtos':
                return <ListaProdutos key={productUpdateKey} onNavigateToCreateForm={handleNavigateToCreateForm} onNavigateToEditForm={handleNavigateToEditForm} />;
            case 'cadastrar':
                return <FormularioProduto onCancel={() => navigateView('produtos')} onProductSaved={handleProductSaved} />;
            case 'editar':
                return <FormularioProduto onCancel={() => navigateView('produtos')} onProductSaved={handleProductSaved} produtoParaEditar={produtoParaEditar} />;
            case 'pedidos':
                return <ListaPedidos />; // Renderiza o novo componente
            default:
                return <PlaceholderView title="Página não encontrada" />;
        }
    };

    return (
        <div className={`dashboard-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <Link to="/" className="sidebar-logo"><h3>Doce Sabor</h3></Link>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className={view === 'pedidos' ? 'active' : ''}>
                            <button onClick={() => navigateView('pedidos')}><i className="bi bi-receipt"></i> Pedidos</button>
                        </li>
                        <li className={view === 'produtos' || view === 'cadastrar' || view === 'editar' ? 'active' : ''}>
                            <button onClick={() => navigateView('produtos')}><i className="bi bi-box-seam"></i> Produtos</button>
                        </li>
                    </ul>
                </nav>
            </aside>
            <div className="dashboard-main-content">
                <header className="dashboard-header">
                    <div className="header-left">
                        <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <i className="bi bi-list"></i>
                        </button>
                    </div>
                    <div className="header-right">
                        <div className="user-menu-container" ref={dropdownRef}>
                            <button className="user-menu" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                                <img src={avatarSrc} alt="Avatar do Vendedor" className="user-avatar" />
                                <span>{usuario ? usuario.nome : 'Vendedor'}</span>
                                <i className={`bi bi-caret-down-fill ${isProfileMenuOpen ? 'open' : ''}`}></i>
                            </button>
                            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept="image/png, image/jpeg" />
                            {isProfileMenuOpen && (
                                <ul className="profile-dropdown-menu">
                                    <li><button onClick={handleTrocarFotoClick}><i className="bi bi-image"></i> Trocar Foto</button></li>
                                    <li className="divider"></li>
                                    <li><button onClick={handleLogout}><i className="bi bi-box-arrow-right"></i> Sair</button></li>
                                </ul>
                            )}
                        </div>
                    </div>
                </header>
                <main className="dashboard-content">
                    {renderView()}
                </main>
            </div>
            <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
        </div>
    );
}

export default PerfilVendedor;