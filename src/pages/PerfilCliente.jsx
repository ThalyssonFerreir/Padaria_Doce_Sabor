import React, { useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { confirmAlert } from 'react-confirm-alert';

import '../assets/css/perfil-cliente.css';


const API_URL = 'http://localhost:3000';


const HistoricoPedidosCliente = () => {

    const [pedidos, setPedidos] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchPedidos = async () => {

            const token = localStorage.getItem('token');

            try {

                const response = await fetch(`${API_URL}/api/pedidos/meus`, {

                    headers: { 'Authorization': `Bearer ${token}` }

                });

                if (!response.ok) throw new Error('Falha ao buscar histórico de pedidos.');

                const data = await response.json();

                setPedidos(data);

            } catch (error) {

                toast.error(error.message);

            } finally {

                setLoading(false);

            }

        };

        fetchPedidos();

    }, []);


    if (loading) return <div className="content-card"><p>Carregando histórico de pedidos...</p></div>;


    return (

        <div className="content-card">

            <h2>Histórico de Pedidos</h2>

            {pedidos.length === 0 ? (

                <p>Você ainda não fez nenhum pedido.</p>

            ) : (

                <div className="lista-pedidos">

                    {pedidos.map(pedido => (

                        <div key={pedido.id} className="pedido-card">

                            <div className="pedido-header">

                                <div>

                                    <strong>Pedido #{pedido.id}</strong>

                                    <small>{new Date(pedido.createdAt).toLocaleDateString('pt-BR')}</small>

                                </div>

                                <div className="pedido-total">

                                    <span>TOTAL</span>

                                    <strong>R$ {pedido.valorTotal.toFixed(2).replace('.', ',')}</strong>

                                </div>

                            </div>

                            <ul className="pedido-itens">

                                {pedido.itens.map(item => (

                                    <li key={item.id}>

                                        <img src={item.produto.imagemUrl ? `${API_URL}/${item.produto.imagemUrl}`: 'https://via.placeholder.com/40'} alt={item.produto.nome} />

                                        <span>{item.quantidade}x {item.produto.nome}</span>

                                        <span>R$ {(item.precoUnitario * item.quantidade).toFixed(2).replace('.', ',')}</span>

                                    </li>

                                ))}

                            </ul>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

};


function PerfilCliente() {

    const [user, setUser] = useState(null);

    const [view, setView] = useState('pedidos');

    const [avatarSrc, setAvatarSrc] = useState('/assets/img/foto/foto.png');

    const fileInputRef = useRef(null);

    const navigate = useNavigate();


    useEffect(() => {

        const userDataString = localStorage.getItem('user');

        if (userDataString) {

            const parsedUser = JSON.parse(userDataString);

            setUser(parsedUser);

            if (parsedUser.avatarUrl) {

                setAvatarSrc(`${API_URL}/${parsedUser.avatarUrl}`);

            }

        } else {

            navigate('/login');

        }

    }, [navigate]);


    const handleTrocarFotoClick = () => {

        fileInputRef.current.click();

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

            if (!response.ok) throw new Error(data.error || 'Falha no upload da imagem.');

            const newAvatarUrl = `${API_URL}/${data.avatarUrl}`;

            setAvatarSrc(newAvatarUrl);

            const updatedUser = { ...user, avatarUrl: data.avatarUrl };

            localStorage.setItem('user', JSON.stringify(updatedUser));

            setUser(updatedUser);

            toast.success('Foto de perfil atualizada com sucesso!');

        } catch (error) {

            toast.error(error.message);

            setAvatarSrc(user.avatarUrl ? `${API_URL}/${user.avatarUrl}` : '/assets/img/foto/foto.png');

        }

    };


    const handleLogout = () => {

        confirmAlert({

            title: 'Confirmar Saída',

            message: 'Você tem certeza que deseja sair?',

            buttons: [

                {

                    label: 'Sim',

                    onClick: () => {

                        localStorage.removeItem('token');

                        localStorage.removeItem('user');

                        navigate('/');

                    }

                },

                { label: 'Não' }

            ]

        });

    };


    if (!user) {

        return <div className="container" style={{padding: '80px 0', textAlign: 'center'}}><h2>Carregando perfil...</h2></div>;

    }


    const renderContent = () => {

        switch (view) {

            case 'dados':

                return (

                    <div className="content-card">

                        <h2>Meus Dados</h2>

                        <div className="dado-usuario">

                            <strong>Nome:</strong>

                            <span>{user.nome}</span>

                        </div>

                        <div className="dado-usuario">

                            <strong>Email:</strong>

                            <span>{user.email}</span>

                        </div>

                        <div className="dado-usuario">

                            <strong>Tipo de Conta:</strong>

                            <span>{user.role}</span>

                        </div>

                    </div>

                );

            case 'pedidos':

                return <HistoricoPedidosCliente />;

            default:

                return null;

        }

    };


    return (

        <section id="perfil-cliente" className="perfil-cliente-section">

            <div className="container">

                <div className="section-header">

                    <h2>Minha Conta</h2>

                    <p>Gerencie suas informações e veja seus pedidos.</p>

                </div>

                <div className="perfil-container">

                    <aside className="perfil-sidebar">

                        <div className="perfil-header">

                            <div className="perfil-avatar-container">

                                <img

                                    src={avatarSrc}

                                    alt="Avatar"

                                    className="perfil-avatar"

                                />

                                <div className="avatar-overlay" onClick={handleTrocarFotoClick}>

                                    <i className="bi bi-camera-fill"></i>

                                    <span>Trocar</span>

                                </div>

                            </div>

                            <input

                                type="file"

                                ref={fileInputRef}

                                onChange={handleFileChange}

                                accept="image/png, image/jpeg"

                                style={{ display: 'none' }}

                            />

                            <h3>{user.nome}</h3>

                        </div>

                        <ul className="perfil-nav">

                            <li>

                                <button onClick={() => setView('dados')} className={view === 'dados' ? 'active' : ''}>

                                    <i className="bi bi-person-lines-fill"></i> Meus Dados

                                </button>

                            </li>

                            <li>

                                <button onClick={() => setView('pedidos')} className={view === 'pedidos' ? 'active' : ''}>

                                    <i className="bi bi-receipt"></i> Histórico de Pedidos

                                </button>

                            </li>

                            <li className="nav-divider"></li>

                            <li>

                                <button onClick={handleLogout}>

                                    <i className="bi bi-box-arrow-right"></i> Sair

                                </button>

                            </li>

                        </ul>

                    </aside>

                    <main className="perfil-content">

                        {renderContent()}

                    </main>

                </div>

            </div>

        </section>

    );

}


export default PerfilCliente;