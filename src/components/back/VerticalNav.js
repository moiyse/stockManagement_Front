function VerticalNav(){

    return(<>
    
    
    <nav className="navbar-vertical-nav d-none d-xl-block ">
                <div className="navbar-vertical">
                                <div className="px-4 py-5">
                                    <a href="../index.html" className="navbar-brand">
                                        <div className="d-flex justify-content-center">
                                        <img src="../assets/images/logo/logo.png" style={{width :'100px'}} alt=""/>
                                        </div>
                                    </a>
                                </div>
                                <div className="navbar-vertical-content flex-grow-1" data-simplebar="">
                                    <ul className="navbar-nav flex-column" id="sideNavbar">

                                        <li className="nav-item ">
                                            <a className="nav-link  active " href="index.html" >
                                                <div className="d-flex align-items-center">
                                                    <span className="nav-link-icon"> <i className="bi bi-house"></i></span>
                                                    <span className="nav-link-text">Dashboard</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="nav-item mt-6 mb-3">
                                            <span className="nav-label">Store Managements</span></li>
                                        <li className="nav-item ">
                                            <a className="nav-link "  href="products.html">
                                                <div className="d-flex align-items-center">
                                                    <span className="nav-link-icon"> <i className="bi bi-cart"></i></span>
                                                    <span className="nav-link-text">Products</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="nav-item ">
                                            <a className="nav-link " href="categories.html">
                                                <div className="d-flex align-items-center">
                                                    <span className="nav-link-icon"> <i className="bi bi-list-task"></i></span>
                                                    <span className="nav-link-text">Categories</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link   collapsed " href="#"
                                                data-bs-toggle="collapse" data-bs-target="#navCategoriesOrders" aria-expanded="false"
                                                aria-controls="navCategoriesOrders">
                                                <div className="d-flex align-items-center">
                                                    <span className="nav-link-icon"> <i className="bi bi-bag"></i></span>
                                                    <span className="nav-link-text">Orders</span>
                                                </div>
                                            </a>
                                            <div id="navCategoriesOrders" className="collapse "
                                                data-bs-parent="#sideNavbar">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item ">
                                                        <a className="nav-link "
                                                            href="order-list.html">
                                                            List
                                                        </a>
                                                    </li>
                                         
                                                    <li className="nav-item ">
                                                        <a className="nav-link "
                                                            href="order-single.html">
                                                            Single

                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>

                                        <li className="nav-item ">
                                            <a className="nav-link " href="vendor-grid.html">
                                                <div className="d-flex align-items-center">
                                                    <span className="nav-link-icon"> <i className="bi bi-shop"></i></span>
                                                    <span className="nav-link-text">Sellers / Vendors</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="nav-item ">
                                            <a className="nav-link " href="customers.html">
                                                <div className="d-flex align-items-center">
                                                    <span className="nav-link-icon"> <i className="bi bi-people"></i></span>
                                                    <span className="nav-link-text">Customers</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="nav-item ">
                                            <a className="nav-link " href="reviews.html">
                                                <div className="d-flex align-items-center">
                                                    <span className="nav-link-icon"> <i className="bi bi-star"></i></span>
                                                    <span className="nav-link-text">Reviews</span>
                                                </div>
                                            </a>
                                        </li>
 <li className="nav-item">
    <a className="nav-link  collapsed " href="#"
        data-bs-toggle="collapse" data-bs-target="#navMenuLevelFirst" aria-expanded="false"
        aria-controls="navMenuLevelFirst">
        <span className="nav-link-icon"><i className=" bi bi-arrow-90deg-down"></i></span>
        <span className="nav-link-text">Menu Level</span>
    </a>
    <div id="navMenuLevelFirst" className="collapse "
        data-bs-parent="#sideNavbar">
        <ul className="nav flex-column">
            <li className="nav-item">
                <a className="nav-link " href="#"
                    data-bs-toggle="collapse" data-bs-target="#navMenuLevelSecond1" aria-expanded="false"
                    aria-controls="navMenuLevelSecond1">
                    Two Level
                </a>
                <div id="navMenuLevelSecond1" className="collapse" data-bs-parent="#navMenuLevel">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link "
                                href="#">NavItem 1</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link "
                                href="#">NavItem 2</a>
                        </li>
                    </ul>
                </div>
            </li>
            <li className="nav-item">
                <a className="nav-link  collapsed  " href="#"
                    data-bs-toggle="collapse" data-bs-target="#navMenuLevelThreeOne1" aria-expanded="false"
                    aria-controls="navMenuLevelThreeOne1">
                    Three Level
                </a>
                <div id="navMenuLevelThreeOne1"
                    className="collapse "
                    data-bs-parent="#navMenuLevel">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link  collapsed "
                                href="#" data-bs-toggle="collapse" data-bs-target="#navMenuLevelThreeTwo"
                                aria-expanded="false" aria-controls="navMenuLevelThreeTwo">
                                NavItem 1
                            </a>
                            <div id="navMenuLevelThreeTwo"
                                className="collapse collapse "
                                data-bs-parent="#navMenuLevelThree">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <a className="nav-link "
                                            href="#">
                                            NavChild Item 1
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="#">Nav
                                Item 2</a>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</li>

                                    </ul>
                                </div>
                            </div>
                            </nav>

                            <nav className="navbar-vertical-nav offcanvas offcanvas-start navbar-offcanvac" tabIndex="-1" id="offcanvasExample" >
                                <div className="navbar-vertical">
                                                <div className="px-4 py-5 d-flex justify-content-between align-items-center">
                                                    <a href="../index.html" className="navbar-brand">
                                                    <div className="d-flex justify-content-center">
                                        <img src="../assets/images/logo/logo.png" style={{width :'100px'}} alt=""/>
                                        </div>
                                                    </a>
                                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                </div>
                                                <div className="navbar-vertical-content flex-grow-1" data-simplebar="">
                                                    <ul className="navbar-nav flex-column">
                                                        <li className="nav-item ">
                                                            <a className="nav-link  active " href="index.html" >
                                                                <div className="d-flex align-items-center">
                                                                    <span className="nav-link-icon"> <i className="bi bi-house"></i></span>
                                                                    <span>Dashboard</span>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li className="nav-item mt-6 mb-3">
                                                            <span className="nav-label">Store Managements</span></li>
                                                        <li className="nav-item ">
                                                            <a className="nav-link "  href="products.html">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="nav-link-icon"> <i className="bi bi-cart"></i></span>
                                                                    <span className="nav-link-text">Products</span>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li className="nav-item ">
                                                            <a className="nav-link " href="categories.html">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="nav-link-icon"> <i className="bi bi-list-task"></i></span>
                                                                    <span className="nav-link-text">Categories</span>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link   collapsed " href="#"
                                                                data-bs-toggle="collapse" data-bs-target="#navOrders" aria-expanded="false"
                                                                aria-controls="navOrders">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="nav-link-icon"> <i className="bi bi-bag"></i></span>
                                                                    <span className="nav-link-text">Orders</span>
                                                                </div>
                                                            </a>
                                                            <div id="navOrders" className="collapse "
                                                                data-bs-parent="#sideNavbar">
                                                                <ul className="nav flex-column">
                                                                    <li className="nav-item ">
                                                                        <a className="nav-link "
                                                                            href="order-list.html">
                                                                            List
                                                                        </a>
                                                                    </li>
                                                               
                                                                    <li className="nav-item ">
                                                                        <a className="nav-link "
                                                                            href="order-single.html">
                                                                            Single

                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </li>
                                                        <li className="nav-item ">
                                                            <a className="nav-link " href="vendor-grid.html">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="nav-link-icon"> <i className="bi bi-shop"></i></span>
                                                                    <span className="nav-link-text">Sellers / Vendors</span>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li className="nav-item ">
                                                            <a className="nav-link " href="customers.html">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="nav-link-icon"> <i className="bi bi-people"></i></span>
                                                                    <span className="nav-link-text">Customers</span>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li className="nav-item ">
                                                            <a className="nav-link " href="reviews.html">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="nav-link-icon"> <i className="bi bi-star"></i></span>
                                                                    <span className="nav-link-text">Reviews</span>
                                                                </div>
                                                            </a>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>

                                            </nav>
    
    
    
    </>);
}
export default VerticalNav;