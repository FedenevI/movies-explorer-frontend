import './Movies.css'
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm.jsx"
import Footer from "../Footer/Footer.jsx"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";
import { useCtx } from '../Context/Context.jsx';


export default function Movies() {
    return (
        <>
            <Header type="black" />
            <main className="movies">
                <SearchForm />
                <FilterCheckbox />
                <MoviesCardList />
            </main>
            <Footer />
        </>
    )
}