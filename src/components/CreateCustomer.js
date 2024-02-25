import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function CreateCustomer() {
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    ssn: "",
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
          email: "",
          ssn: "",
          accountNumber: "",
          balance: "",
          pwds: "",
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
            <label className="form-label font">Name</label>
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
            <label className="form-label font">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              required={true}
              id="email"
              value={userForm.email}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label font">SSN</label>
            <input
              type="text"
              className="form-control"
              name="ssn"
              required={true}
              id="ssn"
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
            <label className="form-label font">Password</label>
            <input
              type="text"
              className="form-control"
              name="pwds"
              id="pwds"
              value={userForm.pwds}
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

export default CreateCustomer;
