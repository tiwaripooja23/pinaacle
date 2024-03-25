import React from 'react';
import {
  MDBBtn, // Importing Button component from MDB React UI Kit
  MDBContainer, // Container component for layout
  MDBRow, // Row component for grid layout
  MDBCol, // Column component for grid layout
  MDBInput // Input component for forms
} from 'mdb-react-ui-kit'; // Importing from MDB React UI Kit for Material Design components
import { useEffect, useState } from "react"; // Import useEffect and useState hooks
import { useParams, useNavigate } from "react-router-dom"; // Import hooks for navigation and URL parameters

import axios from "axios"; // Import axios for making HTTP requests

function Login() {
  const [userForm, setUserForm] = useState({ // State for form data
    email: "",
    pwd: "",
    balance: "", // Although balance is initialized here, it doesn't seem to be used in this form
  });

  const navigate = useNavigate(); // Hook to programmatically navigate to other routes
  let params = useParams(); // Access URL parameters, not used in this component

  // Function to handle changes in input fields and update state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserForm((prevUserForm) => ({
      ...prevUserForm,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission action
    let matchingObjects;
    axios
      .get("http://localhost:4000/customers/")
      .then((res) => {
        localStorage.setItem("storedEmail", userForm.email); // Store email in local storage
        matchingObjects = res.data.data.filter(item => item.email === userForm.email); // Filter matching email objects

        console.log(res, matchingObjects); // Log for debugging

        // Conditional navigation based on user role
        if (userForm.email !== "admin@email.com") {
          navigate('/detail/' + matchingObjects[0]._id); // Navigate to user detail page
        } else {
          navigate('/create-customer'); // Navigate to create customer page for admin
        }
      });
  };

  return (
    <MDBContainer className="my-5 gradient-form"> {/* Styled container for the form */}
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column ms-5">
              {/* Login section with a form for email and password inputs */}
              <div className="text-center">
                {/* Logo and heading */}
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                  style={{width: '185px'}} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1 font">We are The Pinnacle Bank</h4>
              </div>

              <h3 className='font mb-4'>Please login to your account</h3>

              {/* Email input */}
              <MDBInput wrapperClass='mb-4 font' label='Email address' id='email' type='email' name="email" value={userForm.email} onChange={handleInputChange}/>
              {/* Password input */}
              <MDBInput wrapperClass='mb-4 font' label='Password' id='pwd' type='password' name="pwd" value={userForm.pwd} onChange={handleInputChange}/>

              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn className="mb-4 w-100 gradient-custom-2">Sign in</MDBBtn> {/* Sign in button */}
              </div>
            </div>
          </MDBCol>

          <MDBCol col='6' className="mb-5">
            {/* Promotional section with company info */}
            <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 class="mb-4 font">We are more than just a company</h4>
                <p class="small mb-0">At Lotus, we envision a future where banking is not just about transactions; it's about building lasting relationships. We aspire to be a beacon of stability and progress in the financial landscape, fostering economic growth and prosperity for our clients and the communities we serve.</p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </form>
    </MDBContainer>
  );
}

export default Login; // Export the component for use elsewhere in the application
