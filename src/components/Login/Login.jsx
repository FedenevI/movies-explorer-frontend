import './Login.css';
import Input from '../Input/Input';
import Form from '../Form/Form.jsx';
import { Link } from 'react-router-dom';

export default function Login() {

    return (
        <main className='login'>
            <Link to='/' className='login__logo' />
            <h1 className='login__title'>Рады видеть!</h1>

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
                    placeholder='Почта' />
                <Input inputType='submit' value="Войти" />
            </Form>

            <p className='login__question'>Ещё не зарегистрированы?
                <Link to='/signup' className='login__subtitle_link' href='#'>Регистрация</Link>
            </p>
        </main>
    )
}