import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import CreateCustomer from "./components/CreateCustomer";
import EditCustomer from "./components/EditCustomer";
import CustomerList from "./components/CustomerList";
import Login from './components/login/Login';
import ViewDetail from "./components/detail";
import Transaction from "./components/Transaction";

function App() {
  const storedData = localStorage.getItem('storedEmail');
  console.log(storedData);
  return (
    <div className="App  commonbackground">
      <nav className="navbar navbar-expand-lg bg-body-tertiary bckground">
        <div className="container ">
          <Link to={"/create-customer"} className="nav-link font">
            Customer Bank App
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {storedData =="admin@email.com" ?
              <li className="nav-item">
                <Link to={"/create-customer"} className="nav-link font">
                  Create Customer
                </Link>
              </li>:<li></li>}
              {storedData =="admin@email.com" ?
                 <li className="nav-item">
                 <Link to={"/customer-list"} className="nav-link font">
                   Customer List
                 </Link>
               </li>:<li></li>
              }
            </ul>
          </div>
          <Link to={"/login"} className="nav-link font">
            Logout
          </Link>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="wrapper">
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

export default App;
