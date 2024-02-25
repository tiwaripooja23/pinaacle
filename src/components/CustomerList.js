import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CustomerList() {
  const [userForm, setUserForm] = useState([]);

  const deleteCustomer = (_id) => {
    axios
      .delete("http://localhost:4000/customers/delete-customer/" + _id)
      .then(() => {
        console.log("Data successfully deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/customers/")
      .then((res) => {
        setUserForm(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userForm]);

  return (
    <div className="customerList">
      <table className="font">
        <thead>
          <tr>
            <th scope="col" className="gap">#</th>
            <th scope="co" className="gap">Name</th>
            <th scope="col" className="gap">Email</th>
            <th scope="col" className="gap">SSN</th>
            <th scope="col" className="gap">Account Number</th>
            <th scope="col" className="gap">Balance</th>
            <th scope="col" className="action">Action</th>
          </tr>
        </thead>
        <tbody>
          {userForm.map((user, index) => {
            return (
              <tr key={index}>
                <th scope="row">{user._id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.ssn}</td>
                <td>####{user.accountNumber}</td>
                <td>${user.balance}</td>
                <td>
                  <Link
                    className="btn btn-primary btn-sm me-2"
                    to={"/edit-customer/" + user._id}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCustomer(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
