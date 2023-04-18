import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import {  toast } from "react-toastify";
import { notify } from "../../../utils/HelperFunction";
import Categories from "../categories/Categories";

const UpdateProduct = (props) => {

    const [productName, setProductName] = useState("");
    const [productCode, setProductCode] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productReduction, setProductReduction] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [productionDate, setProductionDate] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [inStock, setInStock] = useState(false);
    const [image, setProductImage] = useState("");
    const [quantity, setProductQuantity] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const location = useLocation();
    const id = location.state?.id;

    const handleFileSelect = (event) => {
      console.log("event.target : ",event.target.files[0])
      setSelectedFile(event.target.files[0]);
    }



    useEffect(() => {
        if (id) {
          console.log("id : ",id)
            axios
            .get(`/products/prod/${id}`)
            .then(function (response) {
                console.log(response.data)
                setProductName(response.data.name)
                setExpirationDate(response.data.expirationDate)
                setInStock(response.data.inStock)
                setProductCode(response.data.code)
                setProductDescription(response.data.description)
                setProductPrice(response.data.price)
                setProductQuantity(response.data.quantity)
                setProductReduction(response.data.reduction)
                setProductionDate(response.data.productionDate)
                setProductImage(response.data.image)
            })
            .catch((error) => {
                console.log("error in get product : ",error)
            })
        }else{
            console.log("no id !!!!")
        }
        
      }, [id]);



      const handleUpdate = async (e) => {
        console.log("id : ",id)
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", productName);
        formData.append("code", productCode);
        formData.append("description", productDescription);
        formData.append("price", productPrice);
        formData.append("reduction", productReduction);
        formData.append("quantity", quantity);
        formData.append("inStock", inStock);
        formData.append("productionDate", productionDate);
        formData.append("expirationDate", expirationDate);
        //formData.append("category", category);
        if(selectedFile)
        {
          formData.append("ProductImage", selectedFile);
        }
        axios
        .put(`http://localhost:5002/prod/${id}`, formData)
        .then(function (response) {
            
            
        })
        .catch((error) => {
            console.log("error in edit product : ",error)
        })
        
        
      };


    return (
      <>

     <div>
        
        <div className="main-wrapper">
        
         
          {/* main */}
          <main className="main-content-wrapper">
            {/* container */}
            <div className="container">
              {/* row */}
              <div className="row mb-8">
                <div className="col-md-12">
                  <div className="d-md-flex justify-content-between align-items-center">
                    {/* page header */}
                    <div>
                      <h2>Update New Product</h2>
                    </div>
                    {/* button */}
                    <div> 
                        <Link to="/dashboard/products"><a className="btn btn-light">Back to Product</a> </Link>
                      
                    </div>
                  </div>
                </div>
              </div>
              {/* row */}
              <form onSubmit={handleUpdate}>
                <div className="row">
                
                    <div className="col-lg-8 col-12">
                    {/* card */}
                    <div className="card mb-6 card-lg">
                        {/* card body */}
                        <div className="card-body p-6 ">
                        <h4 className="mb-4 h5" style={{padding:"10px"}}>Product Information</h4>
                        <div className="row">
                            {/* input */}
                            <div className="mb-3 col-lg-6">
                            <label className="form-label">Product Name*</label>
                            <input
                            type="text"
                            className="form-control" 
                            placeholder="Product Name" 
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required />
                            </div>
                            
                            {/* input */}
                            <div className="mb-3 col-lg-6">
                            <label className="form-label">Code*</label>
                            <input 
                            type="number" 
                            className="form-control"
                            placeholder="Enter Product code" 
                            value={productCode}
                            onChange={(e) => setProductCode(e.target.value)}
                            required />
                            </div>
                        
                            {/* input */}
                            <div className="mb-3 col-lg-6">
                            <label className="form-label">Production Date*</label>
                            <input 
                            type="Date" 
                            className="form-control" 
                            placeholder="Enter Expiration Date"
                            value={productionDate}
                            onChange={(e) => setProductionDate(e.target.value)}
                            required />
                            </div>
                            {/* input */}
                            <div className="mb-3 col-lg-6">
                            <label className="form-label">Expiration Date*</label>
                            <input 
                            type="Date" 
                            className="form-control" 
                            placeholder="Enter Production Date"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            
                            required />
                            </div>
                            <div>
                            <div className="mb-3 col-lg-12 mt-5">
                                {/* heading */}
                                <h4 className="mb-3 h5">Product Images</h4>
                                <div className="mb-4 d-flex">
                        <div className="position-relative">
                            <img 
                            className="image icon-shape icon-xxxl bg-light rounded-4"
                            src={`http://localhost:5002/productUploads/${image}`} 
                            alt="Image" />
                            <div className="file-upload position-absolute end-0 top-0 mt-n2 me-n1">
                            <input 
                            type="file"
                            className="file-input " 
                            onChange={handleFileSelect} />
                            <span className="icon-shape icon-sm rounded-circle bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="currentColor" className="bi bi-pencil-fill text-muted" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                            </span>
                            </div>
                        </div>
                        </div>
                            
                            </div>
                            </div>
                            {/* input */}
                            <div className="mb-3 col-lg-12 mt-5">
                            <div class="mb-3 ">
                                <label class="form-label">Product Descriptions</label>
                                    <textarea
                                    class="form-control add" 
                                    id="editor"
                                    rows="3"
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                        placeholder="Product Description"/>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-4 col-12">
                    {/* card */}
                    <div className="card mb-6 card-lg">
                        {/* card body */}
                        <div className="card-body p-6">
                        {/* input */}
                        <div className="form-check form-switch mb-4">
                            <input className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchStock"
                            checked={inStock}
                            onChange={(e) => setInStock(e.target.checked)}
                            defaultChecked />
                            <label className="form-check-label" htmlFor="flexSwitchStock">In Stock</label>
                        </div>
                        
                        <div>
                            {/* input */}
                            <div className="mb-3 ">
                            <label className="form-label">Product Category</label>
                            <select className="form-select" >
                                <option selected>Product Category</option>
                                <option value="Dairy, Bread & Eggs">Dairy, Bread &amp; Eggs</option>
                                <option value="Snacks & Munchies">Snacks &amp; Munchies</option>
                                <option value="Fruits & Vegetables">Fruits &amp; Vegetables</option>
                            </select>
                            </div>
                            
                            {/* input */}
                            <div className="mb-3">
                            <label 
                            className="form-label" 
                            id="productSKU"
                            >Quantity</label><br />

                            <input type="Number" 
                            className="form-control"
                            placeholder="Enter quantity of the product"
                            value={quantity}
                            onChange={(e) => setProductQuantity(e.target.value)}
                            required />

                            
                            {/* input */}
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* card */}
                    <div className="card mb-6 card-lg">
                        {/* card body */}
                        <div className="card-body p-6">
                        <h4 className="mb-4 h5">Product Price</h4>
                        {/* input */}
                        <div className="mb-3">
                            <label className="form-label"> Price</label>
                            <input 
                            type="number"
                            className="form-control" 
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            placeholder="0.00 DT" />
                        </div>
                        {/* input */}
                        <div className="mb-3">
                            <label className="form-label">Reduction Price</label>
                            <input 
                            type="number" 
                            className="form-control"
                            value={productReduction}
                            onChange={(e) => setProductReduction(e.target.value)}
                            placeholder="0.00 DT" />
                        </div>
                        </div>
                    </div>
                    
                    {/* button */}
                    <div className="d-grid">
                    
                        <a  className="btn btn-primary"
                        onClick={handleUpdate}>
                        Update Product
                        </a>
                    </div>
                    </div>
                    
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>


      </>
    );
  };
  export default UpdateProduct;
  