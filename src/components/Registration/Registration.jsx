import './Registration.css'
import Form from '../Form/Form.jsx';
import Input from '../Input/Input.jsx';
import { Link } from 'react-router-dom';

export default function Registration() {

  return (
    <main className='registration'>
      <Link to='/' className='registration__logo' />
      <h1 className='registration__title'>Добро пожаловать!</h1>

      <Form className='login__form'>
        <Input
          inputType='name'
          name='Имя'
          type='text'
          placeholder='Имя' />
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
        <Input inputType='submit' value="Зарегитрироваться" />

      </Form>

      <p className='registration__question'>Уже зарегистрированы?
        <Link to='/signin' className='registration__subtitle_link' href='#'>Войти</Link>
      </p>
    </main>
  )
}