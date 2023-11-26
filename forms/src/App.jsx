import { useState, useRef, useEffect } from 'react'
import './App.css'

const sendData = (formData) => {
  console.log(formData)

}

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [repeatPasswordError, setRepeatPasswordError] = useState(null);

  const submitButtonRef = useRef(null);
  
  useEffect(() => {
    if (emailError === null && passwordError === null && repeatPasswordError === null) {
      if (submitButtonRef.current) {
        submitButtonRef.current.focus();
      }
    }
  }, [emailError, passwordError, repeatPasswordError]);

  const onSubmit = (event) => {
    event.preventDefault();

  sendData ({email, password, repeatPassword})
  }

  const emailValidation = ({target}) => {
    setEmail(target.value)

    let error = null;

    if(!/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(target.value)) {
      error = "Неверный Email"
    }    

    setEmailError(error)
  }

  const passwordValidation = ({target}) => {
    setPassword(target.value)

    let error = null;

    if(!/^[A-Za-z0-9]{6,12}$/.test(target.value)) {
      error = "Пароль 6-12 символов, латинские буквы и цифры"
    }    

    setPasswordError(error);
  }

  const repeatPasswordValidation = ({ target }) => {
    const repeatedPassword = target.value;
  
    setRepeatPassword(repeatedPassword);
  
    let error = null;
  
    if (password !== repeatedPassword) {
      error = "Пароли не совпадают";
    }
  
    setRepeatPasswordError(error);
  };
  
  return (
    <>
      <form onSubmit={onSubmit}>
       {emailError && <div className='error'>{emailError}</div>}
        <input 
          type='email' 
          name='email' 
          value={email} 
          placeholder='Введите email' 
          onChange={emailValidation}
        />
        {passwordError && <div className='error'>{passwordError}</div>}
        <input 
          type='password' 
          name='password' 
          value={password} 
          placeholder='Введите пароль' 
          onChange={passwordValidation}
        />

        {repeatPasswordError && <div className='error'>{repeatPasswordError}</div>}
        <input 
          type='password' 
          name='repeatPassword' 
          value={repeatPassword} 
          placeholder='Повторите пароль' 
          onChange={repeatPasswordValidation}
        />
      
        <button 
        ref={submitButtonRef}
        type='submit' 
        disabled={emailError !== null 
        || passwordError !== null
        || repeatPasswordError !== null
        || !email 
        || !password 
        || !repeatPassword
      }
        >Зарегистрироваться</button>

      </form>
    </>
  )
}

export default App


