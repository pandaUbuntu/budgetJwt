import { getFormInputValueByName } from '../../utils/formHelper';
import { createCatagory, getCategories, deleteCategory } from '../../api/slices/category';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { useEffect, useCallback, useMemo } from 'react';

function CategorySide() {
    const dispatch = useAppDispatch();
    const { categories, isLoading, error } = useAppSelector((state) => state.category);

    const getLenghtAllCategories = useMemo(():number => {
        let lenght = 0;

        categories.forEach((category) => {
            lenght += category.name.length;
        });

        return lenght;
    }, [categories]);

    useEffect(() => {
        console.log("Довжина всіх категорій:", getLenghtAllCategories);
        dispatch(getCategories())
            .unwrap()
            .then((data) => {
                console.log("Успішно отримано категорії", data);
            })
            .catch((error) => {
                console.error("Помилка", error);
            });
    }, [dispatch]);


    const handleDelete = useCallback((categoryId: number) => {
          dispatch(deleteCategory(categoryId))
          .unwrap()
          .then((data) => {
              console.log("Успішно видалено", data);
          })
          .catch((error) => {
              console.error("Помилка", error);
          });
      }, []);

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
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
            })
    }, []);

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

      <div>
        <h2>Список категорій:</h2>
        {categories.length > 0 ? (
          <ul>
            {categories.map((category) => (
              <li key={category.id}>{category.name} <button onClick={(e) => handleDelete(category.id)}> DELETE</button></li>
            ))}
          </ul>
        ) : (
          <p>Немає категорій</p>
        )}
      </div>
    </>
  )
}

export default CategorySide
