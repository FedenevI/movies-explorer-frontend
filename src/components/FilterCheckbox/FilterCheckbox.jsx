
import './FilterCheckbox.css';
import { useCtx } from '../Context/Context';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function FilterCheckbox() {
    const { pathname } = useLocation()
    const { MoviesFilter, MoviesFilerSaved, movieToggler, savedMovieToggler, MoviesFilerSavedFalse } = useCtx();

    useEffect(() => {
        if (pathname === '/saved-movies') {
            MoviesFilerSavedFalse()
        }
    }, [pathname])

    const handleChange = () => {
        pathname === '/movies' ?
            MoviesFilter() :
            MoviesFilerSaved()
    }
    return (
        <div className='filter'>
            <label className="filter__label">
                <input
                    className="filter__checkbox"
                    type="checkbox"
                    checked={pathname === '/movies' ?
                        movieToggler : savedMovieToggler}
                    onChange={handleChange}
                />
                <span className="filter__slider"></span>
            </label>
            <p className="filter__name">Короткометражки</p>
        </div>
    )
}