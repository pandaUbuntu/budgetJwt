import { Transaction } from "../../../types/type";
import './style.css'
import { useAppDispatch, useAppSelector } from '../../../api/hooks';
import { deleteTransaction } from "../../../api/slices/transactions";

type TransactionListProps = {
  transactions: Transaction[];
}



function TransactionList(props:TransactionListProps) {
    const dispatch = useAppDispatch();

    function handleDelete(transactionId: number) {
      dispatch(deleteTransaction(transactionId))
      .unwrap()
      .then((data) => {
          console.log("Успішно видалено", data);
      })
      .catch((error) => {
          console.error("Помилка", error);
      });
    }

    return (
      <>
        <ul className="transaction-list">
          {props.transactions.map((transaction) => (
            <li key={transaction.id} className={transaction.type.name.toLowerCase() === 'income' ? "green" : "red"}>
                <span>Category: {transaction.category.name}</span> Type: {transaction.type.name}  Value: {transaction.value} Date: {transaction.date}
                <button onClick={(e) => handleDelete(transaction.id)}> DELETE</button>
            </li>
          ))}
        </ul>
      </>
    )
  }
  
  export default TransactionList
