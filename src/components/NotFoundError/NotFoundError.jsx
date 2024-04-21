import './NotFoundError.css';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFoundError() {
    const navigate = useNavigate();
    function handleClick() {
        navigate(-1);
    }

    return (
        <>
            <section className='error__container'>
                <h2 className='error__title'>404</h2>
                <p className='error__subtitle'>Страница не найдена</p>
                <Link className="error__link" onClick={handleClick}>Назад</Link>
            </section >
        </>
    )
}
