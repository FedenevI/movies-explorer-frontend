import './Portfolio.css';
import { Link } from 'react-router-dom';

export default function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <nav className="portfolio__nav">
                <ul className='portfolio__lists'>
                    <li className='portfolio__list'>
                        <Link to='https://github.com/FedenevI/how-to-learn' target='_blank' className='portfolio__link'>
                            <p className='portfolio__subtitle'>Статичный сайт</p>
                            <div className='portfolio__button'></div>
                        </Link>
                    </li>
                    <li className='portfolio__list'>
                        <Link to='https://github.com/FedenevI/russian-travel' target='_blank' className='portfolio__link'>
                            <p className='portfolio__subtitle'>Адаптивный сайт</p>
                            <div className='portfolio__button'></div>
                        </Link>
                    </li>
                    <li className='portfolio__list'>
                        <Link to='https://github.com/FedenevI/react-mesto-api-full-gha' target='_blank' className='portfolio__link portfolio__link_type_last'>
                            <p className='portfolio__subtitle'>Одностраничное приложение</p>
                            <div className='portfolio__button'></div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </section>
    )
}