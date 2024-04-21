import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { getToken, getCurrentUser, getEmail, getToggler, getSearchValues, getSearchValueSaved } from "../../utils/localStorage";
import apiMovies from '../../utils/MoviesApi';
import apiMain from "../../utils/MainApi";

const CurrentUserContext = createContext({})

export const useCtx = () => useContext(CurrentUserContext)

export const Context = ({ children }) => {
    const [state, setState] = useState({
        loading: false,
        serverError: false,
        isErrorSubmit: '',
        movies: [],
        savedMovies: [],
        token: getToken('jwt'),
        currentUser: getCurrentUser('currentUser'),
        email: getEmail('email'),
        toggler: Boolean(getToggler('toggler')),
        searchValue: getSearchValues('searchValues'),
        searchValueSaved: getSearchValueSaved('SearchValueSaved')
    })

    console.log(state)

    const setToken = (token) => {
        setState(prev => ({ ...prev, token: token || null }))
    }
    const setsearchValueSaved = (value) => {
        setState(prev => ({ ...prev, searchValueSaved: value }))
    }

    const setSearchValue = (value) => {
        setState(prev => ({ ...prev, searchValue: value }))
    }

    const setUserData = (currentUser, email) => {
        setState(prev => ({
            ...prev,
            currentUser,
            email
        }))
    }

    const setSavedMovies = (data) => {
        setState(prev => ({ ...prev, savedMovies: data }));
    }

    const setIsErrorSubmit = (value) => {
        setState(prev => ({ ...prev, isErrorSubmit: value, }));
    }

    const setLoading = (valueBolean) => {
        setState(prev => ({ ...prev, loading: valueBolean, }));
    }

    const loadMovies = async () => {
        setState(prev => ({ ...prev, loading: true, }))
        try {
            await Promise.all([apiMovies.getMovies(), apiMain.getMovies(state.token)])
                .then(([allMovies, userMovies]) => {
                    console.log(userMovies)
                    setState(prev => ({
                        ...prev,
                        movies: allMovies,
                        savedMovies: userMovies,
                        serverError: false,
                    }))
                })
        } catch (error) {
            setState(prev => ({ ...prev, serverError: true }))
            console.error(`Ошибка при загрузке фильмов ${error}`)
        } finally {
            setState(prev => ({ ...prev, loading: false, }))
        }
    }

    const MoviesFilter = () => {
        setState(prev => ({
            ...prev,
            toggler: !prev.toggler
        }))
        localStorage.setItem('toggler', JSON.stringify(!state.toggler))
    }

    const filteredMovies = useMemo(() => {
        return state.toggler ? state.movies.filter((movie) => movie.duration <= 40) : state.movies
    }, [state.movies, state.toggler])

    const filteredSavedMovies = useMemo(() => {
        return state.toggler ? state.savedMovies.filter((movie) => movie.duration <= 40) : state.savedMovies;
    }, [state.savedMovies, state.toggler]);



    const value = {
        loading: state.loading,
        serverError: state.serverError,
        isErrorSubmit: state.isErrorSubmit,
        movies: state.movies,
        token: state.token,
        currentUser: state.currentUser,
        email: state.email,
        toggler: state.toggler,
        savedMovies: state.savedMovies,
        searchValue: state.searchValue,
        searchValueSaved: state.searchValueSaved,
        filteredMovies,
        filteredSavedMovies,
        // методы:
        setToken,
        setUserData,
        loadMovies,
        MoviesFilter,
        setSavedMovies,
        setSearchValue,
        setsearchValueSaved,
        setIsErrorSubmit,
        setLoading,
    }


    return (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    )
}
