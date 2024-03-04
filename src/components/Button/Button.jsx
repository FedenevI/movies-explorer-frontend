import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';

export default function Button(inputType, isEditing, isButtoneError, value, onToggleEdit) {
    const { formState: { isValid } } = useFormContext();
    const { pathname } = useLocation()

    const [isErrorSubmit, setisErrorSubmit] = useState(true);
    const isMassegeShow = 'Что-то пошло не так...';

    const handleError = () => {
        setisErrorSubmit(false);
    };


    return (
        <>
            {inputType === 'submit' && (
                <div className={`asd ${pathname === '/signin' ? 'asd__margin' : ''}`}>
                    <p className='input__message'>{isButtoneError && !isValid && isErrorSubmit && isMassegeShow}</p>
                    <input className={`input__button ${!isValid ? 'input__button_disabled' : ''}`}
                        type='submit' disabled={!isValid} value={value} onClick={handleError} />
                </div>
            )}

            {inputType === 'edit' && (
                <>
                    <div className='asdZ'>
                        {<p className='input__message'>{isButtoneError && isEditing && !isValid && isMassegeShow}</p>}
                        <input
                            className={`profile__button ${isEditing ? 'profile__button_save' : ''} 
                    ${!isValid && isEditing ? 'profile__button_save_disabled' : ''}`}
                            type='submit'
                            onClick={onToggleEdit}
                            value={isEditing ? 'Сохранить' : 'Редактировать'}
                            disabled={isEditing && !isValid}
                        />
                    </div>
                    {!isEditing && <Link to='/' className='profile__subtitle_link' >Выйти из аккаунта</Link>}
                </>
            )
            }
        </>
    )
}