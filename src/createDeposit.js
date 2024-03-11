import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function CreateDeposit() {
  const [userForm, setUserForm] = useState({
    name: "",
    amount: "",
    date: "",
    accountNumber: "",
    balance: "",
  });

  const inputsHandler = (e) => {
    setUserForm((prevNext) => ({
      ...prevNext,
      [e.target.name]: e.target.value,
    }));
  };

  let params = useParams();
  let navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/customers/create-customer", userForm)
      .then((res) => {
        console.log(res.data);

        setUserForm({
          name: "",
          amount: "",
          date: "",
          accountNumber: "",
          balance: "",
        });
        navigate("/customer-list");
      });
  };

  useEffect(() => {}, []);

  return (
    <div className="createCustomer">
      <div className="form-wrapper">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label font">Type</label>
            <input
              type="text"
              className="form-control"
              name="name"
              required={true}
              id="name"
              value={userForm.name}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label font">Date</label>
            <input
              type="dateField"
              className="form-control"
              name="date"
              required={true}
              id="date"
              value={userForm.email}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label font">Amount</label>
            <input
              type="number"
              className="form-control"
              name="amount"
              required={true}
              id="amount"
              value={userForm.ssn}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label font">Account Number</label>
            <input
              type="text"
              className="form-control"
              name="accountNumber"
              id="accountNumber"
              required={true}
              value={userForm.accountNumber}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label font">Balance</label>
            <input
              type="text"
              className="form-control"
              name="balance"
              id="balance"
              value={userForm.balance}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDeposit;
