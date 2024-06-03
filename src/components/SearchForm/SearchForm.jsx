import './SearchForm.css';
import { useCtx } from '../Context/Context';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


export default function SearchForm() {
    const { pathname } = useLocation();
    const [movieSearchInput, setMovieSearchInput] = useState('');
    const [error, setError] = useState('');
    const { setSearchValue, setsearchValueSaved, clearSearchValue, filteredMovies, loadMovies, searchedOnce, setSearchedOnce } = useCtx();

    useEffect(() => {
        if (pathname === '/movies') {
            setMovieSearchInput(localStorage.getItem('searchValues') || '');
        } else if (pathname === '/saved-movies') {
            setMovieSearchInput('');
            clearSearchValue();
        }
    }, [pathname]);

    const handleMovieSearchChange = (e) => {
        setMovieSearchInput(e.target.value);
        setError('');
    };


    const handleMovieSubmit = async (e) => {
        e.preventDefault();
        if (!movieSearchInput.trim()) {
            setError('Нужно ввести ключевое слово');
        }
        if (pathname === '/movies') {
            setSearchValue(movieSearchInput)
            loadMovies(movieSearchInput)
        } else if (pathname === '/saved-movies') {
            setsearchValueSaved(movieSearchInput)
        }
    };



    return (
        <section className='search'>
            <div className='search__container'>
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
                {error && <p className='search__error'>{error}</p>}
            </div>
        </section>
    );
}