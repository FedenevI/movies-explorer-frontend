import './Promo.css';
import logo from '../../images/pic__COLOR_landing-logo.svg';

export default function Promo() {
    return (
        <section className='promo'>
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <img className='promo__image' alt='логотип веб-разработка' src={logo} />
        </section>
    )
}