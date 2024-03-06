import './MoviesCard.css';
import imageCard from '../../images/pic__COLOR_pic.svg';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';


export default function MoviesCard() {
    const { pathname } = useLocation();

    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    return (
        <article>
            <img
                className="element__img"
                alt={`Изображение 33 слова о дизайне`}
                src={imageCard}
            />
            <div className={`element__description ${pathname === '/movies' ? 'element__description-gap' : ''}`}>
                <div className="element__sign">
                    <h2 className="element__title">{`33 слова о дизайне`}</h2>
                    {pathname === '/movies' ?
                        (
                            <button type='button' className={`element__like ${isLiked ? 'element__like_active' : ''}`}
                                onClick={handleLikeClick}>

                            </button>
                        ) : (

                            <button type='button' className='element__trash'></button>
                        )}
                </div>
                <p className='element__subtitle'>1ч 47м</p>
            </div>
        </article>
    )
}