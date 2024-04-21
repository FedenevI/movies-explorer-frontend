import { useEffect, useState } from 'react';
import './Header.css';
import { Link, useLocation } from "react-router-dom";
import PopUp from '../Popup/Popup.jsx';
import { useCtx } from '../Context/Context';


export default function Header({ type }) {
    const { pathname } = useLocation();
    const token = useCtx().token;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(() => {
        if (window.innerWidth > 1023) {
            return 1024;
        } else {
            return 768;
        }
    });

    const handleMenuOpen = () => {
        setIsMenuOpen((prev) => !prev);
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <header className={`header ${type !== "green" ? 'header-black' : ''} `}>

                {!token ? (
                    <section className='header__logout'>
                        <Link to='/' className='header__logo' />
                        <nav className='header__auth'>
                            <Link to='/signup' className='header__link header__link_signup'>Регистрация</Link>
                            <Link to='/signin' className='header__link header__link_signin'>Войти</Link>
                        </nav>
                    </section>
                ) : (
                    <section className='header__login'>
                        <Link to='/' className='header__logo' />
                        {windowWidth < 1023 ? (
                            <button className='header__menu' onClick={handleMenuOpen} />
                        ) : (
                            <nav className='header__navigate'>
                                <div className='header__movies'>
                                    <Link to='/movies' className={`header__movie ${pathname === '/movies' ? 'header__active' : ''}`}>Фильмы</Link>
                                    <Link to='/saved-movies' className={`header__saved ${pathname === '/saved-movies' ? 'header__active' : ''} `}>Сохранённые фильмы</Link>
                                </div>
                                <Link to='/profile' className='header__account' href="#">
                                    <p className='header__name'>Аккаунт</p>
                                    <div className={`header__icon ${type === 'green' ? '' : 'header__icon-black'}`} />
                                </Link>
                            </nav>
                        )}
                    </section>
                )}
            </header>

            {isMenuOpen && (<PopUp isClose={handleMenuOpen} />
            )}
        </>
    )
}
