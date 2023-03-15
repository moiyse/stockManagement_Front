import axios from "axios";
import { useEffect, useState } from "react";

const Users = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchQueryByUsername, setSearchQueryByUsername] = useState("");
  const [seeMore, setSeeMore] = useState(5);

  useEffect(() => {
    const searchObject = { username: searchQueryByUsername };
    if (searchQueryByUsername?.length > 0) {
      axios
        .post("/api/auth/searchUserByUsername", searchObject)
        .then((res) => {
          setAllUsers(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios.get("/api/auth/getAllUsers").then((res) => {
        setAllUsers(res.data);
      });
    }
  }, [searchQueryByUsername]);
  const handleSeeMore = () => {
    setSeeMore((prevState) => prevState + 5);
  };
  return (
    <>
      <main className='main-content-wrapper'>
        <div className='container'>
          <div className='row mb-8'>
            <div className='col-md-12'>
              <div className='d-md-flex justify-content-between align-items-center'>
                <div>
                  <h2>Customers</h2>
                  {/* breacrumb */}
                  <nav aria-label='breadcrumb'>
                    <ol className='breadcrumb mb-0'>
                      <li className='breadcrumb-item'>
                        <a href='#' className='text-inherit'>
                          Dashboard
                        </a>
                      </li>
                      <li
                        className='breadcrumb-item active'
                        aria-current='page'
                      >
                        Customers
                      </li>
                    </ol>
                  </nav>
                </div>
            {/*   <div>
                  <a href='#!' className='btn btn-primary'>
                    Add New Customer
                  </a>
                </div>
                */}
              </div>
            </div>
          </div>
          <div className='row '>
            <div className='col-xl-12 col-12 mb-5'>
              <div className='card h-100 card-lg'>
                <div className='p-6'>
                  <div className='row justify-content-between'>
                    <div className='col-md-4 col-12'>
                      <form className='d-flex' role='search'>
                        <input
                          className='form-control'
                          type='search'
                          placeholder='Search Customers'
                          aria-label='Search'
                          value={searchQueryByUsername}
                          onChange={(e) =>
                            setSearchQueryByUsername(e.target.value)
                          }
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className='card-body p-0 '>
                  <div className='table-responsive'>
                    <table className='table table-centered table-hover table-borderless mb-0 table-with-checkbox text-nowrap'>
                      <thead className='bg-light'>
                        <tr>
                          <th>
                            <div className='form-check'>
                              <input
                                className='form-check-input'
                                type='checkbox'
                                defaultValue
                                id='checkAll'
                              />
                              <label
                                className='form-check-label'
                                htmlFor='checkAll'
                              ></label>
                            </div>
                          </th>
                          <th>Full Name</th>
                          <th>Email</th>
                          <th>Verified</th>
                          <th>Phone</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {allUsers?.slice(0, seeMore).map((user, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className='form-check'>
                                  <input
                                    className='form-check-input'
                                    type='checkbox'
                                    defaultValue
                                    id='customerOne'
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='customerOne'
                                  ></label>
                                </div>
                              </td>
                              <td>
                                <div className='d-flex align-items-center'>
                                  <img
                                    src={`http://localhost:5000/uploads/${user.image}`}
                                    alt=''
                                    className='avatar avatar-xs rounded-circle'
                                  />
                                  <div className='ms-2'>
                                    <a href='#' className='text-inherit'>
                                      {user.username}
                                    </a>
                                  </div>
                                </div>
                              </td>
                              <td>{user.email}</td>
                              <td>
                                {user?.verified ? "Verified" : "Not Verified"}
                              </td>
                              <td>{user.phoneNumber}</td>
                              <td>
                                <div className='dropdown'>
                                  <a
                                    href='#'
                                    className='text-reset'
                                    data-bs-toggle='dropdown'
                                    aria-expanded='false'
                                  >
                                    <i className='feather-icon icon-more-vertical fs-5' />
                                  </a>
                                  <ul className='dropdown-menu'>
                                    <li>
                                      <a className='dropdown-item' href='#'>
                                        <i className='bi bi-trash me-3' />
                                        Delete
                                      </a>
                                    </li>
                                    <li>
                                      <a className='dropdown-item' href='#'>
                                        <i className='bi bi-pencil-square me-3 ' />
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
                    </table>
                  </div>
                  <div className='border-top d-md-flex justify-content-between align-items-center p-6'>
                    <span>Users: {allUsers.length}</span>
                    {allUsers.length > seeMore && (
                      <nav className='mt-2 mt-md-0'>
                        <ul className='pagination mb-0 '>
                          <li className='page-item'>
                            <span className='page-link' onClick={handleSeeMore}>
                              More
                            </span>
                          </li>
                        </ul>
                      </nav>
                    )}
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
export default Users;
