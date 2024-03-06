import './Registration.css'
import Form from '../Form/Form.jsx';
import Input from '../Input/Input.jsx';
import { Link } from 'react-router-dom';

export default function Registration() {

  return (
    <>
      <header className='registration__header'>
        <Link to='/' className='registration__logo' />
        <h1 className='registration__title'>Добро пожаловать!</h1>
      </header>

      <main className='registration__main'>
        <Form className='registration__form'>
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
            placeholder='Пароль' />
          <Input inputType='submit' value="Зарегиcтрироваться" />
        </Form>
        <p className='registration__question'>Уже зарегистрированы?
          <Link to='/signin' className='registration__subtitle' href='#'>Войти</Link>
        </p>
      </main>

      <footer className='registration__footer'></footer>
    </>
  )
}