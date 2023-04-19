
import { Link, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Categories = (props) => {
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);
  const [searchQueryByCategoryName, setsearchQueryByCategoryName] = useState("");
  const [seeMore, setSeeMore] = useState(5);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const searchObject = { label: searchQueryByCategoryName };
    if (searchQueryByCategoryName?.length > 0) {
      axios
        .post("/products/cat/searchCategoryByLabel", searchObject)
        .then((res) => {
          setAllCategories(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios.get("/products/cat").then((res) => {
        setAllCategories(res.data);
      });
    }
  }, [searchQueryByCategoryName]);
  const handleSeeMore = () => {
    setSeeMore((prevState) => prevState + 5);
  };

  const editCategory = (id) => {
    if (id) {
      navigate('/dashboard/addCategory', { state: { id } });
    }
  }

  const deleteCategory = (id) => {
    axios
        .delete(`/products/cat/${id}`)
        .then((res) => {
          axios.get("/products/cat").then((res) => {
            setAllCategories(res.data);
          });
        })
        .catch((err) => console.log(err));
  }


  return (
    <>

<main className="main-content-wrapper">
        <div className="container">
          {/* row */}
          <div className="row mb-8">
            <div className="col-md-12">
              <div className="d-md-flex justify-content-between align-items-center">
                {/* pageheader */}
                <div>
                  <h2>Categories</h2>
                  {/* breacrumb */}
                  <nav aria-label="breadcrumb">
                  
                  </nav>
                </div>
                {/* button */}
                <div>
                  <Link to="/dashboard/addCategory"> <a className="btn btn-primary">Add New Category</a> </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-xl-12 col-12 mb-5">
              {/* card */}
              <div className="card h-100 card-lg">
                <div className=" px-6 py-6 ">
                  <div className="row justify-content-between">
                    <div className="col-lg-4 col-md-6 col-12 mb-2 mb-md-0">
                      {/* form */}
                      <form className="d-flex" role="search">
                        <input 
                          className='form-control'
                          type='search'
                          placeholder='Search Category'
                          aria-label='Search'
                          value={searchQueryByCategoryName}
                          onChange={(e) =>
                            setsearchQueryByCategoryName(e.target.value)
                          }
                        />
                      </form>
                    </div>
                  </div>
                </div>
                {/* card body */}
                <div className="card-body p-0">
                  {/* table */}
                  <div className="table-responsive ">
                    <table className="table table-centered table-hover mb-0 text-nowrap table-borderless table-with-checkbox">
                      <thead className="bg-light">
                        <tr>
                          <th>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" defaultValue id="checkAll" />
                              <label className="form-check-label" htmlFor="checkAll">
                              </label>
                            </div>
                          </th>
                          <th>Icon</th>
                          <th> Name</th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody style={{minHeight:"100px"}}>
                        {allCategories?.slice(startIndex,endIndex).map((category, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className="form-check">
                                  <input className="form-check-input" type="checkbox" defaultValue id="categoryOne" />
                                  <label className="form-check-label" htmlFor="categoryOne">
                                  </label>
                                </div>
                              </td>
                              <td>
                                <a href="#!"> <img src={`http://localhost:5002/categoryUploads/${category.imagePath}`} alt="" className="icon-shape icon-sm" /></a>
                              </td>
                              <td><a className="text-reset">{category.label}</a></td>
                              <td>
                                <div className="dropdown">
                                  <a href="#" className="text-reset" data-bs-toggle="dropdown" aria-expanded="false">
                                  <i class="feather-icon icon-more-vertical"/>
                                  </a>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <a style={{cursor:"pointer"}} className="dropdown-item" onClick={() => deleteCategory(category._id)}><i className="bi bi-trash me-3" />
                                      Delete
                                      </a>
                                    </li>
                                    <li>
                                      <a style={{cursor:"pointer"}} className="dropdown-item" onClick={() => editCategory(category._id)}><i className="bi bi-pencil-square me-3 " />
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
                                    Showing {Math.min(itemsPerPage, allCategories.length)} of {allCategories.length} categories
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
                                        {Array.from({ length: Math.ceil(allCategories.length / itemsPerPage) }, (_, i) => (
                                          <li
                                            key={i}
                                            className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
                                            onClick={() => setCurrentPage(i + 1)}
                                          >
                                            <span className="page-link">{i + 1}</span>
                                          </li>
                                        ))}
                                        { (endIndex<allCategories.length)  &&                                    
                                          <li className="page-item">
                                            <a className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</a></li>
                                        
                                        }
                                        { (endIndex>=allCategories.length)  &&                                    
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
export default Categories;
