import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../../../utils/HelperFunction";

const Products = (props) => {
  const navigate = useNavigate();
  
  const [allProducts, setAllProducts] = useState([]);
  const [searchQueryByProductname, setSearchQueryByProductname] = useState("");
  const [searchQueryByStock, setSearchQueryByStock] = useState("");
  const [stock, setStock] = useState("");
   // Pagination state
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(5);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;

   const handleStockChange = (e) => {
    const selectedValue = e.target.value;
    console.log(searchQueryByStock);
    if(selectedValue === "In stock") {
      setStock(true);
    } else if(selectedValue === "Out of stock") {
      setStock(false);
    }
    setSearchQueryByStock(selectedValue);
  };

   useEffect(() => {
    const searchObject = { name: searchQueryByProductname };
    const sObject = { inStock: stock };
    if (searchQueryByStock!="" ) {
      axios
      .post("http://localhost:5000/products/prod/searchProductByStock", sObject)
      .then((res) => {
        setAllProducts(res.data);
        console.log(sObject);
        console.log(res.data);
        
      })
      .catch((err) => console.log(err));
       
    }else if (searchQueryByProductname?.length > 0) {
      console.log(searchObject);
      axios
        .post("http://localhost:5000/products/prod/searchProductByName", searchObject)
        .then((res) => {
          setAllProducts(res.data);
         
          
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get("http://localhost:5000/products/prod")
        .then((res) => {
          setAllProducts(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchQueryByProductname, currentPage, itemsPerPage, searchQueryByStock]);



  const editProduct = (id) => {
    if (id) {
      navigate('/dashboard/editProduct', { state: { id } });
    }
  }



  const deleteProduct= (id) => {
    axios
        .delete(`http://localhost:5000/products/prod/${id}`)
        .then((res) => {
          axios.get("/products/prod").then((res) => {
            setAllProducts(res.data);
          });
        })
        .catch((err) => console.log(err));
  }

 
  return (
    <>

    <main className="main-content-wrapper">
            <div className="container">
              <div className="row mb-8">
                <div className="col-md-12">
                  {/* page header */}
                  <div className="d-md-flex justify-content-between align-items-center">
                    <div>
                      <h2>Products </h2>
                      
                    </div>
                    {/* button */}
                    
                    <div>
                      <Link to="/dashboard/addProduct"><a className="btn btn-primary">Add Product</a> </Link>
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
                          className='form-control'
                          type='search'
                          placeholder='Search Customers'
                          aria-label='Search'
                          value={searchQueryByProductname}
                          onChange={(e) =>
                            setSearchQueryByProductname(e.target.value)
                          }
                        />
                          </form>
                        </div>
                        {/* select option */}
                        <div className="col-lg-2 col-md-4 col-12">
                        <select className="form-select" value={searchQueryByStock} 
                         onChange={handleStockChange}>
                          <option value="">Status</option>
                          <option value="In stock">In stock</option>
                          <option value="Out of stock">Out of stock</option>
                        </select>
                          
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
                                  <input className="form-check-input" type="checkbox" defaultValue id="checkAll" />
                                  <label className="form-check-label" htmlFor="checkAll">
                                  </label>
                                </div>
                              </th>
                              <th>Image</th>
                              <th>Code</th>
                              <th>Product Name</th>
                              <th>Category</th>
                              <th>Stock</th>
                              <th>Price</th>
                              <th>Reduction Price</th>
                              <th>Create at</th>
                              <th>Action</th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                          {allProducts?.slice(startIndex,endIndex).map((product, index) => {
                            return(
                            <tr key={index} >
                              
                              <td>
                                <div className="form-check">
                                  <input className="form-check-input" type="checkbox" defaultValue id="productOne" />
                                  <label className="form-check-label" htmlFor="productOne">
                                  </label>
                                </div>
                              </td>
                              <td>
                                <a href="#!"> 
                                  <img 
                                  src={`http://localhost:5002/productUploads/${product.image}`}
                                  alt="" 
                                  className="icon-shape icon-md" 
                                  />
                                </a>
                              </td>
                              <td>
                                #{product.code}
                              </td>
                              <td>
                                <a 
                                href="#" 
                                className="text-reset">
                                  {product.name}
                                </a>
                              </td>
                              
                              <td>
                                {product.category}
                              </td>
                              <td  style={{ textAlign: "center" }}  >
                                <span 
                                  className={`badge 
                                    ${product?.inStock ? 
                                    "bg-light-primary text-dark-primary" : "bg-light-danger text-dark-danger"}`
                                  }>
                                  {product?.inStock ? "In Stock" : "Out of Stock"}
                                </span>   
                              </td>
                              <td  style={{ textAlign: "center" }}  >
                                {product.price}
                              </td>
                              <td  style={{ textAlign: "center" }}  >
                                {product.reduction}
                              </td>
                              <td  style={{ textAlign: "center" }}  >
                                {/*
                                {new Date(product.addedDate).toLocaleString()}
                                */}
                                {new Date(product.addedDate).toLocaleDateString()}
                              </td>
                              <td>
                              {/*<a className="text-reset" 
                              onClick={() => navigate('/dashboard/stock/64318a960d370aad6854bb50') }>
                                show
                              </a>*/}
                              <div className="dropd
                              own">
                                <a href="#" className="text-reset" data-bs-toggle="dropdown" aria-expanded="false">
                                
                                <i className='feather-icon icon-more-vertical fs-5' />
                                </a>
                                <ul className="dropdown-menu">
                                  <li onClick={() => deleteProduct(product._id)}>
                                    <a className="dropdown-item" >
                                    <i className="bi bi-trash me-3" />
                                     Delete
                                    </a>
                                  </li>
                                  <li >
                                    <a onClick={() => editProduct(product._id)}
                                    className="dropdown-item" href="#">
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
                                    Showing {Math.min(itemsPerPage, allProducts.length)} of {allProducts.length} products
                                  </div>
                                  <div>
                                    <nav aria-label="Page navigation">
                                      <ul className="pagination">
                                      {(startIndex>1)  && 
                                      <li className="page-item ">
                                        <a className="page-link " onClick={() => setCurrentPage(currentPage - 1)}>
                                          Previous</a>
                                      </li>}
                                      {(currentPage===1)  && 
                                      <li className="page-item disabled">
                                        <a className="page-link " >
                                          Previous</a>
                                      </li>}
                                        {Array.from({ length: Math.ceil(allProducts.length / itemsPerPage) }, (_, i) => (
                                          <li
                                            key={i}
                                            className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
                                            onClick={() => setCurrentPage(i + 1)}
                                          >
                                            <span className="page-link">{i + 1}</span>
                                          </li>
                                        ))}
                                        { (endIndex<allProducts.length)  &&                                    
                                          <li className="page-item">
                                            <a className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</a></li>
                                        
                                        }
                                        { (endIndex>=allProducts.length)  &&                                    
                                          <li className="page-item disabled">
                                            <a className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</a></li>
                                        
                                        }
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
export default Products;
