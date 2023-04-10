import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import {  useSelector } from "react-redux";

const OrdersList = () => {
  const [allOrders, setAllOrders] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
   
    axios
      .post("http://localhost:5000/orders/getCustomerOrders", {
        customerId: currentUser.id,
      })
      .then(function (response) {
        console.log(response.data.orders);
        setAllOrders(response.data.orders);
        //orders = response.data.orders;
        /* orders.map(e=>{
            console.log(e.orderLines);
            const orderLines =e.orderLines
            orderLines.map(orderLine=>{
                axios.get(`http://localhost:5000/products/prod/${orderLine.product}`).then(function (response) {
                
                ord.products.push(response.data);
                console.log(ord);
            }).catch(function (error) {
                console.log(error);
              });
            })
          })*/
        //
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [currentUser.id]);
  return (
    <main className="pt-5">
      <div className="container">
        {/* row */}
        <div className="row mb-8">
          <div className="col-lg-12">
            {/* page header */}
            <div>
              <h2>Previous Orders List</h2>
              {/* breacrumb */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a >Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Order List
                  </li>
                </ol>
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
                      {allOrders?.map((order, index) => {
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
                            <td>{order.orderDate}</td>
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
                                      <Link to={`/OrderDetail/${order._id}`}>Details</Link>
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
                <nav className="mt-2 mt-md-0">
                  <ul className="pagination mb-0 ">
                    <li className="page-item disabled">
                      <a className="page-link " >
                        Previous
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link active" >
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" >
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" >
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" >
                        Next
                      </a>
                    </li>
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

export default OrdersList;
