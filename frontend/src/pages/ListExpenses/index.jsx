import React, { useState, useEffect } from 'react';
import { IoMdTrash, IoMdCreate, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../pages';
import Api from '../../api';
function ExpenseElement({ expense }) {
  return (
    <tr>
      <td>
        <div className='expense-title'>
          {expense.title}
        </div>
        <span className="icon">
          <IoIosArrowUp />
        </span>
        <span className="icon">
          <IoIosArrowDown />
        </span>
      </td>
      <td>
        <div className='expense-date'>
          {expense.date}
        </div>
      </td>
      <td><IoMdTrash className='expense-trash' /></td>
      <td><IoMdCreate className='expense-edit' /></td>
    </tr>
  );
}
/*async function fetchRefreshToken() {
  let expenseData = localStorage.getItem('expense-obj');
  if (expenseData) {
    expenseData = JSON.parse(expenseData);
    const response = await fetch('http://localhost:3000/auth/token', {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        user_data: expenseData
      }),
    });

    if (response.status === 200) {
      const json = await response.json();
      localStorage.setItem('expense-obj', JSON.stringify(json));
      await fetchExpenseList()
    } else {
      window.location.assign('./login.html');
    }
  }
}*/
async function fetchExpenseList() {
  let expenseArray = [];
  try {
    const response = await Api.get('/expense/list');

    if (response.status === 200) {
      expenseArray = response.data;
    } else {
      const json = await response.data;
      if (json.message === 'jwt expired') {
        throw Error(json.message);
      } else {
        console.log('ocorreu um error')
        console.log("message", json.message)
      }
    }
  } catch (error) {
    //if (error.message === 'Network Error') {
    throw Error(error.message);
  }

  return expenseArray;
};
export function ListExpenses() {
  const [data, setData] = useState({ expenses: [], loading: true });
  const history = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { expenses = [] } = await fetchExpenseList();
        setData((props) => ({ ...props, expenses, loading: false }));
      } catch (error) {
        if (error.message === 'Network Error'){
          history('/network-error');
        }
      }
    })();
  }, [history]);

  if (data.loading) {
    return (<Loading />);
  }
  return (
    <div className="content">
      <section>
        <table className="expense-table">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Data</th>
              <th>Remover</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {data.expenses.map(expense => <ExpenseElement key={expense.id} expense={expense} />)}
          </tbody>
        </table>
      </section>
    </div>
  );
}

