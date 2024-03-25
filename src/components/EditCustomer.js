// Import React hooks and other necessary utilities from react-router-dom and axios
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditCustomer() {
  // State hook to store and manage user form data
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    ssn: "",
    balance: "",
  });

  // useParams hook to access parameters of the current route
  let params = useParams();
  // useNavigate hook to programmatically navigate to different routes
  let navigate = useNavigate();

  // Handler function to update state based on form input changes
  const inputsHandler = (e) => {
    setUserForm((prevNext) => ({
      ...prevNext,
      [e.target.name]: e.target.value,
    }));
  };

  // Function to handle form submission for updating a customer
  const onUpdate = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Send a PUT request to update customer data based on form state
    axios
      .put("http://localhost:4000/customers/update-customer/" + params.id, userForm)
      .then((res) => {
        console.log({ status: res.status }); // Log the response status
        navigate("/transaction-list"); // Navigate to the transaction list page upon successful update
      });
  };

  // useEffect hook to fetch customer data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:4000/customers/get-customer/" + params.id) // Get request to fetch customer data
      .then((res) => {
        setUserForm({ // Update form state with fetched customer data
          name: res.data.data.name,
          email: res.data.data.email,
          ssn: res.data.data.ssn,
          accountNumber: res.data.data.accountNumber,
          balance: res.data.data.balance,
        });
      });
  }, [params.id]); // Dependency array with params.id to refetch if the id changes

  return (
    <div>
      <div className="form-wrapper">
        <form onSubmit={onUpdate}>
          {/* Form field for name */}
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
          {/* Form field for email (read-only since it cannot be changed) */}
          <div className="mb-3">
            <label className="form-label font">Email</label>
            <input
              type="text"
              readOnly={true}
              className="form-control disable"
              name="email"
              id="email"
              value={userForm.email}
            />
          </div>
          {/* Repeat for other fields */}
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
          {/* Submit button */}
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

export default EditCustomer; // Export the component for use in other parts of the app
