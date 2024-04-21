import './SearchForm.css';
import { useCtx } from '../Context/Context';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchForm() {
    const { pathname } = useLocation();
    const [movieSearchInput, setMovieSearchInput] = useState('');
    const [movieSavedSearchInput, setMovieSavedSearchInput] = useState('');
    const { searchValue, setSearchValue, searchValueSaved, setsearchValueSaved } = useCtx();

    useEffect(() => {
        if (pathname === '/movies') {
            setMovieSearchInput(searchValue || '');
        } else {
            setMovieSavedSearchInput(searchValueSaved || '');
        }
    }, [pathname, searchValue, searchValueSaved]);

    const handleMovieSearchChange = (e) => {
        setMovieSearchInput(e.target.value);
    };

    const handleMovieSavedSearchChange = (e) => {
        setMovieSavedSearchInput(e.target.value);
    };

    const handleMovieSubmit = (e) => {
        e.preventDefault();
        setSearchValue(movieSearchInput);
        localStorage.setItem("searchValues", movieSearchInput);
    };

    const handleMovieSavedSubmit = (e) => {
        e.preventDefault();
        setsearchValueSaved(movieSavedSearchInput)
        localStorage.setItem("SearchValueSaved", movieSavedSearchInput);
    };

    return (
        <section className='search'>
            <div className='search__container'>
                {pathname === '/movies' ? (
                    <form className='search__form' noValidate onSubmit={handleMovieSubmit}>
                        <input
                            className='search__input'
                            type="text"
                            placeholder='Фильм'
                            value={movieSearchInput}
                            onChange={handleMovieSearchChange}
                        />
                        <button className='search__submit' type='submit'></button>
                    </form>
                ) : (
                    <form className='search__form' noValidate onSubmit={handleMovieSavedSubmit}>
                        <input
                            className='search__input'
                            type="text"
                            placeholder='Сохранённые фильмы'
                            value={movieSavedSearchInput}
                            onChange={handleMovieSavedSearchChange}
                        />
                        <button className='search__submit' type='submit'></button>
                    </form>
                )}
            </div>
        </section>
    );
}