import './NotFoundError.css';
import { Link } from 'react-router-dom';

export default function NotFoundError() {
    return (
        // <section className="error">
        <section className='error__container'>
            <h2 className='error__title'>404</h2>
            <p className='error__subtitle'>Страница не найдена</p>
            <Link to='/' className="error__link">Назад</Link>
        </section>
        // </section>
    )
}
