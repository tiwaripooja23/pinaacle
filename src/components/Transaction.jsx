import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "../styles/Transaction.css";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";

function Transaction() {
  const [data, setData] = useState([]);
  const [filterInfo, setFilterInfo] = useState({
    debit: false,
    credit: false,
    startDate: "",
    endDate: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 
  const params = useParams();
  console.log(params);

  useEffect(() => {
    console.log("before setting transactions!!");
    axios
      .get("http://localhost:4000/customers/get-transactions/" + params.id)
      .then((res) => {
        const transactions = res.data.data;
        const updatedData = transactions.map(entry => {
          return {
              ...entry,
              date: new Date(entry.date)
          };
      });
        setData(updatedData);
      })
      .catch(() => {
        setData([
          {
            id: 1,
            note: "Interac Transfer",
            amount: -120.25,
            date: new Date("2024-02-03T10:30:00"),
          },
          {
            id: 2,
            note: "Payment Amazon",
            amount: 100.0,
            date: new Date("2024-03-03T10:30:00"),
          },
          {
            id: 3,
            note: "Presto Recharge",
            amount: -30.5,
            date: new Date("2024-05-06T10:30:00"),
          },
          {
            id: 4,
            note: "Interac Transfer",
            amount: -50.25,
            date: new Date("2024-07-03T10:30:00"),
          },
          {
            id: 5,
            note: "Payment Amazon",
            amount: 10.0,
            date: new Date("2024-08-02T10:30:00"),
          },
          {
            id: 6,
            note: "Presto Recharge",
            amount: -30.5,
            date: new Date("2024-09-05T10:30:00"),
          },
          {
            id: 7,
            note: "Shopping at Mall",
            amount: -45.75,
            date: new Date("2024-10-10T15:45:00"),
          },
          {
            id: 8,
            note: "Gas Station",
            amount: -25.3,
            date: new Date("2024-11-12T08:30:00"),
          },
          {
            id: 9,
            note: "Grocery Store",
            amount: -70.2,
            date: new Date("2024-12-20T14:00:00"),
          },
          {
            id: 10,
            note: "Salary Deposit",
            amount: 200.0,
            date: new Date("2022-01-05T12:00:00"),
          },
          {
            id: 11,
            note: "Electric Bill",
            amount: -80.5,
            date: new Date("2022-02-08T18:00:00"),
          },
          {
            id: 12,
            note: "Interac Transfer",
            amount: -90.75,
            date: new Date("2022-03-15T10:30:00"),
          },
          {
            id: 13,
            note: "Payment Amazon",
            amount: 50.0,
            date: new Date("2022-04-18T09:15:00"),
          },
          {
            id: 14,
            note: "Presto Recharge",
            amount: -25.0,
            date: new Date("2022-05-20T13:30:00"),
          },
          {
            id: 15,
            note: "Dinner with Friends",
            amount: -40.0,
            date: new Date("2022-06-25T20:00:00"),
          },
          {
            id: 16,
            note: "Interac Transfer",
            amount: -60.2,
            date: new Date("2022-07-30T14:45:00"),
          },
          {
            id: 17,
            note: "Online Subscription",
            amount: -15.99,
            date: new Date("2022-08-05T11:30:00"),
          },
          {
            id: 18,
            note: "Payment Amazon",
            amount: 25.5,
            date: new Date("2022-09-10T12:15:00"),
          },
          {
            id: 19,
            note: "Presto Recharge",
            amount: -35.75,
            date: new Date("2022-10-18T16:30:00"),
          },
          {
            id: 20,
            note: "Holiday Expenses",
            amount: -120.0,
            date: new Date("2022-11-22T09:00:00"),
          },
          {
            id: 21,
            note: "Interac Transfer",
            amount: -70.5,
            date: new Date("2022-12-28T10:30:00"),
          },
          {
            id: 22,
            note: "Shopping Spree",
            amount: -200.75,
            date: new Date("2023-01-15T14:00:00"),
          },
          {
            id: 23,
            note: "Rent Payment",
            amount: -80.0,
            date: new Date("2023-02-20T16:30:00"),
          },
          {
            id: 24,
            note: "Payment Amazon",
            amount: 75.0,
            date: new Date("2023-03-25T11:45:00"),
          },
          {
            id: 25,
            note: "Presto Recharge",
            amount: -28.5,
            date: new Date("2023-04-30T10:30:00"),
          },
          {
            id: 26,
            note: "Interac Transfer",
            amount: -50.0,
            date: new Date("2023-05-05T12:00:00"),
          },
          {
            id: 27,
            note: "Coffee Shop",
            amount: -8.25,
            date: new Date("2023-06-10T08:15:00"),
          },
          {
            id: 28,
            note: "Utility Bill",
            amount: -100.5,
            date: new Date("2023-07-15T15:30:00"),
          },
          {
            id: 29,
            note: "Payment Amazon",
            amount: 30.0,
            date: new Date("2023-08-20T09:45:00"),
          },
          {
            id: 30,
            note: "Presto Recharge",
            amount: -25.75,
            date: new Date("2023-09-25T10:30:00"),
          },
          {
            id: 31,
            note: "Interac Transfer",
            amount: -40.2,
            date: new Date("2023-10-30T12:00:00"),
          },
          {
            id: 32,
            note: "Movie Night",
            amount: -15.0,
            date: new Date("2023-11-05T20:30:00"),
          },
          {
            id: 33,
            note: "Payment Amazon",
            amount: 20.5,
            date: new Date("2023-12-10T11:15:00"),
          },
          {
            id: 34,
            note: "Presto Recharge",
            amount: -22.75,
            date: new Date("2027-01-15T14:45:00"),
          },
          {
            id: 35,
            note: "Interac Transfer",
            amount: -75.3,
            date: new Date("2027-02-20T10:30:00"),
          },
          {
            id: 36,
            note: "Online Shopping",
            amount: -90.0,
            date: new Date("2027-03-25T16:00:00"),
          },
          {
            id: 37,
            note: "Payment Amazon",
            amount: 15.25,
            date: new Date("2027-04-30T09:30:00"),
          },
        ]);
      });
  }, []);

  const filterTransactions = () => {
    const filtered = data.filter((transaction) => {
     
      if (
        (filterInfo.debit && transaction.amount >= 0) ||
        (filterInfo.credit && transaction.amount < 0)
      ) {
        return false;
      }

      
      if (
        filterInfo.startDate &&
        new Date(transaction.date) < new Date(filterInfo.startDate)
      ) {
        return false;
      }

      if (
        filterInfo.endDate &&
        new Date(transaction.date) > new Date(filterInfo.endDate)
      ) {
        return false;
      }

      return true;
    });

    setFilteredData(filtered);
  };

  const clearAllFilters = () => {
    setFilterInfo({ debit: false, credit: false, startDate: "", endDate: "" });
  };

  useEffect(() => {
    
    filterTransactions();
  }, [filterInfo]);

  
  const labels =
    filteredData.length > 0
      ? filteredData
          .filter(
            (entry) => new Date(entry.date).getFullYear() === selectedYear
          )
          .map((entry) => entry.date.toISOString().split("T")[0])
      : data
          .filter(
            (entry) => new Date(entry.date).getFullYear() === selectedYear
          )
          .map((entry) => entry.date.toISOString().split("T")[0]);

  const debitAmounts = labels.map((label) =>
    filteredData.length > 0
      ? filteredData
          .filter(
            (transaction) =>
              transaction.amount < 0 &&
              transaction.date.toISOString().split("T")[0] === label
          )
          .reduce((total, entry) => total + Math.abs(entry.amount), 0)
      : data
          .filter(
            (transaction) =>
              transaction.amount < 0 &&
              transaction.date.toISOString().split("T")[0] === label
          )
          .reduce((total, entry) => total + Math.abs(entry.amount), 0)
  );

  const creditAmounts = labels.map((label) =>
    filteredData.length > 0
      ? filteredData
          .filter(
            (transaction) =>
              transaction.amount >= 0 &&
              transaction.date.toISOString().split("T")[0] === label
          )
          .reduce((total, entry) => total + entry.amount, 0)
      : data
          .filter(
            (transaction) =>
              transaction.amount >= 0 &&
              transaction.date.toISOString().split("T")[0] === label
          )
          .reduce((total, entry) => total + entry.amount, 0)
  );


  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Credit Amount",
        borderColor: "rgb(0, 128, 0)",
        data: creditAmounts,
        fill: false,
      },
      {
        label: "Debit Amount",
        borderColor: "rgb(255, 0, 0)",
        data: debitAmounts,
        fill: false,
      },
    ],
  };

 
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    color: "wheat",
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
        },
        title: {
          color: "wheat",
        },
        ticks: {
          color: "wheat",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
          color: "wheat",
        },
        ticks: {
          callback: (value) => `$${Math.abs(value).toFixed(2)}`,
          color: "wheat",
        },
      },
    },
  };

  return (
    <>
      <div className="transaction-filter-container">
        <div className="filter-container">
          <h2 className="transaction-heading">Filter</h2>
          <div className="filter-buttons">
            <button
              className={`filter-button ${
                filterInfo.debit ? "debit-active" : ""
              }`}
              onClick={() => {
                setFilterInfo((prev) => ({
                  ...prev,
                  debit: !prev.debit,
                }));
              }}
            >
              debit
            </button>
            <button
              className={`filter-button ${
                filterInfo.credit ? "credit-active" : ""
              }`}
              onClick={() => {
                setFilterInfo((prev) => ({
                  ...prev,
                  credit: !prev.credit,
                }));
              }}
            >
              credit
            </button>
          </div>
          <div className="date-container">
            <label>start date</label>
            <input
              className="date-filter"
              type="date"
              placeholder="Start Date"
              value={filterInfo.startDate}
              onChange={(e) =>
                setFilterInfo((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
            />
          </div>
          <div className="date-container">
            <label>end date</label>
            <input
              className="date-filter"
              type="date"
              placeholder="End date"
              value={filterInfo.endDate}
              onChange={(e) =>
                setFilterInfo((prev) => ({
                  ...prev,
                  endDate: e.target.value,
                }))
              }
            />
          </div>

          <button onClick={clearAllFilters} className="filter-button">
            Clear All Filters
          </button>
        </div>

        <div className="transaction-container">
          <h2 className="transaction-heading">Bank Transactions</h2>
          <ul className="transaction-list">
            {filteredData.length > 0
              ? filteredData.map((transaction) => (
                  <li key={transaction.id} className="transaction-item">
                    <div>
                      <span className="transaction-description">
                        {transaction.note}
                      </span>
                    </div>
                    <div>
                      <span className="transaction-date">
                        {transaction.date.toLocaleString()}
                      </span>
                    </div>
                    <div
                      className={
                        transaction.amount < 0
                          ? "transaction-negative-amount"
                          : "transaction-positive-amount"
                      }
                    >
                      {transaction.amount >= 0 ? "+" : "-"}$
                      {Math.abs(transaction.amount.toFixed(2))}
                    </div>
                  </li>
                ))
              : data.map((transaction) => (
                  <li key={transaction.id} className="transaction-item">
                    <div>
                      <span className="transaction-description">
                        {transaction.note}
                      </span>
                    </div>
                    <div>
                      <span className="transaction-date">
                        {transaction.date.toLocaleString()}
                      </span>
                    </div>
                    <div
                      className={
                        transaction.amount < 0
                          ? "transaction-negative-amount"
                          : "transaction-positive-amount"
                      }
                    >
                      {transaction.amount >= 0 ? "+" : "-"}$
                      {Math.abs(transaction.amount.toFixed(2))}
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </div>
      <div className="chart-container">
        <div className="year-selector">
          <label>Select Year: </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {Array.from(
              { length: new Date().getFullYear() - 2010 + 1 },
              (_, index) => 2010 + index
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="custom-chart-style">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </>
  );
}

export default Transaction;
