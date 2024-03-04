import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Transaction.css';

function Transaction() {
  const [data, setData] = useState([]);
  const [filterInfo, setFilterInfo] = useState({debit: false, credit: false, startDate:"", endDate: ""});
  const  params  = useParams();
  console.log(params);


  useEffect(() => {
    console.log("before setting transactions!!")
    axios.get("http://localhost:4000/customers/get-transactions/" + params.id)
      .then((res) => {
        setData(res.data.data);
      })
      .catch(() => {
        setData( [
            { id: 1, description: 'Interac Transfer', amount: -50.25, date: new Date('2024-03-03T10:30:00') },
            { id: 2, description: 'Payment Amazon', amount: 100.00, date: new Date('2024-03-03T10:30:00') },
            { id: 3, description: 'Presto Recharge', amount: -30.50, date: new Date('2024-03-03T10:30:00') },
            { id: 4, description: 'Interac Transfer', amount: -50.25, date: new Date('2024-03-03T10:30:00') },
            { id: 5, description: 'Payment Amazon', amount: 100.00, date: new Date('2024-03-03T10:30:00') },
            { id: 6, description: 'Presto Recharge', amount: -30.50, date: new Date('2024-03-03T10:30:00') }
          ]);
      });
  }, []);

  return (
    <div className="transaction-filter-container">
        <div className="filter-container">
            <h2 className="transaction-heading">Filter</h2>
            <div className="filter-buttons">
                <button className="filter-button" onClick={()=>{
                    setFilterInfo((prev) => ({
                        ...prev,
                        debit: !prev.debit,
                      }));

                }}>debit</button>
                <button className="filter-button" onClick={()=>{
                    setFilterInfo((prev) => ({
                        ...prev,
                        credit: !prev.credit,
                      }));
                }}>credit</button>
            </div>
            <div className="date-container">
                <label>start date</label>
                <input className="date-filter" type='date' placeholder='Start Date'></input>
            </div>
            <div className="date-container">
                <label >end date</label>
                <input className="date-filter" type='date' placeholder='End date'></input>
            </div>    
            <button onClick={()=>{}} className="filter-button">Search</button>      
        </div>
        <div className="transaction-container">
        <h2 className="transaction-heading">Bank Transactions</h2>
        <ul className="transaction-list">
            {data && data.map((transaction) => (
            <li key={transaction.id} className="transaction-item">
                <div>
                <span className="transaction-description">{transaction.description}</span>
                </div>
                <div>
                    <span className="transaction-date">{transaction.date.toLocaleString()}</span>
                </div>
                <div className={transaction.amount < 0 ? 'transaction-negative-amount' : 'transaction-positive-amount'}>
                {transaction.amount >= 0 ? '+' : '-'}${Math.abs(transaction.amount.toFixed(2))}
                </div>
            </li>
            ))}
        </ul>
        </div>
    </div>
  );
}

export default Transaction;
