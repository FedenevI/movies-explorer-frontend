import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className='footer'>
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__subtitle">© 2024</p>
                <nav className="footer__nav">
                    <Link to='https://practicum.yandex.ru/' target='_blank' className="footte__link">Яндекс.Практикум</Link>
                    <Link to='https://github.com/FedenevI' target='_blank' className="footte__link">Github</Link>
                </nav>
            </div>
        </footer>
    )
}