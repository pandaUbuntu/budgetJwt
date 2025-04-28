import { getFormInputValueByName } from '../../utils/formHelper';
import { registerUser } from '../../api/slices/auth';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { Navigate } from 'react-router';

function Registration() {
    const dispatch = useAppDispatch();
    const { user, isLoading, error } = useAppSelector((state) => state.auth);



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
  
        let name = getFormInputValueByName(event.currentTarget, "name");
        let email = getFormInputValueByName(event.currentTarget, "email");
        let password = getFormInputValueByName(event.currentTarget, "password");

        if (!email || !password) {
            console.log("Заповніть всі поля");
            return;
        }
        if (password.length < 8 || password.length > 16) {  
            console.log("Пароль має бути від 8 до 16 символів");
            return;
        }
        if (!email.includes("@")) {
            console.log("Email має містити символ '@'");
            return;
        }
  
        dispatch(registerUser({ name, email, password }))
            .unwrap()
            .then((data) => {
                console.log("Успішно зареєстровано", data);
                <Navigate to="/category" />;
            })
            .catch((error) => {
                console.error("Помилка реєстрації", error);
            });
    }

  return (
    <>
      <p>{isLoading && "Завантаження" }</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Введіть ім'я: </label>
          <input name="name" placeholder="Ваше ім'я"/>
        </div>
        <div>
          <label htmlFor="email">Введіть email: </label>
          <input name="email" type="email" placeholder='example@gmail.com'/>
        </div>
        <div>
          <label htmlFor="password">Введіть пароль: </label>
          <input name="password" type="password" minLength={8} maxLength={16} />
        </div>
        <button type="submit">Реєстрація</button>
      </form>
    </>
  )
}

export default Registration
