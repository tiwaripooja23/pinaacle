import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

function Login() {
  const [userForm, setUserForm] = useState({
    email: "",
    pwd: "",
    balance: "",
  });
  // const [datas, setDatas] = useState({});
  const navigate = useNavigate(); // Create a navigate function
  let params = useParams();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserForm((prevUserForm) => ({
      ...prevUserForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    let matchingObjects;
    event.preventDefault();
    axios
    .get("http://localhost:4000/customers/")
    .then((res) => {
   localStorage.setItem("storedEmail",userForm.email);
      matchingObjects = res.data.data.filter(item => item.email === userForm.email);

      console.log(res,matchingObjects);

      if(userForm.email != "admin@email.com"){
        navigate('/detail/'+matchingObjects[0]._id);
      }else{
        navigate('/create-customer'); 
      }
      
    });


   
    // Replace '/dashboard' with the desired link
  };


  return (
    <MDBContainer className="my-5 gradient-form">
       <form onSubmit={handleSubmit}>
      <MDBRow>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{width: '185px'}} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1 font">We are The Pinnacle Bank</h4>
            </div>

            <h3 className='font mb-4'>Please login to your account</h3>


            <MDBInput wrapperClass='mb-4 font' label='Email address' id='email' type='email' name="email"     value={userForm.email}
                onChange={handleInputChange}/>
            <MDBInput wrapperClass='mb-4 font' label='Password' id='pwd' type='password' name="pwd" />


            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2">Sign in</MDBBtn>
              {/* <a className="text-muted" href="#!">Forgot password?</a> */}
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              {/* <p className="mb-0 font">Don't have an account?</p> */}
            </div>

          </div>

        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4 font">We are more than just a company</h4>
              <p class="small mb-0">At Lotus, we envision a future where banking is not just about transactions; it's about building lasting relationships. We aspire to be a beacon of stability and progress in the financial landscape, fostering economic growth and prosperity for our clients and the communities we serve.
              </p>
            </div>

          </div>

        </MDBCol>

      </MDBRow>
      </form>

    </MDBContainer>
  );
}

export default Login;