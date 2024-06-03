import { createContext, useContext, useState, useMemo, useEffect, useCallback } from "react";
import { getToken, getCurrentUser, getEmail, getToggler, getSearchValues } from "../../utils/localStorage";
import apiMovies from '../../utils/MoviesApi';
import apiMain from "../../utils/MainApi";

const CurrentUserContext = createContext({})
export const useCtx = () => useContext(CurrentUserContext)

export const Context = ({ children }) => {
    const initialState = {
        success: false,
        searchedOnce: false,
        login: false,
        loading: false,
        serverError: false,
        isErrorSubmit: '',
        movies: JSON.parse(localStorage.getItem('movies')) || [],
        savedMovies: JSON.parse(localStorage.getItem('savedMovies')) || [],
        token: getToken('jwt'),
        currentUser: getCurrentUser('currentUser'),
        email: getEmail('email'),
        movieToggler: Boolean(getToggler('movieToggler')),
        savedMovieToggler: Boolean(getToggler('savedMovieToggler')),
        searchValue: getSearchValues('searchValues'),
        searchValueSaved: '',
        // searchFilterMovie: JSON.parse(localStorage.getItem('searchFilterMovie')) || [],
        isEditing: false,
    }

    const [state, setState] = useState(initialState);


    // const setSearchFilterMovie = (value) => {
    //     setState(prev => ({ ...prev, searchFilterMovie: value }))
    //     localStorage.setItem('searchFilterMovie', JSON.stringify(value));
    // }

    const setisEditing = (data) => {
        setState(prev => ({
            ...prev,
            isEditing: data,

        }))
    }

    const setSuccess = (data) => {
        setState(prev => ({
            ...prev,
            success: data
        }))
    }

    const setSearchedOnce = (bool) => {
        setState(prev => ({
            ...prev,
            searchedOnce: bool
        }))
    }

    const clearContextAndLocalStorage = () => {
        setState(initialState);
        localStorage.clear();
    }

    const setLogin = (valueBolean) => {
        setState(prev => ({ ...prev, login: valueBolean }))
    }

    const setToken = (token) => {
        setState(prev => ({ ...prev, token: token || null }))
    }
    const setsearchValueSaved = (value) => {
        setState(prev => ({ ...prev, searchValueSaved: value }))
    }

    const clearSearchValue = () => {
        setState(prev => ({
            ...prev,
            searchValueSaved: ''
        }))
    };

    const setSearchValue = (value) => {
        setState(prev => ({ ...prev, searchValue: value }))
        localStorage.setItem('searchValues', value);
    }

    const setUserData = (currentUser, email) => {
        setState(prev => ({
            ...prev,
            currentUser,
            email
        }))
    }

    const setMovies = (movies) => {
        setState(prev => ({ ...prev, movies }));
        localStorage.setItem('movies', JSON.stringify(movies));
    }


    const setSavedMovies = (data) => {
        setState(prev => ({ ...prev, savedMovies: data }));
        localStorage.setItem('savedMovies', JSON.stringify(data));
    }

    const setIsErrorSubmit = (value) => {
        setState(prev => ({ ...prev, isErrorSubmit: value, }));
    }

    const setLoading = (valueBolean) => {
        setState(prev => ({ ...prev, loading: valueBolean, }));
    }

    const MoviesFilerSaved = () => {
        setState(prev => ({
            ...prev,
            savedMovieToggler: !prev.savedMovieToggler
        }))
    }


    const MoviesFilter = () => {
        setState(prev => ({
            ...prev,
            movieToggler: !prev.movieToggler
        }))
        localStorage.setItem('movieToggler', JSON.stringify(!state.movieToggler))
    }



    // const loadMovies = async () => {
    //     setState(prev => ({ ...prev, loading: true, }))
    //     try {
    //         await Promise.all([apiMovies.getMovies(), apiMain.getMovies(state.token)])
    //             .then(([allMovies, userMovies]) => {
    //                 setState(prev => ({
    //                     ...prev,
    //                     movies: allMovies,
    //                     savedMovies: userMovies,
    //                     serverError: false,
    //                 }))
    //             })
    //     } catch (error) {
    //         setState(prev => ({ ...prev, serverError: true }))
    //         console.error(`Ошибка при загрузке фильмов ${error}`)
    //     } finally {
    //         setState(prev => ({ ...prev, loading: false, }))
    //     }
    // }
    const [searchFilterMovie, setSearchFilterMovie] = useState([])
    const [togleSearch, setTogleSearch] = useState([])

    const loadMovies = async (value) => {
        if (state.movies.length === 0 || state.savedMovies.length === 0) {
            setState(prev => ({ ...prev, loading: true, }))
            try {
                await Promise.all([apiMovies.getMovies(), apiMain.getMovies(state.token)])
                    .then(([allMovies, userMovies]) => {
                        setMovies(allMovies)
                        setSavedMovies(userMovies)
                        const SearchResult = allMovies.filter((movie) => movie.nameRU.toLowerCase().includes(value.toLowerCase()))
                        localStorage.setItem('searchFilterMovie', JSON.stringify(SearchResult));
                        setSearchFilterMovie(JSON.parse(localStorage.getItem('searchFilterMovie')))
                        const TogleSearchResult = SearchResult.filter((movie) => movie.duration <= 40)
                        localStorage.setItem('searchFilterMovieTogle', JSON.stringify(TogleSearchResult));
                        setTogleSearch(JSON.parse(localStorage.getItem('searchFilterMovieTogle')))

                        console.log(state.searchValue)
                    })
            } catch (error) {
                setState(prev => ({ ...prev, serverError: true }))
                console.error(`Ошибка при загрузке фильмов ${error}`)
            } finally {
                setState(prev => ({ ...prev, loading: false, }))
            }
        } else {
            const SearchResult = (JSON.parse(localStorage.getItem('movies'))).filter((movie) => movie.nameRU.toLowerCase().includes(value.toLowerCase()))
            localStorage.setItem('searchFilterMovie', JSON.stringify(SearchResult));
            setSearchFilterMovie(JSON.parse(localStorage.getItem('searchFilterMovie')))
            const TogleSearchResult = SearchResult.filter((movie) => movie.duration <= 40)
            localStorage.setItem('searchFilterMovieTogle', JSON.stringify(TogleSearchResult));
            setTogleSearch(JSON.parse(localStorage.getItem('searchFilterMovieTogle')))

        }
    }

    // const [filteredMoviesTogler, setFilteredMoviesTogler] = useState([]);

    // useEffect(() => {
    //     const result = state.movieToggler ? togleSearch : searchFilterMovie;
    //     setFilteredMoviesTogler(result);
    // }, [searchFilterMovie, togleSearch, state.movieToggler]);

    // const filteredMoviesTogler = useMemo(() => {
    //     return state.movieToggler ? togleSearch : searchFilterMovie
    // }, [searchFilterMovie, state.movieToggler, togleSearch])


    const filteredMovies = useMemo(() => {
        return state.movieToggler ? state.movies.filter((movie) => movie.duration <= 40) : state.movies
    }, [state.movies, state.movieToggler])



    const MoviesFilerSavedFalse = () => {
        setState(prev => ({
            ...prev,
            savedMovieToggler: false
        }))
    }

    const filteredSavedMovies = useMemo(() => {
        return state.savedMovieToggler ? state.savedMovies.filter((movie) => movie.duration <= 40) : state.savedMovies;
    }, [state.savedMovies, state.savedMovieToggler]);



    const toggleSuccsess = (str) => {
        setState(prev => ({
            ...prev,
            success: str
        }))
    }

    const value = {
        isEditing: state.isEditing,
        success: state.success,
        searchedOnce: state.searchedOnce,
        login: state.login,
        loading: state.loading,
        serverError: state.serverError,
        isErrorSubmit: state.isErrorSubmit,
        movies: state.movies,
        token: state.token,
        currentUser: state.currentUser,
        email: state.email,
        movieToggler: state.movieToggler,
        savedMovieToggler: state.savedMovieToggler,
        savedMovies: state.savedMovies,
        searchValue: state.searchValue,
        searchValueSaved: state.searchValueSaved,
        // searchFilterMovie: state.searchFilterMovie,
        filteredMovies,
        filteredSavedMovies,
        searchFilterMovie,
        // filteredMoviesTogler,
        togleSearch,
        // методы:
        setLogin,
        setToken,
        setUserData,
        loadMovies,
        MoviesFilter,
        setSavedMovies,
        setSearchValue,
        setsearchValueSaved,
        setIsErrorSubmit,
        setLoading,
        MoviesFilerSaved,
        clearContextAndLocalStorage,
        setMovies,
        clearSearchValue,
        MoviesFilerSavedFalse,
        toggleSuccsess,
        setSearchedOnce,
        setSuccess,
        setisEditing


    }


    return (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    )
}
