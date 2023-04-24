import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { notify } from "../../../utils/HelperFunction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderDetail = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  function cancelOrder() {
    axios
      .post("http://localhost:5000/orders/updateOrderStatusToCanceled", {
        orderId: orderId,
      })
      .then(function (response) {
        notify("Order Canceled Succesfully !", toast, "success");
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function downloadInvoice() {
    axios
      .post(
        "http://localhost:5000/orders/exportOrderInvoice",
        {
          orderId: orderId,
        },
        {
          responseType: "blob",
        }
      )
      .then(function (response) {
        // Create a new window or tab and load the PDF file into it
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);

        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    console.log(orderId);
    axios
      .post("http://localhost:5000/orders/orderInfo", {
        orderId: orderId,
      })
      .then(function (response) {
        const orderInfo = response.data.order[0];
        setOrder(response.data.order[0]);
        const productPromises = orderInfo.orderLines.map((orderLine) =>
          axios
            .get(`http://localhost:5000/products/prod/${orderLine.product}`)
            .then(function (response) {
              console.log(response);
              const res = { ...response.data, quantity: orderLine.quantity };
              console.log(res);
              return res;
            })
            .catch(function (error) {
              console.log(error);
            })
        );
        Promise.all(productPromises).then((products) => setProducts(products));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <main className="pt-5">
      <ToastContainer />
      {/* container */}
      <div className="container">
        {/* row */}
        <div className="row mb-8">
          <div className="col-md-12">
            <div className="d-md-flex justify-content-between align-items-center">
              <div>
                {/* page header */}
                <h2>Order Details</h2>
                {/* breacrumb */}
                <nav aria-label="breadcrumb"></nav>
              </div>
              {/* button */}
              <div>
                <a className="btn btn-primary">
                  <Link to={`/ordersList/`}>Back to all orders</Link>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row ">
          <div className="col-xl-12 col-12 mb-5">
            {/* card */}
            <div className="card h-100 card-lg">
              <div className="card-body p-6">
                <div className="d-md-flex justify-content-between">
                  <div className="d-flex align-items-center mb-2 mb-md-0">
                    <h2 className="mb-0">Order status: </h2>
                    <span className="badge bg-light-warning text-dark-warning ms-2">
                      {order.status}
                    </span>
                  </div>
                  {/* select option */}
                  <div className="d-md-flex">
                    {/* button */}
                    <div className="ms-md-3">
                      <a
                        className="btn btn-danger mx-2"
                        onClick={() => cancelOrder()}
                      >
                        Cancel Order
                      </a>
                      <a
                        className="btn btn-secondary"
                        onClick={() => downloadInvoice()}
                      >
                        Download Invoice
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="row">
                    {/* address */}
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="mb-6">
                        <h6>Customer Details</h6>
                        <p className="mb-1 lh-lg">
                          {currentUser.username}
                          <br />
                          {currentUser.email}
                          <br />
                          +216 {currentUser.phoneNumber}
                        </p>
                        <Link to={"/settings"}>
                          <a>View Profile</a>
                        </Link>
                      </div>
                    </div>

                    {/* address */}
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="mb-6">
                        <h6>Order Details</h6>
                        <p className="mb-1 lh-lg">
                          Order ID:{" "}
                          <span className="text-dark">{order._id}</span>
                          <br />
                          Order Date:{" "}
                          <span className="text-dark">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </span>
                          <br />
                          Order Total:{" "}
                          <span className="text-dark">
                            {order.totalAmount} DT
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="table-responsive">
                    {/* Table */}
                    <table className="table mb-0 text-nowrap table-centered">
                      {/* Table Head */}
                      <thead className="bg-light">
                        <tr>
                          <th>Products</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      {/* tbody */}
                      <tbody>
                        {products?.map((product, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <a className="text-inherit">
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <img
                                        src="../assets/images/products/product-img-1.jpg"
                                        alt=""
                                        className="icon-shape icon-lg"
                                      />
                                    </div>
                                    <div className="ms-lg-4 mt-2 mt-lg-0">
                                      <h5 className="mb-0 h6">
                                        {product?.name}
                                      </h5>
                                    </div>
                                  </div>
                                </a>
                              </td>
                              <td>
                                <span className="text-body">
                                  {product?.price}
                                </span>
                              </td>
                              <td>{product?.quantity}</td>
                              <td>{product?.price * product?.quantity}</td>
                            </tr>
                          );
                        })}

                        <tr>
                          <td className="border-bottom-0 pb-0" />
                          <td className="border-bottom-0 pb-0" />
                          <td colSpan={1} className="fw-medium text-dark ">
                            {/* text */}
                            Sub Total :
                          </td>
                          <td className="fw-medium text-dark ">
                            {/* text */}
                            {order.totalAmount} DT
                          </td>
                        </tr>
                        <tr>
                          <td className="border-bottom-0 pb-0" />
                          <td className="border-bottom-0 pb-0" />
                          <td colSpan={1} className="fw-medium text-dark ">
                            {/* text */}
                            Shipping Cost
                          </td>
                          <td className="fw-medium text-dark  ">
                            {/* text */}
                            10.00 DT
                          </td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td colSpan={1} className="fw-semi-bold text-dark ">
                            {/* text */}
                            Grand Total
                          </td>
                          <td className="fw-semi-bold text-dark ">
                            {/* text */}
                            {order?.totalAmount + 10} DT
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="card-body p-6">
                <div className="row">
                  <div className="col-md-6 mb-4 mb-lg-0">
                    <h6>Payment Info</h6>
                    <span className="badge bg-light-info text-dark-warning ms-2">
                      {order.paymentMethod}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <h5>Notes</h5>
                    <textarea
                      className="form-control mb-3"
                      rows={3}
                      placeholder="Write note for order"
                      defaultValue={""}
                    />
                    <a className="btn btn-primary">Save Notes</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderDetail;
