import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './App.css'

const sendData = (formData) => {
  console.log(formData)
}

const schema = yup.object()
    .shape({
  email: yup.string().email('Неверный Email').required('Введите email'),
  password: yup.string()
  .matches(/^[A-Za-z0-9]{6,12}$/, 'Пароль 6-12 символов, латинские буквы и цифры')
  .required('Введите пароль'),
  repeatPassword: yup.string()

  .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
  .required('Повторите пароль'),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(schema)
  });

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;
  const repeatPasswordError = errors.repeatPassword?.message;

return (
    <>
      <form onSubmit={handleSubmit(sendData)}>
       {emailError && <div className='error'>{emailError}</div>}
        <input 
          type='email' 
          name='email' 
          {...register('email')}
        />
        {passwordError && <div className='error'>{passwordError}</div>}
        <input 
          type='password' 
          name='password' 
          {...register('password')}
        />

        {repeatPasswordError && <div className='error'>{repeatPasswordError}</div>}
        <input 
          type='password' 
          name='repeatPassword' 
          {...register('repeatPassword')}
        />
      
        <button 
        type='submit' 
        disabled={!! emailError 
          || passwordError
          || repeatPasswordError
      }
        >Зарегистрироваться</button>

      </form>
    </>
  )
}

export default App


