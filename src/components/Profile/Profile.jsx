import './Profile.css';
import { useEffect, useState } from 'react';
import Form from '../Form/Form.jsx';
import Input from '../Input/Input.jsx';
import Header from '../Header/Header.jsx';
import { useCtx } from '../Context/Context'
import { Link } from 'react-router-dom';


export default function Profile() {
    const { toggleSuccsess, isEditing, setisEditing, clearContextAndLocalStorage } = useCtx();
    // const [isEditing, setisEditing] = useState(false);
    const [isButtoneError, setisButtoneError] = useState(false);


    const handleSaveButton = () => {
        // setisEditing((prev) => !prev);
        setisButtoneError((prev) => !prev);
        toggleSuccsess('');

    };

    const setEdit = () => {
        setisEditing(true)
    }


    const currentUser = useCtx().currentUser;
    const email = useCtx().email;

    const LogOut = () => {
        localStorage.clear();
        clearContextAndLocalStorage()
    }

    return (
        <>
            <Header type="black" />
            <main className='profile__main'>
                <h1 className='profile__title'>Привет, {currentUser}</h1>

                <Form className='profile__form' >
                    <Input
                        inputType='name'
                        name="Имя"
                        type="text"
                        inputValue={currentUser}
                        isEditing={isEditing}
                    />
                    <Input
                        inputType='email'
                        name="E-mail"
                        type="email"
                        inputValue={email}
                        isEditing={isEditing} />
                    {!isEditing ? (
                        <>
                            <a className='profile__button_edit' onClick={setEdit}> Редактировать </a>
                            <Link to='/' className='profile__subtitle_link' onClick={LogOut} >Выйти из аккаунта</Link>
                        </>
                    ) : (

                        <Input
                            inputType='edit'
                            onToggleEdit={handleSaveButton}
                            isEditing={isEditing}
                            isButtoneError={isButtoneError}
                        />)}


                </Form>
            </main>
            <footer className='profile__footer'></footer>
        </>
    )
}

