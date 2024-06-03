import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import { useEffect, useMemo, useState } from 'react';
import { useCtx } from '../Context/Context.jsx';
import { useLocation } from 'react-router-dom';

function WidthWindow() {
    const [widthWindow, setWidthWindow] = useState(window.innerWidth);

    useEffect(() => {
        let tameOut;
        function handleResize() {
            clearTimeout(tameOut);
            tameOut = setTimeout(() => {
                setWidthWindow(window.innerWidth);
            }, 1000);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(tameOut);
        };

    }, [widthWindow]);

    return widthWindow;
}

export default function MoviesCardList() {
    const { pathname } = useLocation();
    const { filteredMovies, filteredSavedMovies, searchValue, searchValueSaved, serverError, loading, searchFilterMovie, filteredMoviesTogler, togleSearch, movieToggler } = useCtx();

    const movieAllIn = movieToggler ? togleSearch : searchFilterMovie;

    const width = WidthWindow();
    const [Count, setCount] = useState(0);

    const setting = useMemo(() => {
        if (width > 1279) {
            return { initial: 12, increment: 3 };
        } else if (width >= 634) {
            return { initial: 8, increment: 2 };
        } else if (width < 634) {
            return { initial: 5, increment: 2 };
        }
    }, [width]);

    useEffect(() => {
        setCount(Math.min(setting.initial, movieAllIn.length));

    }, [movieAllIn.length, setting.initial]);

    const ShowMore = () => {
        setCount((prevCount) =>
            Math.min(prevCount + setting.increment, movieAllIn.length)
        );

    };


    // const searchFilterMovie = filteredMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()))

    // const searchFilterMovie = JSON.parse(localStorage.getItem('searchFilterMovie'))

    const searchFilterMovieSaved = filteredSavedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchValueSaved.toLowerCase()))
    // console.log(countMovies)
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
                        ) : movieAllIn.length === 0 ? (
                            <p className="elements__error">Ничего не найдено</p>
                        ) : (
                            <>
                                <ul className="elements__list">
                                    {movieAllIn
                                        .slice(0, Count)
                                        .map(movies => (
                                            <li className='element' key={movies.id}>
                                                <MoviesCard  {...movies} />
                                            </li>
                                        ))}
                                </ul>
                                {Count < movieAllIn.length && (
                                    <button type="button" onClick={ShowMore} className='elements__more'>Ещё</button>
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