import React, { useEffect, useState } from "react"; // Import React, useEffect and useState hooks
import axios from "axios"; // Import axios for making HTTP requests
import { useParams, useNavigate } from "react-router-dom"; // Import hooks for routing

function CreateCustomer() {
  // State to hold form data
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    ssn: "",
    accountNumber: "",
    balance: "",
    pwds: "", // Added password to the form state but not used in submission
  });

  // Handler for form inputs to update the state
  const inputsHandler = (e) => {
    setUserForm((prevNext) => ({
      ...prevNext,
      [e.target.name]: e.target.value, // Update the value of the input field that was changed
    }));
  };

  let params = useParams(); // Hook to access the params of the current route
  let navigate = useNavigate(); // Hook to programmatically navigate

  // Handler for form submission
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    axios
      .post("http://localhost:4000/customers/create-customer", userForm) // Post form data to server
      .then((res) => {
        console.log(res.data); // Log the response from the server

        // Reset form state after submission
        setUserForm({
          name: "",
          email: "",
          ssn: "",
          accountNumber: "",
          balance: "",
          pwds: "",
        });
        navigate("/customer-list"); // Navigate to customer list page after submission
      });
  };

  useEffect(() => {
    // Effect hook to perform side effects, empty dependency array means it runs once on mount
  }, []);

  return (
    <div className="createCustomer">
      <div className="form-wrapper">
        <form onSubmit={onSubmit}>
          {/* Form fields for customer information with onChange to update state */}
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
          {/* Repeat for other fields */}
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
              required={true}
              id="accountNumber"
              value={userForm.accountNumber}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label font">Password</label>
            <input
              type="password" // Changed type to password to hide input
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

export default CreateCustomer; // Export the component for use in other parts of the app
