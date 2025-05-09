import { getFormInputValueByName } from '../../utils/formHelper';
import { loginUser } from '../../api/slices/auth';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { Navigate, useNavigate } from 'react-router';

function Login() {
    const dispatch = useAppDispatch();
    const { user, isLoading, error } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
  
        let email = getFormInputValueByName(event.currentTarget, "email");
        let password = getFormInputValueByName(event.currentTarget, "password");

        
        dispatch(loginUser({ email, password }))
            .unwrap()
            .then((data) => {
                console.log("Успішно авторизовано", data);
                navigate("/dashboard");
            })
            .catch((error) => {
                console.error("Помилка авторизації", error);
            });
    }

  return (
    <>
      <p>{isLoading && "Завантаження" }</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Введіть email: </label>
          <input name="email" type="email" placeholder='example@gmail.com'/>
        </div>
        <div>
          <label htmlFor="password">Введіть пароль: </label>
          <input name="password" type="password" minLength={8} maxLength={16} />
        </div>
        <button type="submit">Логін</button>
      </form>
    </>
  )
}

export default Login
