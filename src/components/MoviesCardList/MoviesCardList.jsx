import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import { useEffect, useState } from 'react';
import { useCtx } from '../Context/Context.jsx';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList() {
    const { pathname } = useLocation();
    const { filteredMovies, filteredSavedMovies, searchValue, searchValueSaved, serverError, loading } = useCtx();

    const [countMovies, setCountMovies] = useState(0);
    function shownCount() {
        const display = window.innerWidth
        if (display > 1180) {
            setCountMovies(12)
        } else if (display > 767) {
            setCountMovies(8)
        } else {
            setCountMovies(5)
        }
    }

    useEffect(() => {
        shownCount()
    }, [])

    const resizeAction = () => {
        setTimeout(() => {
            shownCount();
        }, 500);
    }

    useEffect(() => {
        shownCount();
        window.addEventListener('resize', resizeAction)
        return () => {
            document.removeEventListener("resize", resizeAction);
        };
    }, []);

    function showMore() {
        const display = window.innerWidth
        if (display > 1180) {
            setCountMovies(countMovies + 3)
        } else if (display > 767) {
            setCountMovies(countMovies + 2)
        } else {
            setCountMovies(countMovies + 2)
        }
    }

    useEffect(() => {
        localStorage.setItem('movies', JSON.stringify(filteredMovies));
        localStorage.setItem('savedMovies', JSON.stringify(filteredSavedMovies));
    }, [filteredMovies, filteredSavedMovies]);

    // const searchFilterMovie = filteredMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()))

    const searchFilterMovie = JSON.parse(localStorage.getItem('searchFilterMovie'))


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
                                        .slice(0, countMovies)
                                        .map(movies => (
                                            <li className='element' key={movies.id}>
                                                <MoviesCard  {...movies} />
                                            </li>
                                        ))}
                                </ul>
                                {countMovies < searchFilterMovie.length && (
                                    <button type="button" onClick={showMore} className='elements__more'>Ещё</button>
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



