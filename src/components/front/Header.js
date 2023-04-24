import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

function Navbar() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    axios.get("/products/cat").then((res) => {
      setAllCategories(res.data);
    });
    console.log("here !! ");
  }, []);

  const openDiv = () => {
    var div = document.getElementById("myDiv");
    if (div.style.display === "none") {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  };

  return (
    <div className='border-bottom '>
      {/* */}

      <div className='py-4 pt-lg-3 pb-lg-0'>
        <div className='container'>
          <div className='row w-100 align-items-center gx-lg-2 gx-0'>
            <div className='col-xxl-2 col-lg-3'>
              <a className='navbar-brand d-none d-lg-block'>
                <Link to='/home'>
                  <img
                    src='/assets/images/logo/logo.png'
                    alt='eCommerce HTML Template'
                    style={{ width: "70px" }}
                  />
                </Link>
              </a>
              <div className='d-flex justify-content-between w-100 d-lg-none'>
                

                <div className='d-flex align-items-center lh-1'>
                  <div className='list-inline me-4'>
                    <div className='list-inline-item'>
                      <a
                        
                        className='text-muted'
                        data-bs-toggle='modal'
                        data-bs-target='#userModal'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='feather feather-user'
                        >
                          <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                          <circle cx='12' cy='7' r='4'></circle>
                        </svg>
                      </a>
                    </div>
                    <div className='list-inline-item'>
                      <a
                        className='text-muted position-relative '
                        data-bs-toggle='offcanvas'
                        data-bs-target='#offcanvasRight'
                        href='#offcanvasExample'
                        role='button'
                        aria-controls='offcanvasRight'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='feather feather-shopping-bag'
                        >
                          <path d='M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'></path>
                          <line x1='3' y1='6' x2='21' y2='6'></line>
                          <path d='M16 10a4 4 0 0 1-8 0'></path>
                        </svg>
                        <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success'>
                          1
                          <span className='visually-hidden'>
                            unread messages
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                  <button
                    className='navbar-toggler collapsed'
                    type='button'
                    data-bs-toggle='offcanvas'
                    data-bs-target='#navbar-default'
                    aria-controls='navbar-default'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='32'
                      height='32'
                      fill='currentColor'
                      className='bi bi-text-indent-left text-primary'
                      viewBox='0 0 16 16'
                    >
                      <path d='M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className='col-xxl-6 col-lg-5 d-none d-lg-block'>
              <form action='#'>
                <div className='input-group '>
                  <input
                    className='form-control rounded'
                    type='search'
                    placeholder='Search for products'
                  />
                  <span className='input-group-append'>
                    <button
                      className='btn bg-white border border-start-0 ms-n10 rounded-0 rounded-end'
                      type='button'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-search'
                      >
                        <circle cx='11' cy='11' r='8'></circle>
                        <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
                      </svg>
                    </button>
                  </span>
                </div>
              </form>
            </div>
            <div className='col-md-2 col-xxl-3 d-none d-lg-block'>
              <button
                type='button'
                className='btn  btn-outline-gray-400 text-muted'
                data-bs-toggle='modal'
                data-bs-target='#locationModal'
              >
                <i className='feather-icon icon-map-pin me-2'></i>Location
              </button>
            </div>
            <div className='col-md-2 col-xxl-1 text-end d-none d-lg-block'>
              <div className='list-inline'>
                <div className='list-inline-item'>
                  <a
                    href='pages/shop-wishlist.html'
                    className='text-muted position-relative'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='feather feather-heart'
                    >
                      <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
                    </svg>
                    <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success'>
                      5<span className='visually-hidden'>unread messages</span>
                    </span>
                  </a>
                </div>
                <div className='list-inline-item'>
                  <a
                    className='text-muted position-relative '
                    data-bs-toggle='offcanvas'
                    data-bs-target='#offcanvasRight'
                    href='#offcanvasExample'
                    role='button'
                    aria-controls='offcanvasRight'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='feather feather-shopping-bag'
                    >
                      <path d='M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'></path>
                      <line x1='3' y1='6' x2='21' y2='6'></line>
                      <path d='M16 10a4 4 0 0 1-8 0'></path>
                    </svg>
                    {currentUser && (
                      <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success'>
                        {currentUser?.cart?.length}
                        <span className='visually-hidden'>unread messages</span>
                      </span>
                    )}
                  </a>
                </div>
                <div className='list-inline-item'>
                  {currentUser && (
                    <a
                      className='text-muted'
                      data-bs-toggle='modal'
                      data-bs-target='#userModal'
                      onClick={openDiv}
                      role='button'
                    >
                      <img
                        src={`http://localhost:5001/uploads/${currentUser.image}`}
                        style={{
                          width: "25px",
                          height: "25px",
                          marginLeft: "4px",
                          borderRadius: "50%",
                        }}
                        // className='image--cover'
                        // style={{
                        //   width: "150px",
                        //   height: "150px",
                        //   borderRadius: " 50%",

                        //   objectFit: "cover",
                        //   objectPosition: "center right",
                        // }}
                      />
                    </a>
                  )}
                  <div
                    className='dropdown-menu dropdown-menu-end p-0 '
                    id='myDiv'
                    data-bs-popper='static'
                  >
                    <div className='lh-1 px-5 py-4 border-bottom'>
                      <h5 className='mb-1 h6'>{currentUser?.username}</h5>
                      <small>{currentUser?.email}</small>
                    </div>
                    <ul className='list-unstyled px-2 py-3'>
                    <Link to='/home'>
                      <li>
                        <a className='dropdown-item'>Home</a>
                      </li>
                      </Link>
                      <li>
                        <a className='dropdown-item'>Profile</a>
                      </li>
                      <li>
                        <a className='dropdown-item'>Settings</a>
                      </li>
                    </ul>
                    <div className='border-top px-5 py-3'>
                      <a type='button'>Log Out</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className='navbar navbar-expand-lg navbar-light navbar-default py-0 py-lg-2'>
        <div className='container px-0 px-md-3'>
          <div className='dropdown me-3 d-none d-lg-block'>
            <button
              className='btn btn-primary px-6 '
              type='button'
              id='dropdownMenuButton1'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <span className='me-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='feather feather-grid'
                >
                  <rect x='3' y='3' width='7' height='7'></rect>
                  <rect x='14' y='3' width='7' height='7'></rect>
                  <rect x='14' y='14' width='7' height='7'></rect>
                  <rect x='3' y='14' width='7' height='7'></rect>
                </svg>
              </span>{" "}
              All Categories
            </button>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
              {allCategories?.map((category, index) => {
                return (
                  <li key={index}>
                    <Link
                                  to={`/shopByCategory/${category._id}`}
                                  reloadDocument={true}
                                >
                          <a
                            className='dropdown-item'
                          >
                            <img
                                        className='mr-2'
                                        style={{
                                          width: "23px",
                                          height: "23px",
                                          marginRight: "4px",
                                        }}
                                        src={`http://localhost:5002/categoryUploads/${category.imagePath}`}
                                      ></img>
                            {category.label}
                          </a>
                          </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            className='offcanvas offcanvas-start p-4 p-lg-0'
            id='navbar-default'
          >
            <div className='d-flex justify-content-between align-items-center mb-2 d-block d-lg-none'>
              <a href='index.html'>
                <img
                  src='/assets/images/logo/logo.png'
                  style={{ width: "70px" }}
                  alt='eCommerce HTML Template'
                />
              </a>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='offcanvas'
                aria-label='Close'
              ></button>
            </div>
            <div className='d-block d-lg-none my-4'>
              <form action='#'>
                <div className='input-group '>
                  <input
                    className='form-control rounded'
                    type='search'
                    placeholder='Search for products'
                  />
                  <span className='input-group-append'>
                    <button
                      className='btn bg-white border border-start-0 ms-n10 rounded-0 rounded-end'
                      type='button'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-search'
                      >
                        <circle cx='11' cy='11' r='8'></circle>
                        <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
                      </svg>
                    </button>
                  </span>
                </div>
              </form>
              <div className='mt-2'>
                <button
                  type='button'
                  className='btn  btn-outline-gray-400 text-muted w-100 '
                  data-bs-toggle='modal'
                  data-bs-target='#locationModal'
                >
                  <i className='feather-icon icon-map-pin me-2'></i>Pick
                  Location
                </button>
              </div>
            </div>
            
            <div className='d-none d-lg-block'>
              <ul className='navbar-nav align-items-center '>
              <Link to='/home'>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link'
                     
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Home
                  </a>
                </li>
                </Link>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link '
                     
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Shop
                  </a>
                </li>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link '
                     
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Stores
                  </a>
                  
                </li>
                <li className='nav-item dropdown dropdown-fullwidth'>
                  <a
                    className='nav-link'
                     
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Mega menu
                  </a>
                  
                </li>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link '
                     
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Pages
                  </a>
                  
                </li>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link dropdown-toggle'
                     
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Account
                  </a>
                  <ul className='dropdown-menu'>
                    {!currentUser && (
                      <>
                        <li>
                          <a className='dropdown-item' href='pages/signin.html'>
                            Sign in
                          </a>
                        </li>
                        <li>
                          <a className='dropdown-item' href='pages/signup.html'>
                            Signup
                          </a>
                        </li>
                      </>
                    )}
                    <li className='dropdown-submenu dropend'>
                      <a
                        className='dropdown-item dropdown-list-group-item dropdown-toggle'
                         
                      >
                        My Account
                      </a>
                      <ul className='dropdown-menu'>
                        <li>
                          <a className='dropdown-item'>
                            <Link to='/ordersList'>Orders</Link>
                          </a>
                        </li>
                        <li>
                          <a className='dropdown-item'>
                            <Link to='/settings'>Settings</Link>
                          </a>
                        </li>
                        <li>
                          <a
                            className='dropdown-item'
                            href='pages/account-address.html'
                          >
                            Address
                          </a>
                        </li>
                        <li>
                          <a
                            className='dropdown-item'
                            href='pages/account-payment-method.html'
                          >
                            Payment Method
                          </a>
                        </li>
                        <li>
                          <a
                            className='dropdown-item'
                            href='pages/account-notification.html'
                          >
                            Notification
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li className='nav-item dropdown dropdown-flyout'>
                  <a
                    className='nav-link'
                     
                    id='navbarDropdownDocs'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    Docs
                  </a>
                  <div
                    className='dropdown-menu dropdown-menu-lg'
                    aria-labelledby='navbarDropdownDocs'
                  >
                    <a
                      className='dropdown-item align-items-start'
                      href='docs/index.html'
                    >
                      <div>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          fill='currentColor'
                          className='bi bi-file-text text-primary'
                          viewBox='0 0 16 16'
                        >
                          <path d='M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z' />
                          <path d='M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z' />
                        </svg>
                      </div>
                      <div className='ms-3 lh-1'>
                        <h6 className='mb-1'>Documentations</h6>
                        <p className='mb-0 small'>
                          Browse the all documentation
                        </p>
                      </div>
                    </a>
                    <a
                      className='dropdown-item align-items-start'
                      href='docs/changelog.html'
                    >
                      <div>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          fill='currentColor'
                          className='bi bi-layers text-primary'
                          viewBox='0 0 16 16'
                        >
                          <path d='M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882l-7.5-4zm3.515 7.008L14.438 10 8 13.433 1.562 10 4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0l3.515-1.874zM8 9.433 1.562 6 8 2.567 14.438 6 8 9.433z' />
                        </svg>
                      </div>
                      <div className='ms-3 lh-1'>
                        <h6 className='mb-1'>
                          Changelog{" "}
                          <span className='text-primary ms-1'>v1.1.0</span>
                        </h6>
                        <p className='mb-0 small'>See what's new</p>
                      </div>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
