import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './Main/Main.jsx';
import Movies from './Movies/Movies.jsx';
import NotFoundError from './NotFoundError/NotFoundError.jsx';
import Login from './Login/Login.jsx';
import Registration from './Registration/Registration.jsx';
import Profile from './Profile/Profile';

export default function App() {
  return (
    <div className="page__container">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Registration />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<Movies />} />
        <Route path='*' element={<NotFoundError />} />
      </Routes>
    </div>
  );
}


