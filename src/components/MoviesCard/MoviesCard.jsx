import './MoviesCard.css';
import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiMain from '../../utils/MainApi';
import { getToken } from '../../utils/localStorage';
import { useCtx } from '../Context/Context';

export default function MoviesCard({ duration, nameEN, nameRU, trailerLink, image, id, ...props }) {
    const { pathname } = useLocation();
    const { savedMovies, setSavedMovies } = useCtx();
    const [isLiked, setIsLiked] = useState(false);

    const isSaved = savedMovies.find(movie => movie.movieId === id)

    useEffect(() => {
        if (pathname === '/movies')
            setIsLiked(savedMovies.some(element => id === element.movieId))
    }, [savedMovies, id, setIsLiked, pathname, isSaved])

    function handleLike() {
        if (isLiked) {
            apiMain.deleteMovie(isSaved._id, getToken('jwt'))
                .then(res => {
                    setIsLiked(false)
                    const updatedMovies = savedMovies.filter(movie => movie._id !== isSaved._id);
                    setSavedMovies(updatedMovies);
                })
                .catch((err) => console.error(`Ошибка лайка ${err}`))
        } else {
            apiMain.addMovie({ duration, nameEN, nameRU, trailerLink, image, id, ...props }, getToken('jwt'))
                .then(res => {
                    setIsLiked(true)
                    setSavedMovies([...savedMovies, res]);
                })
                .catch((err) => console.error(`Ошибка лайка ${err}`))
        }
    }


    function deleteMovie() {
        apiMain.deleteMovie(props._id, getToken('jwt'))
            .then(res => {
                setIsLiked(false)
                const updatedMovies = savedMovies.filter(movie => movie._id !== props._id);
                setSavedMovies(updatedMovies);
            })
            .catch((err) => console.error(`Ошибка лайка ${err}`))
    }

    return (
        <article>
            <Link to={trailerLink} target="_blank">
                <img
                    className="element__img"
                    alt={`Изображение 33 слова о дизайне`}
                    src={pathname === '/saved-movies' ? `${image}` : `https://api.nomoreparties.co${image.url}`}
                />
            </Link>
            <div className={`element__description ${pathname === '/movies' ? 'element__description-gap' : ''}`}>
                <div className="element__sign">
                    <h2 className="element__title">{nameRU}</h2>
                    {pathname === '/movies' ?
                        (
                            <button type='button' className={`element__like ${isLiked ? 'element__like_active' : ''}`}
                                onClick={handleLike}>

                            </button>
                        ) : (

                            <button type='button' className='element__trash' onClick={deleteMovie}> </button>
                        )}
                </div>
                <p className='element__subtitle'>{duration < 60 ? `${duration % 60}м` : `${(duration / 60).toFixed()}ч ${duration % 60}м`}</p>
            </div>
        </article>
    )
}