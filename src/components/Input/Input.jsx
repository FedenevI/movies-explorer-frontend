import { useState } from 'react';
import './Input.css'
import { useFormContext } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';

export default function Input({ inputType, placeholder, isEditing, onToggleEdit, name, type, value, isButtoneError }) {
    const { register, formState: { isValid, errors } } = useFormContext()
    const { pathname } = useLocation()

    const [isErrorSubmit, setisErrorSubmit] = useState(true);
    const isMassegeShow = 'Что-то пошло не так...';

    const handleError = () => {
        setisErrorSubmit(false);
    };

    return (
        <>
            {(inputType === 'name' || inputType === 'email' || inputType === 'password') && (
                <fieldset className={`input__fieldset ${pathname === '/profile' ? "input__fieldset_profile" : ''}`} disabled={pathname === '/profile' && !isEditing}>
                    <label className={`input__label ${pathname === '/profile' ? "input__label_profile" : ''}`}>{name}</label>
                    <input
                        className={`input ${errors?.[inputType] ? 'input__error' : ''} ${pathname === '/profile' ? 'input__profile' : ''}`}
                        type={type}
                        placeholder={placeholder}
                        {...register(inputType, {
                            required: 'Запрещено не заполнять',
                            ...(inputType === 'email' ?
                                {
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: 'электропочта некоректна'
                                    }
                                } :
                                {
                                    minLength: {
                                        value: 3,
                                        message: '3 символа минимум'
                                    },
                                    maxLength: {
                                        value: 5,
                                        message: '5 символов максимум'
                                    }
                                }
                            )
                        })}
                    />
                    <p className={`input__message ${pathname === '/profile' ? "input__message_profile" : ''}`}>{errors?.[inputType]?.message}</p>
                </fieldset>
            )}

            {inputType === 'submit' && (
                <div className={`button ${pathname === '/signin' ? 'button__margin' : ''}`}>
                    <p className='input__message'>{isButtoneError && !isValid && isErrorSubmit && isMassegeShow}</p>
                    <input className={`input__button ${!isValid ? 'input__button_disabled' : ''}`}
                        type='submit' disabled={!isValid} value={value} onClick={handleError} />
                </div>
            )}

            {inputType === 'edit' && (
                <>
                    <div className='buttonedit'>
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