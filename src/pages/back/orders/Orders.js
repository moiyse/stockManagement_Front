import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import {  useSelector } from "react-redux";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  useEffect(() => {
   
    axios
      .get("http://localhost:5000/orders/getAllOrders")
      .then(function (response) {
        console.log(response.data.orders);
        setAllOrders(response.data.orders);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [currentUser.id]);
  return (
    <main className="main-content-wrapper">
      <div className="container">
        {/* row */}
        <div className="row mb-8">
          <div className="col-lg-12">
            {/* page header */}
            <div>
              <h2>Previous Orders List</h2>
              {/* breacrumb */}
              <nav aria-label="breadcrumb">
                
              </nav>
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          <div className="col-xl-12 col-12 mb-5">
            {/* card */}
            <div className="card h-100 card-lg">
              <div className=" p-6 ">
                <div className="row justify-content-between"></div>
              </div>
              {/* card body */}
              <div className="card-body p-0">
                {/* table responsive */}
                <div className="table-responsive">
                  <table className="table table-centered table-hover text-nowrap table-borderless mb-0 table-with-checkbox">
                    <thead className="bg-light">
                      <tr>
                        <th>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="checkAll"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="checkAll"
                            ></label>
                          </div>
                        </th>
                        <th>Customer</th>
                        <th>Date &amp; TIme</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {allOrders?.slice(startIndex,endIndex).map((order, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue
                                  id="orderOne"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="orderOne"
                                ></label>
                              </div>
                            </td>

                            <td>{currentUser.username}</td>
                            
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>{order.paymentMethod}</td>
                            <td>
                              <span className="badge bg-light-primary text-dark-primary">
                                {order.status}
                              </span>
                            </td>
                            <td>{order.totalAmount} DT</td>
                            <td>
                              <div className="dropdown">
                                <a
                                 
                                  className="text-reset"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="feather-icon icon-more-vertical fs-5" />
                                </a>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a className="dropdown-item">
                                      <i className="bi bi-pencil-square me-3 " />
                                      <Link to={`/dashboard/OrderDetail/${order._id}`}>Details</Link>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="border-top d-md-flex justify-content-between align-items-center p-6">
                <span>Orders: {allOrders.length}</span>
                <nav aria-label="Page navigation">
                                      <ul className="pagination">
                                      {(startIndex>1)  && 
                                      <li className="page-item ">
                                        <a className="page-link " onClick={() => setCurrentPage(currentPage - 1)}>
                                          Previous</a>
                                      </li>}
                                      {(currentPage===1)  && 
                                      <li className="page-item disabled">
                                        <a className="page-link " >
                                          Previous</a>
                                      </li>}
                                        {Array.from({ length: Math.ceil(allOrders.length / itemsPerPage) }, (_, i) => (
                                          <li
                                            key={i}
                                            className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
                                            onClick={() => setCurrentPage(i + 1)}
                                          >
                                            <span className="page-link">{i + 1}</span>
                                          </li>
                                        ))}
                                        { (endIndex<allOrders.length)  &&                                    
                                          <li className="page-item">
                                            <a className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</a></li>
                                        
                                        }
                                        { (endIndex>=allOrders.length)  &&                                    
                                          <li className="page-item disabled">
                                            <a className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</a></li>
                                        
                                        }
                                      </ul>
                                    </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    
  );
};

export default Orders;
