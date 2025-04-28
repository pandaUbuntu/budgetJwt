import { getFormInputValueByName } from '../../utils/formHelper';
import { createCatagory } from '../../api/slices/category';
import { useAppDispatch, useAppSelector } from '../../api/hooks';

function CategoryPage() {
    const dispatch = useAppDispatch();
    const { categories, isLoading, error } = useAppSelector((state) => state.category);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
  
        let name = getFormInputValueByName(event.currentTarget, "name");

        if (!name) {
            console.log("Заповніть всі поля");
            return;
        }

  
        dispatch(createCatagory({ name }))
            .unwrap()
            .then((data) => {
                console.log("Успішно створено", data);
            })
            .catch((error) => {
                console.error("Помилка", error);
            });
    }

  return (
    <>
      <p>{isLoading && "Завантаження" }</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Введіть назву категорії: </label>
          <input name="name"/>
        </div>
        <button type="submit">Створити</button>
      </form>
    </>
  )
}

export default CategoryPage
