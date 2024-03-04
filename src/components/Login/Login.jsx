import './Login.css';
import Input from '../Input/Input';
import Form from '../Form/Form.jsx';
import { Link } from 'react-router-dom';

export default function Login() {

    return (
        <>
            <header className='login__header'>
                <Link to='/' className='login__logo' />
                <h1 className='login__title'>Рады видеть!</h1>
            </header>

            <main className='login__main'>
                <Form className='login__form'>
                    <Input
                        inputType='email'
                        name="E-mail"
                        type='email'
                        placeholder='Почта' />
                    <Input
                        inputType='password'
                        name='Пароль'
                        type='password'
                        placeholder='Пароль' />
                    <Input inputType='submit' value="Войти" />
                </Form>
                <p className='login__question'>Ещё не зарегистрированы?
                    <Link to='/signup' className='login__subtitle' href='#'>Регистрация</Link>
                </p>
            </main>
            <footer className='login__footer'></footer>

        </>
    )
}