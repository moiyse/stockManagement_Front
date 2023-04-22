import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../../../utils/HelperFunction";

const Coupons = (props) => {
  const navigate = useNavigate();

  const [allCoupons, setAllCoupons] = useState([]);
  const [searchQueryByCouponCode, setSearchQueryByCouponCode] = useState("");

  const [stock, setStock] = useState("");
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

 

  useEffect(() => {
    const searchObject = { name: searchQueryByCouponCode };
    const sObject = { inStock: stock };
   if (searchQueryByCouponCode?.length > 0) {
     
      axios
        .post(
          "http://localhost:5000/orders/searchCouponByCode",
          {code :searchObject.name}
        )
        .then((res) => {
          setAllCoupons(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get("http://localhost:5000/orders/getAllCoupons")
        .then((res) => {
          setAllCoupons(res.data);
          
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchQueryByCouponCode, currentPage, itemsPerPage]);

  const editProduct = (id) => {
    if (id) {
      console.log(id);
      navigate("/dashboard/editCoupon", { state: { id } });
    }
  };

  const deleteCoupon = (id) => {
    axios
      .post(`http://localhost:5000/orders/deleteCoupon`,{
        id
      })
      .then((res) => {
        axios.get("/orders/getAllCoupons").then((res) => {
          setAllCoupons(res.data);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <main className="main-content-wrapper">
        <div className="container">
          <div className="row mb-8">
            <div className="col-md-12">
              {/* page header */}
              <div className="d-md-flex justify-content-between align-items-center">
                <div>
                  <h2>Coupons </h2>
                </div>
                {/* button */}

                <div>
                  <Link to="/dashboard/addCoupon">
                    <a className="btn btn-primary">Add Coupon</a>{" "}
                  </Link>
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
                      <form className="d-flex" role="search">
                        <input
                          className="form-control"
                          type="search"
                          placeholder="Search Coupons"
                          aria-label="Search"
                          value={searchQueryByCouponCode}
                          onChange={(e) =>
                            setSearchQueryByCouponCode(e.target.value)
                          }
                        />
                      </form>
                    </div>
                    {/* select option */}
                    <div className="col-lg-2 col-md-4 col-12">
                      
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
                          <th>Code</th>
                          <th>Discount</th>
                          <th>Max Uses</th>
                          <th>Used Times</th>
                          <th>Expiration Date</th>
                          <th>Update Date</th>
                          <th>Action</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {allCoupons
                          ?.slice(startIndex, endIndex)
                          .map((coupon, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      defaultValue
                                      id="couponOne"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="couponOne"
                                    ></label>
                                  </div>
                                </td>
                               
                                <td>#{coupon.code}</td>
                                <td>
                                  <a href="#" className="text-reset">
                                    {coupon.discount}
                                  </a>
                                </td>

                                <td>{coupon.maxUses}</td>
                                
                                  
                                <td style={{ textAlign: "center" }}>
                                  {coupon.usedCount}
                                </td>
                             
                                <td style={{ textAlign: "center" }}>
                               
                                  {new Date(
                                    coupon.expiresAt
                                  ).toLocaleDateString()}
                                </td>
                                <td style={{ textAlign: "center" }}>
                               
                                  {new Date(
                                    coupon.updatedAt
                                  ).toLocaleDateString()}
                                </td>
                                <td>
                                
                                  <div
                                    className="dropd
                              own"
                                  >
                                    <a
                                      href="#"
                                      className="text-reset"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="feather-icon icon-more-vertical fs-5" />
                                    </a>
                                    <ul className="dropdown-menu">
                                      <li
                                        onClick={() =>
                                          deleteCoupon(coupon._id)
                                        }
                                      >
                                        <a className="dropdown-item">
                                          <i className="bi bi-trash me-3" />
                                          Delete
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          onClick={() =>
                                            editProduct(coupon._id)
                                          }
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="bi bi-pencil-square me-3 " />
                                          Edit
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="10">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                Showing{" "}
                                {Math.min(itemsPerPage, allCoupons.length)} of{" "}
                                {allCoupons.length} Coupons
                              </div>
                              <div>
                                <nav aria-label="Page navigation">
                                  <ul className="pagination">
                                    {startIndex > 1 && (
                                      <li className="page-item ">
                                        <a
                                          className="page-link "
                                          onClick={() =>
                                            setCurrentPage(currentPage - 1)
                                          }
                                        >
                                          Previous
                                        </a>
                                      </li>
                                    )}
                                    {currentPage === 1 && (
                                      <li className="page-item disabled">
                                        <a className="page-link ">Previous</a>
                                      </li>
                                    )}
                                    {Array.from(
                                      {
                                        length: Math.ceil(
                                          allCoupons.length / itemsPerPage
                                        ),
                                      },
                                      (_, i) => (
                                        <li
                                          key={i}
                                          className={`page-item ${
                                            i + 1 === currentPage
                                              ? "active"
                                              : ""
                                          }`}
                                          onClick={() => setCurrentPage(i + 1)}
                                        >
                                          <span className="page-link">
                                            {i + 1}
                                          </span>
                                        </li>
                                      )
                                    )}
                                    {endIndex < allCoupons.length && (
                                      <li className="page-item">
                                        <a
                                          className="page-link"
                                          onClick={() =>
                                            setCurrentPage(currentPage + 1)
                                          }
                                        >
                                          Next
                                        </a>
                                      </li>
                                    )}
                                    {endIndex >= allCoupons.length && (
                                      <li className="page-item disabled">
                                        <a
                                          className="page-link"
                                          onClick={() =>
                                            setCurrentPage(currentPage + 1)
                                          }
                                        >
                                          Next
                                        </a>
                                      </li>
                                    )}
                                  </ul>
                                </nav>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Coupons;
