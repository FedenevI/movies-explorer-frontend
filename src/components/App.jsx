import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './Main/Main.jsx';
import Movies from './Movies/Movies.jsx';
import NotFoundError from './NotFoundError/NotFoundError.jsx';
import Login from './Login/Login.jsx';
import Registration from './Registration/Registration.jsx';
import Profile from './Profile/Profile';
import { useCtx } from './Context/Context.jsx';
import { Navigate } from 'react-router-dom';

export default function App() {
  let token = useCtx().token

  return (
    <div className="page__container">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signin' element={!token ? <Login /> : <Navigate to="/movies" />} />
        <Route path='/signup' element={!token ? <Registration /> : <Navigate to="/movies" />} />
        <Route path='/profile' element={token ? <Profile /> : <Navigate to="/" />} />
        <Route path='/movies' element={token ? <Movies /> : <Navigate to="/" />} />
        <Route path='/saved-movies' element={token ? <Movies /> : <Navigate to="/" />} />
        <Route path='*' element={<NotFoundError />} />
      </Routes>
    </div>
  );
}
