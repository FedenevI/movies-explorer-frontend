import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm.jsx"
import Footer from "../Footer/Footer.jsx"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";

export default function Movies() {
    return (
        <>
            <Header type="black" setLoggedIn={true} />
            <main>
                <SearchForm />
                <FilterCheckbox />
                <MoviesCardList />
            </main>
            <Footer />
        </>
    )
}