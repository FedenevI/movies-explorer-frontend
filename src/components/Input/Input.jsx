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
                <fieldset className='input__fieldset' disabled={pathname === '/profile' && !isEditing}>
                    <legend className='input__label'>{name}</legend>
                    <input
                        className={`input ${errors?.[inputType] ? 'input__error' : ''}`}
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
                    {errors?.[inputType] && <p className='input__message'>{errors?.[inputType]?.message}</p>}
                </fieldset>
            )}

            {inputType === 'submit' && (
                <buttone className='asd'>
                    {<p className='input__message'>{!isValid && isErrorSubmit && isMassegeShow}</p>}
                    <input className={`input__button ${!isValid ? 'input__button_disabled' : ''}`}
                        type='submit' disabled={!isValid} value={value} onClick={handleError} />
                </buttone>
            )}

            {inputType === 'edit' && (
                <>
                    <buttone className='asd'>
                        {<p className='input__message'>{isButtoneError && isEditing && !isValid && isMassegeShow}</p>}
                        <input
                            className={`profile__button ${isEditing ? 'profile__button_save' : ''} 
                        ${!isValid && isEditing ? 'profile__button_save_disabled' : ''}`}
                            type='submit'
                            onClick={onToggleEdit}
                            value={isEditing ? 'Сохранить' : 'Редактировать'}
                            disabled={isEditing && !isValid}
                        />
                    </buttone>
                    {!isEditing && <Link to='/' className='profile__subtitle_link' >Выйти из аккаунта</Link>}
                </>
            )
            }
        </>
    )
}