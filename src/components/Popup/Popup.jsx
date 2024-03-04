import './Popup.css';
import { Link, useLocation } from 'react-router-dom';

export default function PopUp({ isClose }) {
    const { pathname } = useLocation();

    return (
        <>
            <div className="popup">
                <button className='popup__close' onClick={isClose} />
                <nav className='popup__navigate'>
                    <ul className='popup__links'>
                        <Link to='/' className={pathname === '/' ? "popup__link popup__link_active" : "popup__link"} onClick={isClose}>Главная</Link>
                        <Link to='/movies' className={pathname === '/movies' ? "popup__link popup__link_active" : "popup__link"} onClick={isClose}>Фильмы</Link>
                        <Link to='/saved-movies' className={pathname === '/saved-movies' ? "popup__link popup__link_active" : "popup__link"} onClick={isClose}>Сохранённые фильмы</Link>
                    </ul>
                    <Link to='/profile' className='header__account_popup' onClick={isClose}>
                        <p className='header__name'>Аккаунт</p>
                        <div className='header__icon header__icon-black' />
                    </Link>
                </nav>
            </div>
            <div className="pupup__overlay" />
        </>
    )
}