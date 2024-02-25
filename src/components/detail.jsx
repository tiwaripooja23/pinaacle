import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewDetail() {
  const [data, setData] = useState({});
  const  params  = useParams();
  console.log(params);


  useEffect(() => {
    axios
      .get("http://localhost:4000/customers/get-customer/" + params.id)
      .then((res) => {
        setData(res.data.data);
      });
  }, []);

  return (
    <div class="font detail">
      <h2>Account Details</h2>
      <div>
        <p>Welcome {data.name}</p>
        <p>ID: {data._id}</p>
        <p>Balance: ${data.balance}</p>
        <p>Account Number: {data.accountNumber}</p>
        <p>SSN: {data.ssn}</p>
        <h3>Transactions:</h3>
        <p>Wire: {"No Wire Transactions"}</p>
        <p>ACH: {"No ACH Transactions"}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
}

export default ViewDetail;
