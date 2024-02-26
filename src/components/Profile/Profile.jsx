import './Profile.css';
import { useState } from 'react';
import Form from '../Form/Form.jsx';
import Input from '../Input/Input.jsx';
import Header from '../Header/Header.jsx';

export default function Profile() {
    const [isEditing, setisEditing] = useState(false);
    const [isButtoneError, setisButtoneError] = useState(false);

    const handleSaveButton = () => {
        setisEditing((prev) => !prev);
        setisButtoneError(true);
    };

    return (
        <>
            <Header type="black" setLoggedIn={true} />
            <main className='profile'>
                <h1 className='profile__title'>Привет, Виталий!</h1>

                <Form className='profile__form' >
                    <Input
                        inputType='name'
                        name="Имя" type="text"
                        placeholder='Виталий'
                        isEditing={isEditing} />
                    <Input
                        inputType='email'
                        name="E-mail"
                        type="email"
                        placeholder='pochta@yandex.ru'
                        isEditing={isEditing} />
                    <Input
                        inputType='edit'
                        onToggleEdit={handleSaveButton}
                        isEditing={isEditing}
                        isButtoneError={isButtoneError}
                    />
                </Form>

            </main>
        </>
    )
}
