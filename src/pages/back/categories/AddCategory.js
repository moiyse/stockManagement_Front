import { useNavigate,Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";

const AddCategory = (props) => {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [imageSrc,setImageSrc] = useState("")
  const location = useLocation();
  const id = location.state?.id;

  
  useEffect(() => {
    if (id) {
      console.log("id : ",id)
        axios
        .get(`/products/cat/${id}`)
        .then(function (response) {
            console.log(response.data)
            setCategoryName(response.data.label)
            setCategoryDescription(response.data.description)
            setImagePath(response.data.imagePath)
        })
        .catch((error) => {
            console.log("error in get category : ",error)
        })
    }else
    console.log("no id !!!!")
  }, [id]);

  const handleFileSelect = (event) => {
    console.log("event.target : ",event.target.files[0])
    setSelectedFile(event.target.files[0]);
    convertBase64(event.target.files[0])
  }

  const convertBase64 = (file) => {
    console.log("File : ",file)
    const mimeType = file.type;
    setImagePath("")

  // Check if the MIME type starts with 'image'
  if (mimeType.startsWith('image')) {
    // Read the file as a data URL
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
      setImageSrc(`data:${mimeType};base64,${base64String}`);
    };
    reader.readAsDataURL(file);
  } else {
    console.error('Invalid file type.');
  }

  }

  const handleCategoryDescriptionChange = (e) => {
    setCategoryDescription(e.target.value);
  }

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  }

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("categoryDescription", categoryDescription);
    if(selectedFile)
    {
      formData.append("categoryImage", selectedFile);
    }
    console.log("selected file : ",selectedFile)
    console.log("formdata get : ",formData.get("categoryName"),formData.get("categoryDescription"),formData.get("categoryImage"))
    if(id){
      axios
    .put(`http://localhost:5002/cat/${id}`, formData)
    .then(function (response) {
        navigate("/admin/categories")
        
    })
    .catch((error) => {
        console.log("error in add category : ",error)
    })
    }else {
      axios
    .post("http://localhost:5002/cat", formData)
    .then(function (response) {
        console.log(response.data)
        navigate("/admin/categories")
        
    })
    .catch((error) => {
        console.log("error in add category : ",error)
    })
    }
    
  };


  return (
    <>
      <main className="main-content-wrapper">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row mb-8">
            <div className="col-md-12">
              <div className="d-md-flex justify-content-between align-items-center">
                {/* page header */}
                <div>
                  <h2>Add New Category</h2>
                  {/* breacrumb */}
                  <nav aria-label="breadcrumb">
                    
                  </nav>
                </div>
                <div>
                  <Link to="/admin/categories"><a href="categories.html" className="btn btn-secondary">Back to Categories</a></Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-12">
              {/* card */}
              <div className="card mb-6 shadow border-0">
                <form onSubmit={handleSubmit}>
                  <div className="card-body p-6 ">
                    <h4 className="mb-5 h5">Category Image*</h4>
                    <div className="mb-4 d-flex">
                      <div className="position-relative">
                      {imagePath !== "" ? (
                        <img
                          className="image icon-shape icon-xxxl bg-light rounded-4"
                          src={`http://localhost:5002/categoryUploads/${imagePath}`}
                          alt="Image"
                        />
                      ) : (
                        <img
                          className="image icon-shape icon-xxxl bg-light rounded-4"
                          src={imageSrc}
                          alt="Image"
                        />
                      )}
                        
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
                    <h4 className="mb-4 h5 mt-5">Category Information</h4>
                    <div className="row">
                      {/* input */}
                      <div className="mb-3 col-lg-6">
                        <label className="form-label">Category Name*</label>
                        <input type="text"
                          className="form-control"
                          placeholder="Category Name"
                          value={categoryName}
                          onChange={handleCategoryNameChange}
                          required 
                           />
                      </div>
                      {/* input */}
                      {/*<div className="mb-3 col-lg-6">
                        <label className="form-label">Parent Category</label>
                        <select className="form-select">
                          <option selected>Category Name</option>
                          <option value="Dairy, Bread & Eggs">Dairy, Bread &amp; Eggs</option>
                          <option value="Snacks & Munchies">Snacks &amp; Munchies</option>
                          <option value="Fruits & Vegetables">Fruits &amp; Vegetables</option>
                        </select>
                      </div>*/}
                      <div>
                      </div>
                      {/* input */}
                      <div className="mb-3 col-lg-12 ">
                        <label className="form-label">Description*</label>
                        <textarea
                         className="form-control"
                          rows={3}
                          placeholder="Meta Description"
                          value={categoryDescription}
                          onChange={handleCategoryDescriptionChange}
                          required 
                          defaultValue={""} />
                      </div>
                      <div className="col-lg-12">
                        <button type="submit" className="btn btn-light-primary">
                        {id ? 'Update' : 'Create'} Category
                        </button>
                        <Link to="/admin/categories">
                        <a className="btn btn-secondary ms-2">
                          cancel
                        </a>
                        </Link>
                        
                      </div>
                    </div>
                  </div>
                </form>
                {/* card body */}
                
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
};
export default AddCategory;