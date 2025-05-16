import { getFormInputValueByName } from '../../utils/formHelper';
import { getTransactions, createTransaction } from '../../api/slices/transactions';
import { getTransactionTypes } from '../../api/slices/transactionType';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { useEffect } from 'react';
import './style.css'
import TransactionList from './List';
import { FilterType } from '../../types/type';

function TransationSide() {
    const dispatch = useAppDispatch();
    const { categories, isLoading, error } = useAppSelector((state) => state.category);
    const { transactions } = useAppSelector((state) => state.transaction);
    const { transactionType } = useAppSelector((state) => state.transactionType);

    const filterData:FilterType = {
        type: undefined,
        categoryId: undefined,
        startDate: undefined,
        endDate: undefined
    }

    useEffect(() => {
        dispatch(getTransactionTypes())
            .unwrap()
            .then((data) => {
                console.log("Успішно отримано типи", data);
            })
            .catch((error) => {
                console.error("Помилка", error);
            });
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTransactions(filterData))
            .unwrap()
            .then((data) => {
                console.log("Успішно отримано транзакції", data);
            })
            .catch((error) => {
                console.error("Помилка", error);
            });
    }, [dispatch]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let categoryId = getFormInputValueByName(event.currentTarget, "category");
        let typeId = getFormInputValueByName(event.currentTarget, "type");
        let value = getFormInputValueByName(event.currentTarget, "value");
        let date = getFormInputValueByName(event.currentTarget, "date");

        if (!date) {
            date = new Date().toISOString().split("T")[0];
        }

        if (!categoryId || !typeId || !value) {
            console.log("Заповніть всі поля");
            return;
        }

        let typeText:string = transactionType.find((type) => type.id === Number(typeId))?.name as string;

        dispatch(createTransaction({ type: typeText, categoryId: Number(categoryId), value: Number(value), date }))
            .unwrap()
            .then((data) => {
                console.log("Успішно створено", data);
            })
            .catch((error) => {
                console.error("Помилка", error);
            });
    }

    const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let categoryId = event.target.value;
        filterData.categoryId = Number(categoryId);

        dispatch(getTransactions(filterData))
              .unwrap()
              .then((data) => {
                  console.log("Успішно отримано транзакції filter", data);
              })
              .catch((error) => {
                  console.error("Помилка", error);
              });

        console.log("Filter", categoryId);
    }

    

    return (
      <>
      <div className="transaction-form">
        <form onSubmit={handleSubmit}>
            <span>
              <label htmlFor="category">Category: </label>
              <select name="category" id="category">
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </span>
            <span>
              <label htmlFor="type">Type: </label>
              <select name="type" id="type">
                {transactionType.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </span>
            <span>
              <label htmlFor="value">Value: </label>
              <input type="number" name="value" id="value" required/>
            </span>
            <span>
              <label htmlFor="date">Date: </label>
              <input type="date" name="date" id="date" />
            </span>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="transaction-filter">
        <label htmlFor="category">Category: </label>
              <select name="category" id="category" onChange={(e) => handleChangeCategory(e)}>
                <option value="">All</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
        </div>
        <TransactionList transactions={transactions} />
      </>
    )
  }
  
  export default TransationSide