import { Link } from "react-router-dom";

function VerticalNav() {
  return (
    <>
      <nav className="navbar-vertical-nav d-none d-xl-block ">
        <div className="navbar-vertical">
          <div className="px-4 py-5">
            <a   className="navbar-brand">
              <div className="d-flex justify-content-center">
                <img
                  src="/assets/images/logo/logo.png"
                  style={{ width: "100px" }}
                  alt=""
                />
              </div>
            </a>
          </div>
          <div
            className="navbar-vertical-content flex-grow-1"
            data-simplebar=""
          >
            <ul className="navbar-nav flex-column" id="sideNavbar">
              <li className="nav-item ">
                <a className="nav-link  active " aria-current="page"  >
                  <div className="d-flex align-items-center">
                    <span className="nav-link-icon">
                      {" "}
                      <i className="bi bi-house"></i>
                    </span>
                    <span className="nav-link-text">Dashboard</span>
                  </div>
                </a>
              </li>
              <li className="nav-item mt-6 mb-3">
                <span className="nav-label">Store Managements</span>
              </li>
              <Link to="/dashboard/products">
              <li className="nav-item ">
                <a className="nav-link "  >
                  <div className="d-flex align-items-center">
                    <span className="nav-link-icon">
                      {" "}
                      <i className="bi bi-cart"></i>
                    </span>
                    Products
                  </div>
                </a>
              </li>
              </Link>
              <Link to="/admin/categories">
                <li className="nav-item ">
                  <a className="nav-link "  >
                    <div className="d-flex align-items-center">
                      <span className="nav-link-icon">
                        {" "}
                        <i className="bi bi-list-task"></i>
                      </span>
                      <span className="nav-link-text">Categories</span>
                    </div>
                  </a>
                </li>
              </Link>

              <li className="nav-item">
                <Link to="/dashboard/orders">
                  <a className="nav-link   collapsed "  >
                    <div className="d-flex align-items-center">
                      <span className="nav-link-icon">
                        {" "}
                        <i className="bi bi-bag"></i>
                      </span>
                      <span className="nav-link-text">Orders</span>
                    </div>
                  </a>
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/dashboard/coupons">
                  <a className="nav-link "  >
                    <div className="d-flex align-items-center">
                      <span className="nav-link-icon">
                        {" "}
                        <i className="bi bi-shop"></i>
                      </span>
                      <span className="nav-link-text">Coupons</span>
                    </div>
                  </a>
                </Link>
              </li>
              <Link to="/dashboard/users">
              <li className="nav-item ">
                <a className="nav-link ">
                  <div className="d-flex align-items-center">
                    <span className="nav-link-icon">
                      {" "}
                      <i className="bi bi-people"></i>
                    </span>
                    <span className="nav-link-text">
                      Customers
                    </span>
                  </div>
                </a>
              </li>
              </Link>
              {/*
              <li className="nav-item ">
                <a className="nav-link "  >
                  <div className="d-flex align-items-center">
                    <span className="nav-link-icon">
                      {" "}
                      <i className="bi bi-star"></i>
                    </span>
                    <span className="nav-link-text">Reviews</span>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link  collapsed "
                 
                  data-bs-toggle="collapse"
                  data-bs-target="#navMenuLevelFirst"
                  aria-expanded="false"
                  aria-controls="navMenuLevelFirst"
                >
                  <span className="nav-link-icon">
                    <i className=" bi bi-arrow-90deg-down"></i>
                  </span>
                  <span className="nav-link-text">Menu Level</span>
                </a>
                <div
                  id="navMenuLevelFirst"
                  className="collapse "
                  data-bs-parent="#sideNavbar"
                >
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <a
                        className="nav-link "
                         
                        data-bs-toggle="collapse"
                        data-bs-target="#navMenuLevelSecond1"
                        aria-expanded="false"
                        aria-controls="navMenuLevelSecond1"
                      >
                        Two Level
                      </a>
                      <div
                        id="navMenuLevelSecond1"
                        className="collapse"
                        data-bs-parent="#navMenuLevel"
                      >
                        <ul className="nav flex-column">
                          <li className="nav-item">
                            <a className="nav-link "  >
                              NavItem 1
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link "  >
                              NavItem 2
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link  collapsed  "
                         
                        data-bs-toggle="collapse"
                        data-bs-target="#navMenuLevelThreeOne1"
                        aria-expanded="false"
                        aria-controls="navMenuLevelThreeOne1"
                      >
                        Three Level
                      </a>
                      <div
                        id="navMenuLevelThreeOne1"
                        className="collapse "
                        data-bs-parent="#navMenuLevel"
                      >
                        <ul className="nav flex-column">
                          <li className="nav-item">
                            <a
                              className="nav-link  collapsed "
                               
                              data-bs-toggle="collapse"
                              data-bs-target="#navMenuLevelThreeTwo"
                              aria-expanded="false"
                              aria-controls="navMenuLevelThreeTwo"
                            >
                              NavItem 1
                            </a>
                            <div
                              id="navMenuLevelThreeTwo"
                              className="collapse collapse "
                              data-bs-parent="#navMenuLevelThree"
                            >
                              <ul className="nav flex-column">
                                <li className="nav-item">
                                  <a className="nav-link "  >
                                    NavChild Item 1
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link "  >
                              Nav Item 2
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            */}
            </ul>
          </div>
        </div>
      </nav>

      
    </>
  );
}
export default VerticalNav;
