import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function CreateDeposit() {
  const [userForm, setUserForm] = useState({
    note: "",
    amount: "",
    accountNumber: "",
    password: "",
  });

  const [showDeposit, setShowDeposit] = useState(true); // State to manage deposit/withdrawal toggle

    const toggleDeposit = () => {
        setShowDeposit(true);
    };

    const toggleWithdraw = () => {
        setShowDeposit(false);
    };

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
      .post("http://localhost:4000/customers/deposit/" + params.id, userForm)
      .then((res) => {
        console.log(res.data);
        navigate("/transactions");
      });
  };

  useEffect(() => {}, []);

  return (
    <div className="createCustomer">
      <div className="form-wrapper">
        <form onSubmit={onSubmit}>
          <div className="mb-3">

            <div className="toggle-btns">
                <div className={showDeposit ? 'toggle-btn active' : 'toggle-btn'} onClick={toggleDeposit}>Send Money</div>
                <div className={!showDeposit ? 'toggle-btn active' : 'toggle-btn'} onClick={toggleWithdraw}>Request Money</div>
            </div>
            <label className="form-label font">Note</label>
            <input
              type="text"
              className="form-control"
              name="note"
              required={true}
              id="note"
              value={userForm.note}
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
              value={userForm.amount}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label font">Account Number</label>
            <input
              type="number"
              className="form-control"
              name="accountNumber"
              id="accountNumber"
              required={true}
              value={userForm.accountNumber}
              onChange={inputsHandler}
            />
          </div>
          
          <div className="mb-3" style={{textAlign:"center"}}>
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
