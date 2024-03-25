// Import necessary hooks and libraries
import React, { useEffect, useState } from 'react'; // React core features
import { useParams } from 'react-router-dom'; // Hook to access route parameters
import axios from 'axios'; // Library for making HTTP requests

function ViewDetail() {
  const [data, setData] = useState({}); // State for storing the customer data
  const params = useParams(); // Access the current route parameters
  console.log(params); // Log the route parameters for debugging

  // Effect hook to fetch customer data when the component mounts
  useEffect(() => {
    // Make a GET request to fetch data of a specific customer using their ID
    axios.get("http://localhost:4000/customers/get-customer/" + params.id)
      .then((res) => {
        // Update state with the fetched data
        setData(res.data.data);
      });
  }, []); // Empty dependency array means this effect runs only once after the initial render

  // Render the customer's detail
  return (
    <div className="font detail">
      <h2>Account Details</h2>
      <div>
        {/* Display the fetched customer data */}
        <p>Welcome {data.name}</p> {/* Customer's name */}
        <p>ID: {data._id}</p> {/* Customer's ID */}
        <p>Balance: ${data.balance}</p> {/* Account balance */}
        <p>Account Number: {data.accountNumber}</p> {/* Account number */}
        <p>SSN: {data.ssn}</p> {/* Customer's SSN */}
        <h3>Transactions:</h3>
        {/* Placeholder text for transactions. Actual transactions could be fetched and displayed here. */}
        <p>Wire: {"No Wire Transactions"}</p>
        <p>ACH: {"No ACH Transactions"}</p>
        {/* Add more fields as needed to display other relevant information */}
      </div>
    </div>
  );
}

export default ViewDetail; // Export the component for use elsewhere in the application
