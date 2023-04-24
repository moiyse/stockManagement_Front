import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import {  toast } from "react-toastify";
import { notify } from "../../../utils/HelperFunction";
import { Rating } from 'react-simple-star-rating';
import { useParams } from 'react-router-dom';
import {  useSelector } from "react-redux";


const ProductDetail = (props) => {
    const navigate = useNavigate();

    const { productId } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [name, setName] = useState("");   


    const [product, setProduct] = useState({});


  const [ratingValue, setRatingValue] = useState(0);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [review, setReview] = useState({});
  const [reviews, setReviews] = useState([]);
  const [stars, setStars] = useState(0);

  const [reviewMessage, setReviewMessage] = useState("");
  const [headline, setHeadline] = useState("");
  const [error, setError] = useState(null);
  const [seeMore, setSeeMore] = useState(2);


  const handleRating = (rate) => {
    setRatingValue(rate);
  };
  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/products/prod/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct(); // call the async function
  }, [id]);

  useEffect(() => {
    if (product && product.stars) {
      // check if product and stars exist
      setStars(product.stars);
    }
  }, [product]); // watch for changes in the product state

    const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    
    if (quantity < product.quantity) {
        setQuantity(quantity + 1);
      }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addReview = async () => {

    setReview({
      username: currentUser.username,
      image: currentUser.image,
      rating: ratingValue,
      review: reviewMessage,
      headline: headline,
    });
    try {
      const response = await axios.post(`/products/prod/addReview/${id}`, {
        username: currentUser.username,
        image: currentUser.image,
        rating: ratingValue,
        review: reviewMessage,
        headline: headline,
      });
      document.getElementById("myForm").reset(); // reset the form
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(`/products/prod/reviews/${id}`);
      setReviews(response.data);
    };
    fetchReviews();
  }, [() => review]);


  const handleSeeMore = () => {
    setSeeMore((prevState) => prevState + 2);
  };
  return (
    <>
      <div>
        <div className="container">
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div
              className="modal-content "
              style={{ paddingTop: "150 px", marginTop: "150 px" }}
            >
              <div className="modal-body p-8">
                <div className="position-absolute top-0 end-0 me-3 mt-3">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    {/* img slide */}

                    <div className='product productModal' id='productModal'>
                      <div
                        className='zoom'
                        
                      >
                        {/* img */}
                        <img
                          src={`http://localhost:5002/productUploads/${product.image}`}
                          alt=''

                        />
                      </div>
                    </div>
                    {/* product tools
                    <div className='product-tools'>
                      <div
                        className='thumbnails row g-3'
                        id='productModalThumbnails'
                      >
                        <div className='col-3'>
                          <div className='thumbnails-img'>
                           
                            <img
                              src='../assets/images/products/product-single-img-1.jpg'
                              alt=''
                            />
                          </div>
                        </div>
                        <div className='col-3'>
                          <div className='thumbnails-img'>
                            
                            <img
                              src='../assets/images/products/product-single-img-2.jpg'
                              alt=''
                            />
                          </div>
                        </div>
                        <div className='col-3'>
                          <div className='thumbnails-img'>
                         
                            <img
                              src='../assets/images/products/product-single-img-3.jpg'
                              alt=''
                            />
                          </div>
                        </div>
                        <div className='col-3'>
                          <div className='thumbnails-img'>
                           
                            <img
                              src='../assets/images/products/product-single-img-4.jpg'
                              alt=''
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  */}
                  </div>


                  <div className="col-lg-6">
                    <div className="ps-lg-8 mt-6 mt-lg-0">
                      <a href="#!" className="mb-4 d-block">
                        {" "}
                      </a>
                      <h2 className="mb-1 h1">{product.name} </h2>
                      <div className="mb-4">
                        {!isNaN(stars) && (
                          <>
                            {[...Array(Math.floor(stars))].map((_, index) => (
                              <i
                                key={index}
                                className="bi bi-star-fill text-warning"
                              ></i>
                            ))}
                            {stars % 1 !== 0 && (
                              <i
                                key={Math.floor(stars) + "-half"}
                                className="bi bi-star-half text-warning"
                              ></i>
                            )}
                            {[...Array(5 - Math.ceil(stars))].map(
                              (_, index) => (
                                <i
                                  key={Math.ceil(stars) + index}
                                  className="bi bi-star text-warning"
                                ></i>
                              )
                            )}
                          </>
                        )}{" "}
                        {stars}
                        <a href="#" className="ms-2">
                          ({product.nbReviewers} reviews)
                        </a>
                      </div>
                      <div className="fs-4">
                        <span className="fw-bold text-dark">
                          {product.reduction} DT{" "}
                        </span>
                        <span className="text-decoration-line-through text-muted">
                          {" "}
                          {product.price} DT
                        </span>
                        <span></span>
                      </div>
                      <hr className="my-6" />
                      {/*<div className="mb-4">


                            <button type="button" className="btn btn-outline-secondary">
                            250g
                            </button>
                            <button type="button" className="btn btn-outline-secondary">
                            500g
                            </button>
                            <button type="button" className="btn btn-outline-secondary">
                            1kg
                            </button>
                         </div>*/}
                      <div>
                        {/* quantity */}
                        <div className="input-group input-spinner">
                          <input
                            type="button"
                            value="-"
                            className="button-minus btn btn-sm"
                            data-field="quantity"
                            onClick={handleDecrement}
                          />
                          <input
                            type="number"
                            step="1"
                            max="10"
                            value={quantity}
                            name="quantity"
                            className="quantity-field form-control-sm form-input"
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                          />
                          <input
                            type="button"
                            value="+"
                            className="button-plus btn btn-sm"
                            data-field="quantity"
                            onClick={handleIncrement}
                          />
                        </div>
                      </div>
                      <div className="mt-3 row justify-content-start g-2 align-items-center">
                        <div className="col-lg-4 col-md-5 col-6 d-grid">
                          {/* button */}
                          {/* btn */}
                          <button type="button" className="btn btn-primary">
                            <i className="feather-icon icon-shopping-bag me-2" />
                            Add to cart
                          </button>
                        </div>
                        <div className="col-md-4 col-5">
                          {/* btn */}
                          <a
                            className="btn btn-light"
                            href="#"
                            data-bs-toggle="tooltip"
                            data-bs-html="true"
                            aria-label="Compare"
                          >
                            <i className="bi bi-arrow-left-right" />
                          </a>
                          <a
                            className="btn btn-light"
                            href="#!"
                            data-bs-toggle="tooltip"
                            data-bs-html="true"
                            aria-label="Wishlist"
                          >
                            <i className="feather-icon icon-heart" />
                          </a>
                        </div>
                      </div>
                      <hr className="my-6" />
                      <div>
                        <table className="table table-borderless">
                          <tbody>
                            <tr>
                              <td>Product Code:</td>
                              <td>#{product.code} </td>
                            </tr>
                            <tr>
                              <td>Availability:</td>
                              <td>
                                {product?.inStock ? "In Stock" : "Out of Stock"}
                              </td>
                            </tr>
                            <tr>
                              <td>Create at:</td>
                              <td>
                                {new Date(product.addedDate).toLocaleString()}
                              </td>
                            </tr>
                            <tr>
                              <td>Description:</td>
                              <td>{product.description}.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <section className="mt-lg-14 mt-8 ">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul
                className="nav nav-pills nav-lb-tab"
                id="myTab"
                role="tablist"
              >
                {/* nav item */}
                <li className="nav-item" role="presentation">
                  {/* btn */}{" "}
                  <button
                    className="nav-link"
                    id="reviews-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#reviews-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="reviews-tab-pane"
                    aria-selected="false"
                  >
                    Reviews
                  </button>

                </li>

              </ul>
              {/* tab content */}
              <div className="tab-content" id="myTabContent">
                {/* tab pane */}

                <div
                  className="tab-pane fade"
                  id="reviews-tab-pane"
                  role="tabpanel"
                  aria-labelledby="reviews-tab"
                  tabIndex={0}
                >

                  <div className="my-8">
                    {/* row */}
                    <div className="row">
                      <div className="col-md-4">
                        <div className="me-lg-12 mb-6 mb-md-0">
                          <div className="mb-5">
                            {/* title */}
                            <h4 className="mb-3">Customer reviews</h4>
                            <span>

                              {!isNaN(stars) && (
                                <>
                                  {[...Array(Math.floor(stars))].map(
                                    (_, index) => (
                                      <i
                                        key={index}
                                        className="bi bi-star-fill text-warning"
                                      ></i>
                                    )
                                  )}
                                  {stars % 1 !== 0 && (
                                    <i
                                      key={Math.floor(stars) + "-half"}
                                      className="bi bi-star-half text-warning"
                                    ></i>
                                  )}
                                  {[...Array(5 - Math.ceil(stars))].map(
                                    (_, index) => (
                                      <i
                                        key={Math.ceil(stars) + index}
                                        className="bi bi-star text-warning"
                                      ></i>
                                    )
                                  )}
                                </>
                              )}

                              <small className="ms-3">
                                {product.nbReviewers} global ratings
                              </small>
                            </span>
                          </div>
                          {/* xx

                          <div className="mb-8">
                            <div className="d-flex align-items-center mb-2">
                              <div className="text-nowrap me-3 text-muted"><span className="d-inline-block align-middle text-muted">5</span><i className="bi bi-star-fill ms-1 small text-warning" /></div>
                              <div className="w-100">
                                <div className="progress" style={{height: '6px'}}>
                                  <div className="progress-bar bg-warning" role="progressbar" style={{width: '60%'}} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </div><span className="text-muted ms-3">53%</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <div className="text-nowrap me-3 text-muted"><span className="d-inline-block align-middle text-muted">4</span><i className="bi bi-star-fill ms-1 small text-warning" /></div>
                              <div className="w-100">
                                <div className="progress" style={{height: '6px'}}>
                                  <div className="progress-bar bg-warning" role="progressbar" style={{width: '50%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={50} />
                                </div>
                              </div><span className="text-muted ms-3">22%</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <div className="text-nowrap me-3 text-muted"><span className="d-inline-block align-middle text-muted">3</span><i className="bi bi-star-fill ms-1 small text-warning" /></div>
                              <div className="w-100">
                                <div className="progress" style={{height: '6px'}}>
                                  <div className="progress-bar bg-warning" role="progressbar" style={{width: '35%'}} aria-valuenow={35} aria-valuemin={0} aria-valuemax={35} />
                                </div>
                              </div><span className="text-muted ms-3">14%</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <div className="text-nowrap me-3 text-muted"><span className="d-inline-block align-middle text-muted">2</span><i className="bi bi-star-fill ms-1 small text-warning" /></div>
                              <div className="w-100">
                                <div className="progress" style={{height: '6px'}}>
                                  <div className="progress-bar bg-warning" role="progressbar" style={{width: '22%'}} aria-valuenow={22} aria-valuemin={0} aria-valuemax={22} />
                                </div>
                              </div><span className="text-muted ms-3">5%</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <div className="text-nowrap me-3 text-muted"><span className="d-inline-block align-middle text-muted">1</span><i className="bi bi-star-fill ms-1 small text-warning" /></div>
                              <div className="w-100">
                                <div className="progress" style={{height: '6px'}}>
                                  <div className="progress-bar bg-warning" role="progressbar" style={{width: '14%'}} aria-valuenow={14} aria-valuemin={0} aria-valuemax={14} />
                                </div>
                              </div><span className="text-muted ms-3">7%</span>
                            </div>
                          </div>
                          
                          <div className="d-grid">
                            <h4>Review this product</h4>
                            <p className="mb-0">Share your thoughts with other customers.</p>
                            <a  href="#myDiv" className="btn btn-outline-gray-400 mt-4 text-muted">Write the Review</a>
                          </div>
                        */}
                        </div>
                      </div>
                      {/* col */}
                      <div className="col-md-8">
                        <div className="mb-10">
                          <div className="d-flex justify-content-between align-items-center mb-8">
                            <div>
                              {/* heading */}
                              <h4>Reviews</h4>
                            </div>
                            <div>
                              <select className="form-select">
                                <option defaultValue>Top Review</option>
                                <option value={1}>One</option>
                                <option value={2}>Two</option>
                                <option value={3}>Three</option>
                              </select>
                            </div>
                          </div>

                          {reviews.slice(0, seeMore).map((reviews, index) => (
                            <div
                              className="d-flex border-bottom pb-6 mb-6 pt-4"
                              key={index}
                            >
                              {/* img */}
                              <img
                                src={`http://localhost:5001/uploads/${reviews.image}`}
                                alt=""
                                className="rounded-circle avatar-lg"
                              />
                              <div className="ms-5">
                                <h6 className="mb-1">{reviews.username}</h6>
                                {/* content */}
                                <p className="small">
                                  {" "}
                                  <span className="text-muted">
                                    {new Date(reviews.createdAt).toLocaleString(
                                      "en-GB",
                                      {
                                        day: "numeric",
                                        month: "numeric",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                      }
                                    )}
                                  </span>
                                </p>
                                {/* rating */}
                                <div className=" mb-2">
                                  {[...Array(Math.floor(reviews.rating))].map(
                                    (_, index) => (
                                      <i
                                        key={index}
                                        className="bi bi-star-fill text-warning"
                                      ></i>
                                    )
                                  )}
                                  {[
                                    ...Array(5 - Math.floor(reviews.rating)),
                                  ].map((_, index) => (
                                    <i
                                      key={Math.floor(reviews.rating) + index}
                                      className="bi bi-star text-warning"
                                    ></i>
                                  ))}

                                  <span className="ms-3 text-dark fw-bold">
                                    {reviews.headline}
                                  </span>
                                </div>
                                <p>{reviews.review} .</p>
                              </div>
                            </div>
                          ))}
                          {reviews.length > seeMore && (
                            <div>
                              <a
                                className="btn btn-outline-gray-400 text-muted"
                                onClick={handleSeeMore}
                              >
                                Read More Reviews
                              </a>
                            </div>

                          )}
                        </div>
                        <div>
                          {/* rating */}

                          <h3 className="mb-5" id="myDiv">
                            Create Review
                          </h3>
                          <div className="border-bottom py-4 mb-4">

                            <h4 className="mb-3">Overall rating*</h4>
                            <div id="rater" />
                            <Rating
                                onClick={handleRating}
                                ratingValue={ratingValue}
                                showTooltip
                                fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']} 
                                tooltipArray={['Terrible', 'Bad', 'Average', 'Great', 'Prefect']}


/> 
                          </div>

                          {/* form control */}
                          <form id="myForm">

                            <div className="border-bottom py-4 mb-4">
                              <h5>Add a headline*</h5>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="What’s most important to know"
                                onChange={(e) => setHeadline(e.target.value)}
                              />
                            </div>

                            <div className=" py-4 mb-4">
                              {/* heading */}
                              <h5>Add a written review*</h5>
                              <textarea
                                className="form-control"
                                rows={3}
                                placeholder="What did you like or dislike? What did you use this product for?"
                                onChange={(e) =>
                                  setReviewMessage(e.target.value)
                                }
                              />
                            </div>
                            {error && (
                              <div className="alert alert-danger" role="alert">
                                {error}
                              </div>
                            )}
                            {/* button */}
                            <div className="d-flex justify-content-end">
                              <a
                                type="button"
                                className="btn btn-primary"
                                onClick={addReview}
                              >
                                Submit Review
                              </a>
                            </div>

                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* tab pane */}

                <div
                  className="tab-pane fade"
                  id="sellerInfo-tab-pane"
                  role="tabpanel"
                  aria-labelledby="sellerInfo-tab"
                  tabIndex={0}
                >
                  ...
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    );
  };
  export default ProductDetail;