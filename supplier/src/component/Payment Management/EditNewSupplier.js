import React, { useState, useEffect } from "react";
import axios from "axios";
import {useHistory } from "react-router-dom"
import Header from '../Dashboard/Header/Header'
import Swal from 'sweetalert2';

export default function EditNewSupplier(props) {

    const [id, setId] = useState("");
    const [PaymentStatus, setStatus] = useState("");
    const history = useHistory();
    const [token, setToken] = useState("");
    //const [contactNumberValid, setContactNumberValid] = useState(false);
 
      

    useEffect(() => {
      // Function to fetch token from local storage on component mount
      const fetchToken = () => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
        }
      };
      fetchToken(); // Call fetchToken function
    }, []);

    useEffect(() => {
        const supplierId = props.match.params.id;

        axios.get(`http://localhost:8070/supplier/${supplierId}`).then((res) => {
      const supplier = res.data.supplier;

      setId(supplier._id);
      setStatus(supplier.PaymentStatus) 
    });
  }, [props.match.params.id]);

  function sendData(e) {
    e.preventDefault();
  
    
  
    const updateSupplier = {
        PaymentStatus
    };
  
    axios.put(`http://localhost:8070/supplier/update/${id}`, updateSupplier,{
      headers: {
        Authorization: `Bearer ${token}` // Attach token to request headers
      }
    })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Supplier Record Updated',
          text: 'Supplier record has been successfully updated!',
          showConfirmButton: true,
          confirmButtonText: 'Go to Request Product'
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/SupplierPayment");
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Cannot update.'
        });
        console.error(err);
      });
  }
  
  return (
    <div>
       <Header/>
<div className="container" id="editContainer">
      <form onSubmit={sendData} style={{position:"relative", width:"65%"}}>
        <h2 id="AllSupplier">Update Payment Status</h2>
        <br></br>
        <div className="row">
            <div className="col-md-4">
        <div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Payment Status</label>
<select className="form-select" aria-label="Default select example"  id="exampleInputPassword1"
  onChange={(e) =>{

    setStatus(e.target.value);
    }}
>
  <option selected>Open this select menu</option>
  <option value="Paid">Paid</option>
 
</select>
</div>
</div>

<div className="col-md-3">

        <button type="submit" className="btn btn-success" style={{ marginTop: "35px", borderRadius:"20px", marginLeft:"-40%" }}>
          <i className="far fa-check-square"></i>
          &nbsp; Update
        </button>
        </div>
        </div>
      </form>
    </div>
      
    </div>
  )
}


// pattern="^\d{10}$"
//               title="Please enter a 10-digit number"  // Tooltip message
//                             onChange={(e) => {
//                                 setPhone(e.target.value);
//                                 setContactNumberValid(/^\d{10}$/.test(e.target.value));
//                             }} />
//                         {!contactNumberValid && (
//                             <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>Please enter a valid 10-digit number</p>
//                         )}