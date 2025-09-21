import React, { useState, useEffect, useRef } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useCart } from '../context/CartContext';


function Header() {

    const { cartItems } = useCart();

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const navigate = useNavigate();

    const location = useLocation();

    const [user, setUser] = useState(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);


    useEffect(() => {

        const userDataString = localStorage.getItem('user');

        if (userDataString) {

            setUser(JSON.parse(userDataString));

        } else {

            setUser(null);

        }

    }, [location.pathname]);


    useEffect(() => {

        function handleClickOutside(event) {

            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {

                setIsDropdownOpen(false);

            }

        }

        if (isDropdownOpen) {

            document.addEventListener("mousedown", handleClickOutside);

        }

        return () => {

            document.removeEventListener("mousedown", handleClickOutside);

        };

    }, [isDropdownOpen]);


    const handleLogout = () => {

        localStorage.removeItem('token');

        localStorage.removeItem('user');

        setUser(null);

        setIsDropdownOpen(false);

        navigate('/');

    };


    const handleMobileNavToggle = () => {

        document.body.classList.toggle('mobile-nav-active');

    };


    const handleNavigateAndScroll = (sectionId) => {

        if (location.pathname !== '/' && location.pathname !== '/homepage') {

            navigate('/');

        }

        document.body.classList.remove('mobile-nav-active');

        setTimeout(() => {

            const element = document.getElementById(sectionId);

            if (element) {

                element.scrollIntoView({ behavior: 'smooth', block: 'start' });

            } else if (sectionId === 'inicio') {

                window.scrollTo({ top: 0, behavior: 'smooth' });

            }

        }, 150);

    };


    return (

        <header id="header" className="header d-flex align-items-center sticky-top">

            <div className="container position-relative d-flex align-items-center justify-content-between">

                <Link to="/" className="logo d-flex align-items-center" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('inicio'); }}>

                    <img className="logoSite" src="/assets/img/imgsPadaria/PadariaLogo.webp" alt="Logo Doce Sabor" />

                    <h1 className="sitename">Doce <br />Sabor</h1>

                </Link>


                <nav id="navmenu" className="navmenu">

                    <ul>

                        <li><a href="#inicio" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('inicio'); }}>Inicio</a></li>

                        <li><a href="#sobre" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('sobre'); }}>Nossa História</a></li>

                        <li><a href="#cardapio" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('cardapio'); }}>Cardápio</a></li>

                        <li><a href="#kits" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('kits'); }}>Kit Festas</a></li>

                        <li><a href="#clientes" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('clientes'); }}>Nossos clientes</a></li>

                        <li><a href="#chefs" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('chefs'); }}>Nossos chefs</a></li>

                        <li><a href="#produtos" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('produtos'); }}>Nossos produtos</a></li>

                        <li><a href="#trabalhe-conosco" onClick={(e) => { e.preventDefault(); handleNavigateAndScroll('trabalhe-conosco'); }}>Trabalhe conosco</a></li>

                    </ul>

                </nav>


                <div className="cart-and-toggle d-flex align-items-center">

                    {user ? (

                        <div className="user-menu-container" ref={dropdownRef}>

                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="user-menu-trigger">

                                <img src={user.avatarUrl ? `http://localhost:3000/${user.avatarUrl}` : '/assets/img/foto/foto.png'} alt="Avatar" className="header-avatar" />

                                <span>{user.nome.split(' ')[0]}</span>

                                <i className={`bi bi-chevron-down transition-all ${isDropdownOpen ? 'rotate-180' : ''}`}></i>

                            </button>

                            {isDropdownOpen && (

                                <ul className="user-dropdown">

                                    <li>

                                        {user.role === 'VENDEDOR' ? (

                                            <Link to="/perfil-vendedor" onClick={() => setIsDropdownOpen(false)}>

                                                <i className="bi bi-speedometer2"></i> Meu Painel

                                            </Link>

                                        ) : (

                                            <Link to="/meu-perfil" onClick={() => setIsDropdownOpen(false)}>

                                                <i className="bi bi-person-circle"></i> Meu Perfil

                                            </Link>

                                        )}

                                    </li>

                                    <li className="dropdown-divider"></li>

                                    <li><button onClick={handleLogout}><i className="bi bi-box-arrow-right"></i> Sair</button></li>

                                </ul>

                            )}

                        </div>

                    ) : (

                        <Link to="/login" className="btn-book-a-table">Login / Cadastro</Link>

                    )}


                    <Link to="/carrinho" className="btn-book-a-table" style={{ marginLeft: '15px' }}>

                        <i className="bi bi-cart"></i>

                        <span className="cart-text">Carrinho<br />({totalItems})</span>

                    </Link>

                    <i className="mobile-nav-toggle d-xl-none bi bi-list" onClick={handleMobileNavToggle}></i>

                </div>

            </div>

        </header>

    );

}


export default Header;