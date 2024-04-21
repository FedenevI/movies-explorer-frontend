import './Profile.css';
import { useState } from 'react';
import Form from '../Form/Form.jsx';
import Input from '../Input/Input.jsx';
import Header from '../Header/Header.jsx';
import { useCtx } from '../Context/Context'

export default function Profile() {
    const [isEditing, setisEditing] = useState(false);
    const [isButtoneError, setisButtoneError] = useState(false);


    const handleSaveButton = () => {
        setisEditing((prev) => !prev);
        setisButtoneError((prev) => !prev);
    };

    const currentUser = useCtx().currentUser;
    const email = useCtx().email;



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
                    <Input
                        inputType='edit'
                        onToggleEdit={handleSaveButton}
                        isEditing={isEditing}
                        isButtoneError={isButtoneError}
                    />
                </Form>
            </main>
            <footer className='profile__footer'></footer>
        </>
    )
}

