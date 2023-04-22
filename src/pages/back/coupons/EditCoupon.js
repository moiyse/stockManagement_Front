import { Link,useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { notify } from "../../../utils/HelperFunction";
const EditCoupon = (props) => {
    const [coupon, setCoupon] = useState({
        id:"",
        code: "",
        discound: 0,
        maxUses: 0,
        usedCount: 0,
        expiresAt: "",
      });
const location = useLocation();
const id = location.state?.id;

useEffect(()=>{
    console.log(location.state);
    axios
      .post("http://localhost:5000/orders/getCouponById", {id:id})
      .then(function (response) {
        console.log(response.data);
        setCoupon(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
},[])

  const handleChange = (e) => {
    console.log(coupon);
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/orders/updateCoupon", {...coupon,id:coupon._id})
      .then(function (response) {
        console.log(response.data);
        
        notify('Coupon Updated Succesfully!' ,toast, "success")
        //navigate("/admin/categories")
      })
      .catch((error) => {
        console.log(error);
        notify('Failed to updated coupon try again!' ,toast, "error")
      });
  };

  return (
    <main className="main-content-wrapper">
               <ToastContainer />

      {/* container */}
      <div className="container">
        {/* row */}
        <div className="row mb-8">
          <div className="col-md-12">
            <div className="d-md-flex justify-content-between align-items-center">
              {/* page header */}
              <div>
                <h2>Edit Coupon</h2>
                {/* breacrumb */}
                <nav aria-label="breadcrumb"></nav>
              </div>
              <div>
                <Link to="/dashboard/coupons">
                  <a href="categories.html" className="btn btn-secondary">
                    Back to Coupons List
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-12">
            {/* card */}
            <div className="card mb-6 shadow border-0">
              <form onSubmit={handleSubmit}>
                <div className="card-body p-6 ">
                  <h4 className="mb-4 h5 mt-5">Coupon Informations</h4>
                  <div className="row">
                    {/* input */}
                    <div className="mb-3 col-lg-6">
                      <label className="form-label">Coupon Code*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Coupon Code*"
                        name="code"
                        value={coupon.code}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>

                    {/* input */}
                    <div className="mb-3 col-lg-12 ">
                      <label className="form-label">Discount*</label>
                      <input
                        type="number"
                        className="form-control"
                        name="discount"
                        value={coupon.discount}
                        placeholder="Discound*"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="mb-3 col-lg-12 ">
                      <label className="form-label">Maximum use times*</label>
                      <input
                        type="number"
                        className="form-control"
                        name="maxUses"
                        value={coupon.maxUses}
                        placeholder="Max Uses *"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="mb-3 col-lg-12 ">
                      <label className="form-label">Expiration date*</label>
                      <input
                        type="date"
                        className="form-control"
                        name="expiresAt"
                        value={new Date(
                            coupon.expiresAt
                          )}
                        placeholder="Expiration date *"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="col-12">
                    <div className="d-flex flex-column align-items-center">
                    <button type="submit" className="btn btn-light-primary">
                        Update</button>
                        </div>
                        </div>
                  </div>
                </div>
              </form>
              {/* card body */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default EditCoupon;
