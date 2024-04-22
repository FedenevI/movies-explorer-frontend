import './Form.css';
import { useForm, FormProvider } from 'react-hook-form';
import apiMain from '../../utils/MainApi';
import { useEffect, useState } from 'react';
import { errorsList } from '../../utils/error';
import { useCtx } from '../Context/Context';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Form({ children }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const setToken = useCtx().setToken;
    const token = useCtx().token;
    const setUserData = useCtx().setUserData;
    const { setIsErrorSubmit, setLoading, setLogin, setSuccess, setisEditing } = useCtx();

    const { handleSubmit, reset, formState: { isValid, errors }, register } = useForm({
        mode: 'onChange'
    });

    const onSubmitButtone = async (data) => {
        setLoading(true)
        try {
            if (pathname === '/signup') {
                await onSubmitRegister(data);
            } else if (pathname === '/profile') {
                await onEditProfile(data);
            } else {
                await onSibmitLogin(data);
            }
        } catch (err) {
            console.error(`Ошибка при отправке формы ${err}`);
        } finally {
            setLoading(false)
        }
    };

    const onSubmitRegister = async (data) => {
        setLoading(true)
        try {
            const res = await apiMain.registration(data.name, data.email, data.password)
            onSibmitLogin(data)
            console.log('Регистрация и авторизация успешны')
        } catch (err) {
            setIsErrorSubmit(errorsList(err))
            console.error(`Ошибка при регистрации ${err}`)
        } finally {
            setLoading(false)
            reset();
        }
    }

    const onSibmitLogin = async (data) => {
        setLoading(true)
        try {
            const res = await apiMain.authorization(data.email, data.password)
            localStorage.setItem('jwt', res.token)
            setToken(res.token)
            setLogin(true)
            let userData = await apiMain.getUserData(res.token)
            localStorage.setItem('currentUser', userData.name)
            localStorage.setItem('email', userData.email)
            setUserData(userData.name, userData.email)
            navigate('/movies')
        } catch (err) {
            console.error(`Ошибка при авторизации ${err}`)
            setIsErrorSubmit(errorsList(err))
        } finally {
            setLoading(false)
            reset();
        }

    }

    const onEditProfile = async (data) => {
        setLoading(true);
        try {
            const currentUser = localStorage.getItem('currentUser');
            const currentEmail = localStorage.getItem('email');
            if (currentUser !== data.name || currentEmail !== data.email) {
                const userData = await apiMain.setUserInfo(data.name, data.email, token);
                localStorage.setItem('currentUser', userData.name);
                localStorage.setItem('email', userData.email);
                setUserData(userData.name, userData.email);
                setSuccess(true);
            } else {
                setIsErrorSubmit('Отправляемые данные и текущие данные идентичны.');
            }
            setTimeout(() => {
                setisEditing(false);
            }, 2000);
        } catch (err) {
            console.error(`Ошибка при редактировании ${err}`);
            setIsErrorSubmit(errorsList(err));
        } finally {
            setLoading(false);
            reset();
        }
    }



    useEffect(() => {
        setisEditing(false)
        setIsErrorSubmit('');
    }, [pathname]);

    return (
        <FormProvider {...{ register, formState: { isValid, errors } }}>
            <form noValidate onSubmit={handleSubmit(onSubmitButtone)} className='form' autoComplete="off">
                {children}
            </form>
        </FormProvider>
    )
}

