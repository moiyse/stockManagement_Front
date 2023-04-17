import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import {  toast } from "react-toastify";
import { notify } from "../../../utils/HelperFunction";
import { useParams } from 'react-router-dom';

const ProductDetail = (props) => {
    const navigate = useNavigate();

    const { productId } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [name, setName] = useState("");   

    const [product, setProduct] = useState({});
  
    useEffect(() => {
        console.log(id)
      axios.get(`http://localhost:5000/products/prod/${id}`)
        .then(function (response) {
            console.log(response.data)
          setProduct(response.data);
          //setName(response.data.name);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [id]);

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


   
  
    return (
    <>

        <div >
            <div className="container">
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content " style={{paddingTop:"150 px", marginTop:"150 px"}}>
                <div className="modal-body p-8">
                    <div className="position-absolute top-0 end-0 me-3 mt-3">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="row">
                    <div className="col-lg-6">
                        {/* img slide */}
                        <div className="product productModal" id="productModal">
                        <div className="zoom" onmousemove="zoom(event)" style={{backgroundImage: 'url(../assets/images/products/product-single-img-1.jpg)'}}>
                            {/* img */}
                            <img src="../assets/images/products/product-single-img-1.jpg" alt="" />
                        </div>
                        
                        </div>
                        {/* product tools */}
                        <div className="product-tools">
                        <div className="thumbnails row g-3" id="productModalThumbnails">
                            <div className="col-3">
                            <div className="thumbnails-img">
                                {/* img */}
                                <img src="../assets/images/products/product-single-img-1.jpg" alt="" />
                            </div>
                            </div>
                            <div className="col-3">
                            <div className="thumbnails-img">
                                {/* img */}
                                <img src="../assets/images/products/product-single-img-2.jpg" alt="" />
                            </div>
                            </div>
                            <div className="col-3">
                            <div className="thumbnails-img">
                                {/* img */}
                                <img src="../assets/images/products/product-single-img-3.jpg" alt="" />
                            </div>
                            </div>
                            <div className="col-3">
                            <div className="thumbnails-img">
                                {/* img */}
                                <img src="../assets/images/products/product-single-img-4.jpg" alt="" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="ps-lg-8 mt-6 mt-lg-0">
                        <a href="#!" className="mb-4 d-block"> {product.category} </a>
                        <h2 className="mb-1 h1">{product.name} </h2>
                        <div className="mb-4">
                            <small className="text-warning">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-half" /></small><a href="#" className="ms-2">(30 reviews)</a>
                        </div>
                        <div className="fs-4">
                            <span className="fw-bold text-dark">{product.reduction} DT  </span>
                            <span className="text-decoration-line-through text-muted">  {product.price} DT</span><span><small className="fs-6 ms-2 text-danger">26% Off</small></span>
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
                                    onChange={(e) => setQuantity(Number(e.target.value))}
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
                                <i className="feather-icon icon-shopping-bag me-2" />Add to
                                cart
                            </button>
                            </div>
                            <div className="col-md-4 col-5">
                            {/* btn */}
                            <a className="btn btn-light" href="#" data-bs-toggle="tooltip" data-bs-html="true" aria-label="Compare"><i className="bi bi-arrow-left-right" /></a>
                            <a className="btn btn-light" href="#!" data-bs-toggle="tooltip" data-bs-html="true" aria-label="Wishlist"><i className="feather-icon icon-heart" /></a>
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
                                <td>{product?.inStock ? "In Stock" : "Out of Stock"}</td>
                                </tr>
                                <tr>
                                <td>Create at:</td>
                                <td>{new Date(product.addedDate).toLocaleString()}</td>
                                </tr>
                                <tr>
                                <td>Discription:</td>
                                <td>
                                    {product.description}.
                                </td>
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


      </>
    );
  };
  export default ProductDetail;
  