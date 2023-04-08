import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import { useParams } from "react-router-dom";
function Stock(){
    const [open, setOpen] = useState(false);
    const [stock,setStock] = useState({quantity : 0});

    const [stockHistories, setStockHistories] = useState([]);
    const { id } = useParams();
    useEffect(() => {
      const fetchStockHistories = async () => {
        console.log(stock)
        const response = await axios.get(`/products/prod/stockHistories/${id}`);
        setStockHistories(response.data);
        console.log(response.data)

      };
      fetchStockHistories();
    }, []);
    const addToStock = async ()=>{
        try {
            const response = await axios.post(`/products/prod/addToStock/${id}` , stock);
            console.log(response.data); // Assuming that the server returns some data upon successful addition to stock
          } catch (error) {
            console.error(error);
          }    }
    const handleChangeQuantity = (e) => {
        console.log(e.target.value)
        setStock({quantity :e.target.value});
      };
      const removeFromStock = async ()=>{
        try {
            const response = await axios.post(`/products/prod/removeFromStock/${id}` , stock);
            console.log(response.data); // Assuming that the server returns some data upon successful addition to stock
          } catch (error) {
            console.error(error);
          }    }

    return(
<main className="main-content-wrapper">
        <div className="container">
          <div className="row mb-8">
            <div className="col-md-12">
              {/* page header */}
              <div className="d-md-flex justify-content-between align-items-center">
                <div>
                  <h2>Products</h2>
                  {/* breacrumb */}
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                      <li className="breadcrumb-item"><a href="#" className="text-inherit">Dashboard</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Products</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          {/* row */}
          <div className="row ">
            <div className="col-xl-12 col-12 mb-5">
              {/* card */}
              <div className="card h-100 card-lg">
                <div className="px-6 py-6 ">
                  <div className="row justify-content-between">
                    {/* form */}
                    <div className="col-lg-4 col-md-6 col-12 mb-2 mb-lg-0">
                    <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Update the stock
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
<br/>
      
                        <input className="form-control" type="number" placeholder="Enter the qunatity" aria-label="Search" onChange={handleChangeQuantity}/>
                        <br/>
                        <Button
        aria-controls="example-collapse-text" className="m-1"         onClick={addToStock}
        >
Add      </Button>
<Button className="btn btn-secondary"
        aria-controls="example-collapse-text"
        onClick={removeFromStock}  >
Remove      </Button>
                  
        </div>
      </Collapse>

                    </div>
                    {/* select option */}
                    <div className="col-lg-2 col-md-4 col-12">
                      <select className="form-select">
                        <option selected>Action</option>
                        <option defaultValue={1}>Add</option>
                        <option defaultValue={2}>Remove</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* card body */}
                <div className="card-body p-0">
                  {/* table */}
                  <div className="table-responsive">
                    <table className="table table-centered table-hover text-nowrap table-borderless mb-0 table-with-checkbox">
                      <thead className="bg-light">
                        <tr>

                          <th>Actual quantity</th>
                          <th>Action</th>
                          <th>Added quantity</th>
                          <th>Removed quantity</th>
                          <th>Create at</th>

                          <th />
                        </tr>
                      </thead>
                      <tbody>

                        
                        {stockHistories.map((stockHistories) => (
                            <tr key={stockHistories._id}>
                          <td>{stockHistories.newValue}</td>
                          <td>
                           { stockHistories.action=="add" ? <span className="badge bg-light-primary text-dark-primary">{stockHistories.action}</span>
                           : <span className="badge bg-light-danger text-dark-danger">{stockHistories.action}</span> }
                           
                          </td>
                          { stockHistories.action == "add" ? <td>{stockHistories.quantity}</td> : <td>-</td> }
                          { stockHistories.action == "remove" ? <td>{stockHistories.quantity}</td> : <td>-</td> }
                          <td>{stockHistories.createdAt}</td>
                          </tr>
                          ))}
                      

                      </tbody>
                    </table>
                  </div>
                </div>
                <div className=" border-top d-md-flex justify-content-between align-items-center px-6 py-6">
                  <span>Showing 1 to 8 of 12 entries</span>
                  <nav className="mt-2 mt-md-0">
                    <ul className="pagination mb-0 ">
                      <li className="page-item disabled"><a className="page-link " href="#!">Previous</a></li>
                      <li className="page-item"><a className="page-link active" href="#!">1</a></li>
                      <li className="page-item"><a className="page-link" href="#!">2</a></li>
                      <li className="page-item"><a className="page-link" href="#!">3</a></li>
                      <li className="page-item"><a className="page-link" href="#!">Next</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}
export default Stock;