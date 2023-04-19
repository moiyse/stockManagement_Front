

import axios from 'axios';
import React from 'react'
import { useState,useEffect } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';

export default function ShopByCategory() {
    const [allCategories,setAllCategories ] = useState([])
    const [productsOfCategory,setProductsOfCategory] = useState([])
    const [categorySelected,setCategorySelected] = useState()
    const location = useLocation();
    const { idCategory } = useParams();
    //const idCategory = location.state?.id;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    useEffect(() => {
        axios.get("/products/cat").then((res) => {
          setAllCategories(res.data);
        }).catch((error) => {console.log("getAllCategory returned an error : ",error)})
        
    }, []);

    useEffect(()=> {
      axios.get(`/products/prod/productsByCategory/${idCategory}`).then((res) => {
        console.log("products of category : ",productsOfCategory)
        setProductsOfCategory(res.data);
      }).catch((error) => {console.log("producytsByCategory returned an error : ",error)})
      axios.get(`/products/cat/${idCategory}`).then((res) => {
          console.log("res.data category : ", res.data)
          setCategorySelected(res.data);
      }).catch((error) => {console.log("Category selected returned an error : ",error)})
    },[idCategory])




  return (
    <main>
        {/* section*/}
        <div className="mt-4">
          <div className="container">
            {/* row */}
            <div className="row ">
              {/* col */}
              <div className="col-12">
                {/* breadcrumb */}
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item"><a href="#!">Shop</a></li>
                    <li className="breadcrumb-item active" aria-current="page"></li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* section */}
        <div className=" mt-8 mb-lg-14 mb-8">
          {/* container */}
          <div className="container">
            {/* row */}
            <div className="row gx-10">
              {/* col */}
              <aside className="col-lg-3 col-md-4 mb-6 mb-md-0">
                <div className="offcanvas offcanvas-start offcanvas-collapse w-md-50 " tabIndex={-1} id="offcanvasCategory" aria-labelledby="offcanvasCategoryLabel">
                  <div className="offcanvas-header d-lg-none">
                    <h5 className="offcanvas-title" id="offcanvasCategoryLabel">Filter</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                  </div>
                  <div className="offcanvas-body ps-lg-2 pt-lg-0">
                    <div className="mb-8">
                      {/* title */}
                      <h5 className="mb-3">Categories</h5>
                      {/* nav */}
                      <ul className="nav nav-category" id="categoryCollapseMenu">
                        {allCategories?.map((category, index) => {
                            return(
                              
                                <li style={{display:"inline-flex"}} key={index} className="nav-item border-bottom w-100 collapsed" data-bs-toggle="collapse" 
                                data-bs-target="#categoryFlushOne" aria-expanded="false" 
                                aria-controls="categoryFlushOne">
                                  
                                    <img className="mr-2" style={{width:"23px",height:"23px",margin:" auto 4px auto 0px"}} src={`http://localhost:5002/categoryUploads/${category.imagePath}`}></img>
                                    <Link to={`/shopByCategory/${category._id}`}>
                                    <span className="nav-link">
                                    {category.label}
                                    </span>
                                    </Link>
                                  
                                </li>
                              
                            );
                        })}
                      </ul>
                    </div>
                    <div className="mb-8">
                      <h5 className="mb-3">Stores</h5>
                      <div className="my-4">
                        {/* input */}
                        <input type="search" className="form-control" placeholder="Search by store" />
                      </div>
                      {/* form check */}
                      <div className="form-check mb-2">
                        {/* input */}
                        <input className="form-check-input" type="checkbox" defaultValue id="eGrocery" defaultChecked />
                        <label className="form-check-label" htmlFor="eGrocery">
                          E-Grocery
                        </label>
                      </div>
                      {/* form check */}
                      <div className="form-check mb-2">
                        {/* input */}
                        <input className="form-check-input" type="checkbox" defaultValue id="DealShare" />
                        <label className="form-check-label" htmlFor="DealShare">
                          DealShare
                        </label>
                      </div>
                      {/* form check */}
                      <div className="form-check mb-2">
                        {/* input */}
                        <input className="form-check-input" type="checkbox" defaultValue id="Dmart" />
                        <label className="form-check-label" htmlFor="Dmart">
                          DMart
                        </label>
                      </div>
                      {/* form check */}
                      <div className="form-check mb-2">
                        {/* input */}
                        <input className="form-check-input" type="checkbox" defaultValue id="Blinkit" />
                        <label className="form-check-label" htmlFor="Blinkit">
                          Blinkit
                        </label>
                      </div>
                      {/* form check */}
                      <div className="form-check mb-2">
                        {/* input */}
                        <input className="form-check-input" type="checkbox" defaultValue id="BigBasket" />
                        <label className="form-check-label" htmlFor="BigBasket">
                          BigBasket
                        </label>
                      </div>
                      {/* form check */}
                      <div className="form-check mb-2">
                        {/* input */}
                        <input className="form-check-input" type="checkbox" defaultValue id="StoreFront" />
                        <label className="form-check-label" htmlFor="StoreFront">
                          StoreFront
                        </label>
                      </div>
                      {/* form check */}
                      <div className="form-check mb-2">
                        {/* input */}
                        <input className="form-check-input" type="checkbox" defaultValue id="Spencers" />
                        <label className="form-check-label" htmlFor="Spencers">
                          Spencers
                        </label>
                      </div>
                      {/* form check */}
                      <div className="form-check mb-2">
                        {/* input */}
                        <input className="form-check-input" type="checkbox" defaultValue id="onlineGrocery" />
                        <label className="form-check-label" htmlFor="onlineGrocery">
                          Online Grocery
                        </label>
                      </div>
                    </div>
                    <div className="mb-8">
                      {/* price */}
                      <h5 className="mb-3">Price</h5>
                      <div>
                        {/* range */}
                        <div id="priceRange" className="mb-3" />
                        <small className="text-muted">Price:</small> <span id="priceRange-value" className="small" />
                      </div>
                    </div>
                    {/* rating */}
                    <div className="mb-8">
                      <h5 className="mb-3">Rating</h5>
                      <div>
                        {/* form check */}
                        <div className="form-check mb-2">
                          {/* input */}
                          <input className="form-check-input" type="checkbox" defaultValue id="ratingFive" />
                          <label className="form-check-label" htmlFor="ratingFive">
                            <i className="bi bi-star-fill text-warning" />
                            <i className="bi bi-star-fill text-warning " />
                            <i className="bi bi-star-fill text-warning " />
                            <i className="bi bi-star-fill text-warning " />
                            <i className="bi bi-star-fill text-warning " />
                          </label>
                        </div>
                        {/* form check */}
                        <div className="form-check mb-2">
                          {/* input */}
                          <input className="form-check-input" type="checkbox" defaultValue id="ratingFour" defaultChecked />
                          <label className="form-check-label" htmlFor="ratingFour">
                            <i className="bi bi-star-fill text-warning" />
                            <i className="bi bi-star-fill text-warning " />
                            <i className="bi bi-star-fill text-warning " />
                            <i className="bi bi-star-fill text-warning " />
                            <i className="bi bi-star text-warning" />
                          </label>
                        </div>
                        {/* form check */}
                        <div className="form-check mb-2">
                          {/* input */}
                          <input className="form-check-input" type="checkbox" defaultValue id="ratingThree" />
                          <label className="form-check-label" htmlFor="ratingThree">
                            <i className="bi bi-star-fill text-warning" />
                            <i className="bi bi-star-fill text-warning " />
                            <i className="bi bi-star-fill text-warning " />
                            <i className="bi bi-star text-warning" />
                            <i className="bi bi-star text-warning" />
                          </label>
                        </div>
                        {/* form check */}
                        <div className="form-check mb-2">
                          {/* input */}
                          <input className="form-check-input" type="checkbox" defaultValue id="ratingTwo" />
                          <label className="form-check-label" htmlFor="ratingTwo">
                            <i className="bi bi-star-fill text-warning" />
                            <i className="bi bi-star-fill text-warning" />
                            <i className="bi bi-star text-warning" />
                            <i className="bi bi-star text-warning" />
                            <i className="bi bi-star text-warning" />
                          </label>
                        </div>
                        {/* form check */}
                        <div className="form-check mb-2">
                          {/* input */}
                          <input className="form-check-input" type="checkbox" defaultValue id="ratingOne" />
                          <label className="form-check-label" htmlFor="ratingOne">
                            <i className="bi bi-star-fill text-warning" />
                            <i className="bi bi-star text-warning" />
                            <i className="bi bi-star text-warning" />
                            <i className="bi bi-star text-warning" />
                            <i className="bi bi-star text-warning" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mb-8 position-relative">
                      {/* Banner Design */}
                      {/* Banner Content */}
                      <div className="position-absolute p-5 py-8">
                        <h3 className="mb-0">Fresh Fruits </h3>
                        <p>Get Upto 25% Off</p>
                        <a href="#" className="btn btn-dark">Shop Now<i className="feather-icon icon-arrow-right ms-1" /></a>
                      </div>
                      {/* Banner Content */}
                      {/* Banner Image */}
                      {/* img */}<img src="../assets/images/banner/assortment-citrus-fruits.png" alt="" className="img-fluid rounded " />
                      {/* Banner Image */}
                    </div>
                  </div>
                </div>
              </aside>
              <section className="col-lg-9 col-md-12">
                {/* card */}
                <div className="card mb-4 bg-light border-0">
                  {/* card body */}
                  <div className=" card-body p-9">
                    {categorySelected && <h2 className="mb-0 fs-1">{categorySelected.label}</h2>}
                  </div>
                </div>
                {/* list icon */}
                <div className="d-lg-flex justify-content-between align-items-center">
                  <div className="mb-3 mb-lg-0">
                    <p className="mb-0"> <span className="text-dark">{productsOfCategory.length} </span> Products found </p>
                  </div>
                  {/* icon */}
                  <div className="d-md-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <a href="shop-list.html" className="text-muted me-3"><i className="bi bi-list-ul" /></a>
                        <a href="shop-grid.html" className=" me-3 active"><i className="bi bi-grid" /></a>
                        <a href="shop-grid-3-column.html" className="me-3 text-muted"><i className="bi bi-grid-3x3-gap" /></a>
                      </div>
                      <div className="ms-2 d-lg-none">
                        <a className="btn btn-outline-gray-400 text-muted" data-bs-toggle="offcanvas" href="#offcanvasCategory" role="button" aria-controls="offcanvasCategory"><svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter me-2">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                          </svg> Filters</a>
                      </div>
                    </div>
                    <div className="d-flex mt-2 mt-lg-0">
                      <div className="me-2 flex-grow-1">
                        {/* select option */}
                        <select className="form-select">
                          <option selected>Show: 50</option>
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={30}>30</option>
                        </select></div>
                      <div>
                        {/* select option */}
                        <select className="form-select">
                          <option selected>Sort by: Featured</option>
                          <option value="Low to High">Price: Low to High</option>
                          <option value="High to Low"> Price: High to Low</option>
                          <option value="Release Date"> Release Date</option>
                          <option value="Avg. Rating"> Avg. Rating</option>
                        </select></div>
                    </div>
                  </div>
                </div>
                {/* row */}
                <div className="row g-4 row-cols-xl-4 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-2">
                  {/* col */}
                    {productsOfCategory?.slice(startIndex,endIndex).map((product, index) => {
                        return(
                            <div className="col">
                                {/* card */}
                                <div className="card card-product">
                                <div className="card-body">
                                    {/* badge */}
                                    <div className="text-center position-relative ">
                                    <div className=" position-absolute top-0 start-0">
                                        {product?.inStock === false && <span className="badge bg-danger">Out of stock</span>}
                                    </div>
                                    <a href="shop-single.html">
                                        {/* img */}<img src="../assets/images/products/product-img-1.jpg" alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                                    {/* action btn */}
                                    <div className="card-product-action">
                                        <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal"><i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View" /></a>
                                        <a href="shop-wishlist.html" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart" /></a>
                                        <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right" /></a>
                                    </div>
                                    </div>
                                    {/* heading */}
                                    <div className="text-small mb-1"><a href="#!" className="text-decoration-none text-muted">
                                        <small>quantity : {product.quantity}</small></a></div>
                                    <h2 className="fs-6"><a href="shop-single.html" className="text-inherit text-decoration-none">{product.name}</a></h2>
                                    
                                    {/* price */}
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div><span className="text-dark">{product.price + " "}DT</span> 
                                    </div>
                                    {/* btn */}
                                    <div><a href="#!" className={`btn btn-primary btn-sm ${product.inStock === false ? "disabled" : ""}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                            <line x1={12} y1={5} x2={12} y2={19} />
                                            <line x1={5} y1={12} x2={19} y2={12} />
                                        </svg> Add</a></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        )
                    })}
                  <div className="col">
                    {/* card */}
                    <div className="card card-product">
                      <div className="card-body">
                        {/* badge */}
                        <div className="text-center position-relative ">
                          <div className=" position-absolute top-0 start-0">
                            <span className="badge bg-danger">Sale</span>
                          </div>
                          <a href="shop-single.html">
                            {/* img */}<img src="../assets/images/products/product-img-1.jpg" alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                          {/* action btn */}
                          <div className="card-product-action">
                            <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal"><i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View" /></a>
                            <a href="shop-wishlist.html" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right" /></a>
                          </div>
                        </div>
                        {/* heading */}
                        <div className="text-small mb-1"><a href="#!" className="text-decoration-none text-muted"><small>Snack &amp;
                              Munchies</small></a></div>
                        <h2 className="fs-6"><a href="shop-single.html" className="text-inherit text-decoration-none">Haldiram's Sev Bhujia</a></h2>
                        <div>
                          {/* rating */}
                          <small className="text-warning"> <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-half" /></small> <span className="text-muted small">4.5(149)</span>
                        </div>
                        {/* price */}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div><span className="text-dark">$18</span> <span className="text-decoration-line-through text-muted">$24</span>
                          </div>
                          {/* btn */}
                          <div><a href="#!" className="btn btn-primary btn-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                <line x1={12} y1={5} x2={12} y2={19} />
                                <line x1={5} y1={12} x2={19} y2={12} />
                              </svg> Add</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* col */}
                  <div className="col">
                    {/* card */}
                    <div className="card card-product">
                      <div className="card-body">
                        {/* badge */}
                        <div className="text-center position-relative">
                          <div className=" position-absolute top-0 start-0">
                            <span className="badge bg-success">14%</span>
                          </div>
                          <a href="shop-single.html">
                            {/* img */}<img src="../assets/images/products/product-img-2.jpg" alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                          {/* action btn */}
                          <div className="card-product-action">
                            <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal"><i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right" /></a>
                          </div>
                        </div>
                        {/* heading */}
                        <div className="text-small mb-1"><a href="#!" className="text-decoration-none text-muted"><small>Bakery &amp;
                              Biscuits</small></a></div>
                        <h2 className="fs-6"><a href="shop-single.html" className="text-inherit text-decoration-none">NutriChoice Digestive </a>
                        </h2>
                        <div className="text-warning">
                          {/* rating */}
                          <small> <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-half" /></small> <span className="text-muted small">4.5 (25)</span>
                        </div>
                        {/* price */}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div><span className="text-dark">$24</span>
                          </div>
                          {/* btn */}
                          <div><a href="#!" className="btn btn-primary btn-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                <line x1={12} y1={5} x2={12} y2={19} />
                                <line x1={5} y1={12} x2={19} y2={12} />
                              </svg> Add</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* col */}
                  <div className="col">
                    {/* card */}
                    <div className="card card-product">
                      <div className="card-body">
                        {/* badge */}
                        <div className="text-center position-relative"> <a href="shop-single.html"><img src="../assets/images/products/product-img-3.jpg" alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                          {/* action btn */}
                          <div className="card-product-action">
                            <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal"><i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right" /></a>
                          </div>
                        </div>
                        {/* heading */}
                        <div className="text-small mb-1"><a href="#!" className="text-decoration-none text-muted"><small>Bakery &amp;
                              Biscuits</small></a></div>
                        <h2 className="fs-6"><a href="shop-single.html" className="text-inherit text-decoration-none">Cadbury 5 Star Chocolate</a>
                        </h2>
                        <div className="text-warning">
                          {/* rating */}
                          <small> <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" /></small> <span className="text-muted small">5 (469)</span>
                        </div>
                        {/* price */}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div><span className="text-dark">$32</span> <span className="text-decoration-line-through text-muted">$35</span>
                          </div>
                          {/* btn */}
                          <div><a href="#!" className="btn btn-primary btn-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                <line x1={12} y1={5} x2={12} y2={19} />
                                <line x1={5} y1={12} x2={19} y2={12} />
                              </svg> Add</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* col */}
                  <div className="col">
                    {/* card */}
                    <div className="card card-product">
                      <div className="card-body">
                        {/* badge */}
                        <div className="text-center position-relative">
                          <div className=" position-absolute top-0">
                            <span className="badge bg-danger">Hot</span>
                          </div>
                          <a href="shop-single.html">
                            {/* img */}<img src="../assets/images/products/product-img-4.jpg" alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                          {/* action btn */}
                          <div className="card-product-action">
                            <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal"><i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right" /></a>
                          </div>
                        </div>
                        {/* heading */}
                        <div className="text-small mb-1"><a href="#!" className="text-decoration-none text-muted"><small>Snack &amp;
                              Munchies</small></a></div>
                        <h2 className="fs-6"><a href="shop-single.html" className="text-inherit text-decoration-none">Onion Flavour Potato</a></h2>
                        <div className="text-warning">
                          {/* rating */}
                          <small> <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-half" />
                            <i className="bi bi-star" /></small> <span className="text-muted small">3.5 (456)</span>
                        </div>
                        {/* price */}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div><span className="text-dark">$3</span> <span className="text-decoration-line-through text-muted">$5</span>
                          </div>
                          {/* btn */}
                          <div><a href="#!" className="btn btn-primary btn-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                <line x1={12} y1={5} x2={12} y2={19} />
                                <line x1={5} y1={12} x2={19} y2={12} />
                              </svg> Add</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* col */}
                  <div className="col">
                    {/* card */}
                    <div className="card card-product">
                      <div className="card-body">
                        {/* badge */}
                        <div className="text-center position-relative"> <a href="shop-single.html"><img src="../assets/images/products/product-img-5.jpg" alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                          {/* action btn */}
                          <div className="card-product-action">
                            <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal"><i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right" /></a>
                          </div>
                        </div>
                        {/* heading */}
                        <div className="text-small mb-1"><a href="#!" className="text-decoration-none text-muted"><small>Instant
                              Food</small></a></div>
                        <h2 className="fs-6"><a href="shop-single.html" className="text-inherit text-decoration-none">Salted Instant Popcorn </a>
                        </h2>
                        <div className="text-warning">
                          {/* rating */}
                          <small> <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-half" /></small> <span className="text-muted small">4.5 (39)</span>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                          <div><span className="text-dark">$13</span> <span className="text-decoration-line-through text-muted">$18</span>
                          </div>
                          {/* btn */}
                          <div><a href="#!" className="btn btn-primary btn-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                <line x1={12} y1={5} x2={12} y2={19} />
                                <line x1={5} y1={12} x2={19} y2={12} />
                              </svg> Add</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* col */}
                  <div className="col">
                    {/* card */}
                    <div className="card card-product">
                      <div className="card-body">
                        {/* badge */}
                        <div className="text-center position-relative ">
                          <div className=" position-absolute top-0">
                            <span className="badge bg-danger">Sale</span>
                          </div>
                          <a href="shop-single.html">
                            {/* img */}<img src="../assets/images/products/product-img-6.jpg" alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                          {/* action btn */}
                          <div className="card-product-action">
                            <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal"><i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View" /></a>
                            <a href="shop-wishlist.html" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right" /></a>
                          </div>
                        </div>
                        {/* heading */}
                        <div className="text-small mb-1"><a href="#!" className="text-decoration-none text-muted"><small>Dairy, Bread
                              &amp;
                              Eggs</small></a></div>
                        <h2 className="fs-6"><a href="shop-single.html" className="text-inherit text-decoration-none">Blueberry Greek Yogurt</a>
                        </h2>
                        <div>
                          {/* rating */}
                          <small className="text-warning"> <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-half" /></small> <span className="text-muted small">4.5 (189)</span>
                        </div>
                        {/* price */}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div><span className="text-dark">$18</span> <span className="text-decoration-line-through text-muted">$24</span>
                          </div>
                          {/* btn */}
                          <div><a href="#!" className="btn btn-primary btn-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                <line x1={12} y1={5} x2={12} y2={19} />
                                <line x1={5} y1={12} x2={19} y2={12} />
                              </svg> Add</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* col */}
                  <div className="col">
                    {/* card */}
                    <div className="card card-product">
                      <div className="card-body">
                        {/* badge */}
                        <div className="text-center position-relative"> <a href="shop-single.html"><img src="../assets/images/products/product-img-7.jpg" alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                          {/* action btn */}
                          <div className="card-product-action">
                            <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal"><i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right" /></a>
                          </div>
                        </div>
                        {/* heading */}
                        <div className="text-small mb-1"><a href="#!" className="text-decoration-none text-muted"><small>Dairy, Bread
                              &amp;
                              Eggs</small></a></div>
                        <h2 className="fs-6"><a href="shop-single.html" className="text-inherit text-decoration-none">Britannia Cheese Slices</a>
                        </h2>
                        <div className="text-warning">
                          {/* rating */}
                          <small> <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" /></small> <span className="text-muted small">5 (345)</span>
                        </div>
                        {/* price */}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div><span className="text-dark">$24</span>
                          </div>
                          {/* btn */}
                          <div><a href="#!" className="btn btn-primary btn-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                <line x1={12} y1={5} x2={12} y2={19} />
                                <line x1={5} y1={12} x2={19} y2={12} />
                              </svg> Add</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* col */}
                  <div className="col">
                    {/* card */}
                    <div className="card card-product">
                      <div className="card-body">
                        {/* badge */}
                        <div className="text-center position-relative"> <a href="shop-single.html"><img src="../assets/images/products/product-img-8.jpg" alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                          {/* action btn */}
                          <div className="card-product-action">
                            <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal"><i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right" /></a>
                          </div>
                        </div>
                        {/* heading */}
                        <div className="text-small mb-1"><a href="#!" className="text-decoration-none text-muted"><small>Instant
                              Food</small></a></div>
                        <h2 className="fs-6"><a href="shop-single.html" className="text-inherit text-decoration-none">Kellogg's Original Cereals</a>
                        </h2>
                        <div className="text-warning">
                          {/* rating */}
                          <small> <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-half" /></small> <span className="text-muted small">4 (90)</span>
                        </div>
                        {/* price */}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div><span className="text-dark">$32</span> <span className="text-decoration-line-through text-muted">$35</span>
                          </div>
                          {/* btn */}
                          <div><a href="#!" className="btn btn-primary btn-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                <line x1={12} y1={5} x2={12} y2={19} />
                                <line x1={5} y1={12} x2={19} y2={12} />
                              </svg> Add</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* col */}
                  <div className="col">
                    {/* card */}
                    <div className="card card-product">
                      <div className="card-body">
                        {/* badge */}
                        <div className="text-center position-relative"> <a href="shop-single.html"><img src="../assets/images/products/product-img-9.jpg" alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                          {/* action btn */}
                          <div className="card-product-action">
                            <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal"><i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right" /></a>
                          </div>
                        </div>
                        {/* heading */}
                        <div className="text-small mb-1"><a href="#!" className="text-decoration-none text-muted"><small>Snack &amp;
                              Munchies</small></a></div>
                        <h2 className="fs-6"><a href="shop-single.html" className="text-inherit text-decoration-none">Slurrp Millet Chocolate </a>
                        </h2>
                        <div className="text-warning">
                          {/* rating */}
                          <small> <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-half" /></small> <span className="text-muted small">4.5 (67)</span>
                        </div>
                        {/* price */}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div><span className="text-dark">$3</span> <span className="text-decoration-line-through text-muted">$5</span>
                          </div>
                          {/* btn */}
                          <div><a href="#!" className="btn btn-primary btn-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                <line x1={12} y1={5} x2={12} y2={19} />
                                <line x1={5} y1={12} x2={19} y2={12} />
                              </svg> Add</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* col */}
                  <div className="col">
                    {/* card */}
                    <div className="card card-product">
                      <div className="card-body">
                        {/* badge */}
                        <div className="text-center position-relative"> <a href="shop-single.html"><img src="../assets/images/products/product-img-10.jpg" alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                          {/* action btn */}
                          <div className="card-product-action">
                            <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal"><i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart" /></a>
                            <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right" /></a>
                          </div>
                        </div>
                        {/* heading */}
                        <div className="text-small mb-1"><a href="#!" className="text-decoration-none text-muted"><small>Dairy, Bread
                              &amp;
                              Eggs</small></a></div>
                        <h2 className="fs-6"><a href="shop-single.html" className="text-inherit text-decoration-none">Amul Butter - 500 g</a></h2>
                        <div className="text-warning">
                          {/* rating */}
                          <small> <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-half" />
                            <i className="bi bi-star" /></small> <span className="text-muted small">3.5 (89)</span>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                          <div><span className="text-dark">$13</span> <span className="text-decoration-line-through text-muted">$18</span>
                          </div>
                          {/* btn */}
                          <div><a href="#!" className="btn btn-primary btn-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                <line x1={12} y1={5} x2={12} y2={19} />
                                <line x1={5} y1={12} x2={19} y2={12} />
                              </svg> Add</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-8">
                  <div className="col">
                    {/* nav */}
                    <nav>
                      <ul className="pagination">
                        <li className="page-item disabled">
                          <a className="page-link  mx-1 " href="#" aria-label="Previous">
                            <i className="feather-icon icon-chevron-left" />
                          </a>
                        </li>
                        <li className="page-item "><a className="page-link  mx-1 active" href="#">1</a></li>
                        <li className="page-item"><a className="page-link mx-1 text-body" href="#">2</a></li>
                        <li className="page-item"><a className="page-link mx-1 text-body" href="#">...</a></li>
                        <li className="page-item"><a className="page-link mx-1 text-body" href="#">12</a></li>
                        <li className="page-item">
                          <a className="page-link mx-1 text-body" href="#" aria-label="Next">
                            <i className="feather-icon icon-chevron-right" />
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
  )
}
