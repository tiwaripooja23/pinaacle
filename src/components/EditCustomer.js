import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

function EditCustomer() {
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    ssn: "",
    balance: "",
  });

  let params = useParams();
  let navigate = useNavigate();

  const inputsHandler = (e) => {
    setUserForm((prevNext) => ({
      ...prevNext,
      [e.target.name]: e.target.value,
    }));
  };

  const onUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:4000/customers/update-customer/" + params.id, {
        name: userForm.name,
        email: userForm.email,
        ssn: userForm.ssn,
        balance: userForm.balance
      })
      .then((res) => {
        console.log({ status: res.status });
        navigate("/customer-list");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/customers/get-customer/" + params.id)
      .then((res) => {
        setUserForm({
          name: res.data.data.name,
          email: res.data.data.email,
          ssn: res.data.data.ssn,
          accountNumber: res.data.data.accountNumber,
          balance: res.data.data.balance,

        });
      });
  }, []);

  return (
    <div>
      <div className="form-wrapper">
        <form onSubmit={onUpdate}>
          <div className="mb-3">
            <label className="form-label font">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={userForm.name}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label font">Email</label>
            <input
              type="text"
              readOnly="true"
              className="form-control disable"
              name="email"
              id="email"
              value={userForm.email}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">SSN</label>
            <input
              type="text"
              className="form-control"
              name="ssn"
              id="ssn"
              value={userForm.ssn}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Balance</label>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCustomer;
