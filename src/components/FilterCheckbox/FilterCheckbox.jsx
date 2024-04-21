
import './FilterCheckbox.css';
import { useCtx } from '../Context/Context';

export default function FilterCheckbox() {
    const { MoviesFilter, toggler } = useCtx();
    const handleChange = () => {
        MoviesFilter();
    }
    return (
        <div className='filter'>
            <label className="filter__label">
                <input
                    className="filter__checkbox"
                    type="checkbox"
                    checked={toggler}
                    onChange={handleChange}
                />
                <span className="filter__slider"></span>
            </label>
            <p className="filter__name">Короткометражки</p>
        </div>
    )
}