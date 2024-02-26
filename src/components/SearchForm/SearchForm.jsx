import './SearchForm.css';

export default function SearchForm() {
    return (
        <section className='search'>
            <div className='search__container'>
                <form className='search__form' noValidate>
                    <input
                        className='search__input'
                        type="text"
                        placeholder='Фильм'
                    />
                    <button className='search__submit'></button>
                </form>
            </div>
        </section>
    )
}