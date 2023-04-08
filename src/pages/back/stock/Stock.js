function Stock(){


    return(
<main className="main-content-wrapper">
        <div className="container">
          <div className="row mb-8">
            <div className="col-md-12">
              {/* page header */}
              <div className="d-md-flex justify-content-between align-items-center">
                <div>
                  <h2>Products</h2>
                  {/* breacrumb */}
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                      <li className="breadcrumb-item"><a href="#" className="text-inherit">Dashboard</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Products</li>
                    </ol>
                  </nav>
                </div>
                {/* button */}
                <div>
                  <a href="add-product.html" className="btn btn-primary">Add Product</a>
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
                        <input className="form-control" type="search" placeholder="Search Products" aria-label="Search" />
                      </form>
                    </div>
                    {/* select option */}
                    <div className="col-lg-2 col-md-4 col-12">
                      <select className="form-select">
                        <option selected>Action</option>
                        <option value={1}>Add</option>
                        <option value={2}>Remove</option>
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

                          <th>Actual quantity</th>
                          <th>Action</th>
                          <th>Added quantity</th>
                          <th>Removed quantity</th>
                          <th>Create at</th>

                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>100</td>
                          <td>
                            <span className="badge bg-light-primary text-dark-primary">Add</span>
                          </td>
                          <td>20</td>
                          <td>15</td>
                          <td>24 Nov 2022</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
                <div className=" border-top d-md-flex justify-content-between align-items-center px-6 py-6">
                  <span>Showing 1 to 8 of 12 entries</span>
                  <nav className="mt-2 mt-md-0">
                    <ul className="pagination mb-0 ">
                      <li className="page-item disabled"><a className="page-link " href="#!">Previous</a></li>
                      <li className="page-item"><a className="page-link active" href="#!">1</a></li>
                      <li className="page-item"><a className="page-link" href="#!">2</a></li>
                      <li className="page-item"><a className="page-link" href="#!">3</a></li>
                      <li className="page-item"><a className="page-link" href="#!">Next</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}
export default Stock;