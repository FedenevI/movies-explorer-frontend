import './Input.css'
import { useFormContext } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import { useCtx } from '../Context/Context';
import { useEffect, useState } from 'react';

export default function Input({ inputType, inputValue, isEditing, onToggleEdit, name, type, value, isButtoneError }) {
    const { register, formState: { isValid, errors } } = useFormContext()
    const { pathname } = useLocation()
    const { isErrorSubmit, loading, clearContextAndLocalStorage, succes, currentUser, email } = useCtx();
    const [values, setValues] = useState(inputValue);

    const handleChange = (e) => {
        setValues(e.target.value);
    };

    const LogOut = () => {
        localStorage.clear();
        clearContextAndLocalStorage()
    }


    return (
        <>
            {(inputType === 'name' || inputType === 'email' || inputType === 'password') && (
                <fieldset className={`input__fieldset ${pathname === '/profile' ? "input__fieldset_profile" : ''}`} disabled={pathname === '/profile' && !isEditing}>
                    <label className={`input__label ${pathname === '/profile' ? "input__label_profile" : ''}`}>{name}</label>
                    <input
                        className={`input ${errors?.[inputType] ? 'input__error' : ''} ${pathname === '/profile' ? 'input__profile' : ''}`}
                        type={type}
                        value={values}
                        {...register(inputType, {
                            ...(pathname === '/profile' ? { onChange: handleChange } : {}),
                            required: 'Запрещено не заполнять',
                            ...(inputType === 'name' ?
                                {
                                    pattern: {
                                        value: /^[A-Za-zА-Яа-я\s-]+$/,
                                        message: 'только латиница, кириллица, пробел или дефис'
                                    },
                                    minLength: {
                                        value: 2,
                                        message: '2 символа минимум'
                                    },
                                } :
                                inputType === 'email' ?
                                    {
                                        pattern: {
                                            value: /^\S+@\S+\.\S+$/,
                                            message: 'электропочта некоректна'
                                        }
                                    } : {
                                        minLength: {
                                            value: 2,
                                            message: '2 символа минимум'
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: '30 символов максимум'
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
                    {<p className='input__message'>{isErrorSubmit ? isErrorSubmit : loading ? 'Отправка' : ''}</p>}
                    <input className={`input__button ${!isValid ? 'input__button_disabled' : ''}`}
                        type='submit' disabled={!isValid} value={value}
                    />
                </div>
            )}

            {inputType === 'edit' && (
                <>


                    <div className='buttonedit'>
                        {<p className='input__message'>{isErrorSubmit && !isButtoneError ? isErrorSubmit : loading ? 'Успешно' : ''}</p>}
                        <input
                            className={`profile__button ${isEditing ? 'profile__button_save' : ''} 
                        ${!isValid && isEditing ? 'profile__button_save_disabled' : ''}`}
                            type='submit'
                            value={isEditing ? 'Сохранить' : 'Редактировать'}
                            disabled={isEditing && !isValid && (values === email)}
                        />
                    </div>
                    {!isEditing && <Link to='/' className='profile__subtitle_link' onClick={clearContextAndLocalStorage}>Выйти из аккаунта</Link>}


                </>
            )
            }


        </>
    )
}