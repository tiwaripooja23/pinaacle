// Import necessary libraries and components
import React from "react"; // React library for building UI components
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styling
import "./App.css"; // Custom CSS for additional styling
import { Routes, Route, Link } from "react-router-dom"; // Components for routing
import CreateCustomer from "./components/CreateCustomer"; // Component to create a new customer
import EditCustomer from "./components/EditCustomer"; // Component to edit an existing customer
import CustomerList from "./components/CustomerList"; // Component to display list of customers
import Login from './components/login/Login'; // Login component
import ViewDetail from "./components/detail"; // Component to view details of a customer
import Transaction from "./components/Transaction"; // Component to handle transactions

function App() {
  // Retrieve the stored email from local storage to check if an admin is logged in
  const storedData = localStorage.getItem('storedEmail');
  console.log(storedData); // Log the retrieved email to the console
  
  return (
    <div className="App commonbackground">
      {/* Navigation bar setup */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary bckground">
        <div className="container">
          {/* Link to the home page or dashboard */}
          <Link to={"/create-customer"} className="nav-link font">
            Customer Bank App
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* Conditionally render navigation items based on the logged-in user's role */}
              {storedData === "admin@email.com" ? (
                <li className="nav-item">
                  <Link to={"/create-customer"} className="nav-link font">
                    Create Customer
                  </Link>
                </li>
              ) : (
                <li></li>
              )}
              {storedData === "admin@email.com" ? (
                <li className="nav-item">
                  <Link to={"/customer-list"} className="nav-link font">
                    Customer List
                  </Link>
                </li>
              ) : (
                <li></li>
              )}
            </ul>
          </div>
          {/* Link for logging out */}
          <Link to={"/login"} className="nav-link font">
            Logout
          </Link>
        </div>
      </nav>

      {/* Main content area */}
      <div className="container mt-5">
        <div className="wrapper">
          {/* Define routes for different pages in the app */}
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/create-customer" element={<CreateCustomer />} />
            <Route exact path="/edit-customer/:id" element={<EditCustomer />} />
            <Route exact path="/customer-list" element={<CustomerList />} />
            <Route exact path="/detail/:id" element={<ViewDetail />} />
            <Route exact path="/transactions" element={<Transaction />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App; // Export the App component for use in index.js