import './Popup.css';
import { Link } from 'react-router-dom';
export default function PopUp({ isClose }) {
    return (
        <>
            <div className="popup">
                <button className='popup__close' onClick={isClose} />
                <nav className='popup__navigate'>
                    <ul className='popup__links'>
                        <Link to='/' className='header__movie' onClick={isClose}>Главная</Link>
                        <Link to='/movies' className='header__movie' onClick={isClose}>Фильмы</Link>
                        <Link to='/saved-movies' className="header__saved" onClick={isClose}>Сохранённые фильмы</Link>
                    </ul>
                    <Link to='/profile' className='header__account' onClick={isClose}>
                        <p className='header__name'>Аккаунт</p>
                        <div className='header__icon' />
                    </Link>
                </nav>
            </div>
            <div className="pupup__overlay" />
        </>
    )
}