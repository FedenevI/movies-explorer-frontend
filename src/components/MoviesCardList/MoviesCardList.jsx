import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import { useEffect, useState } from 'react';
import { useCtx } from '../Context/Context.jsx';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList() {
    const { pathname } = useLocation();
    const { loadMovies, filteredMovies, filteredSavedMovies, searchValue, searchValueSaved, serverError, loading } = useCtx();
    const [shownImages, setShownImages] = useState(0);
    const [cardsPerRow, setCardsPerRow] = useState(0);

    const handleResize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1023) {
            setShownImages(12);
            setCardsPerRow(4);
        } else if (screenWidth >= 767) {
            setShownImages(8);
            setCardsPerRow(4);
        } else {
            setShownImages(5);
            setCardsPerRow(1);
        }
    };

    const handleShowImage = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1023) {
            setShownImages(prevCount => prevCount + 3);
        } else if (screenWidth >= 767) {
            setShownImages(prevCount => prevCount + 2);
        } else {
            setShownImages(prevCount => prevCount + 2);
        }
    };

    useEffect(() => {
        loadMovies();
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('movies', JSON.stringify(filteredMovies));
        localStorage.setItem('savedMovies', JSON.stringify(filteredSavedMovies));
    }, [filteredMovies, filteredSavedMovies]);

    const searchFilterMovie = filteredMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()))
    const searchFilterMovieSaved = filteredSavedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchValueSaved.toLowerCase()))

    return (
        <section className="elements">
            {pathname === '/movies' ? (
                loading ? (
                    <Preloader />
                ) : (
                    <>
                        {(searchValue === '') ? (
                            <p className="elements__error">Чтобы увидеть список фильмов, выполните поиск</p>
                        ) : serverError ? (
                            <p className="elements__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.</p>
                        ) : searchFilterMovie.length === 0 ? (
                            <p className="elements__error">Ничего не найдено</p>
                        ) : (
                            <>
                                <ul className="elements__list">
                                    {searchFilterMovie
                                        .slice(0, shownImages)
                                        .map(movies => (
                                            <li className='element' key={movies.id}>
                                                <MoviesCard  {...movies} />
                                            </li>
                                        ))}
                                </ul>
                                {shownImages < searchFilterMovie.length && (
                                    <button type="button" onClick={handleShowImage} className='elements__more'>Ещё</button>
                                )}
                            </>
                        )}
                    </>
                )
            ) : (
                loading ? (
                    <Preloader />
                ) : (
                    <>
                        {serverError ? (
                            <p className="elements__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.</p>
                        ) : searchFilterMovieSaved.length === 0 ? (
                            <p className="elements__error">Нет сохранённых фильмов</p>
                        ) : searchFilterMovieSaved.length === 0 ? (
                            <p className="elements__error">Ничего не найдено</p>
                        ) : (
                            <ul className="elements__list">
                                {searchFilterMovieSaved
                                    .slice(0, shownImages)
                                    .map(movies => (
                                        <li className='element' key={movies._id}>
                                            <MoviesCard  {...movies} />
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </>)
            )}
        </section>
    )

}



