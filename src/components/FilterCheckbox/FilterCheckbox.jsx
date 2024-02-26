import { useState } from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox() {

    const [isChecked, setIsChecked] = useState(false);
    const handleChange = () => {
        setIsChecked(!isChecked);
    }

    return (
        <div className='filter'>
            <label className="filter__label">
                <input
                    className="filter__checkbox"
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChange}
                />
                <span className="filter__slider"></span>
            </label>
            <p className="filter__name">Короткометражки</p>
        </div>
    )
}