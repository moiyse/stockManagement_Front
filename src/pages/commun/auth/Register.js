import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Error from "../../../components/commun/errors";
import * as yup from "yup";
import axios from "axios";
import { useState,useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { signupGoogle,signupFacebook } from "../../../actions/auth";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";

const schema = yup
  .object({
    username: yup.string().required().min(6,"Username must be 6 characters long"),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    phoneNumber: yup.string().required(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
  })
  .required();

function Register() {

  const [type, setType]=useState('password');
  const [icon, setIcon]=useState('bi bi-eye-slash');

  const handleToggle=()=>{
      if(type==='password'){
          setIcon('bi bi-eye');
          setType('text');
      }else{
          setIcon('bi bi-eye-slash');
          setType('password');
      }
  }
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isTwoFactorAuthEnabled, setIsTwoFactorAuthEnabled] = useState(false);

  const handleSubmitt = (data) => {
    const formData = new FormData();
    console.log(data.image[0]);
    formData.append("image", data.image[0]); // add the image file to the form data

    // append the other form data to the form data
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("roles", ["user"]);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("lastname", data.lastname);
    formData.append("firstname", data.lastname);
    if (isTwoFactorAuthEnabled) {
      formData.append("enableTwoFactorAuth", "true");
    }
    console.log("formData : ",formData);

    axios
      .post("http://localhost:5001/auth/signup", formData)
      .then(function (response) {
        console.log(response.data.message);
        window.location.href = "/";
      })
      .catch(function (error) {
        console.log(error);
        setError(error.response.data.message);

      });

    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleGoogleSignupSuccess(tokenResponse) {
    console.log("token Response : ", tokenResponse);
    const accessToken = tokenResponse.access_token;
    dispatch(signupGoogle(accessToken))
      .then((data) => {
        navigate("/");
        //  window.location.reload();
      })
      .catch((error) => {
        console.log("error : ", error);
        setError(error);
      });
  }

/************************* Facebook Signup************************
  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '165208916350364',
        cookie     : true,
        xfbml      : true,
        version    : 'v11.0'
      });
        
      window.FB.AppEvents.logPageView();   
    };
    
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }, []);

  const handleFacebookSignup = async () => {
    await window.FB.Event.subscribe('auth.statusChange', async function(response) {
      if (response.authResponse) {
        console.log("auth Response : ",response.authResponse.accessToken)
        const access_token = response.authResponse.accessToken;
        console.log("access token : ",access_token)
        dispatch(signupFacebook(access_token))
        .then((data) => {
          navigate("/");
          //  window.location.reload();
        })
        .catch((error) => {
          console.log("error : ", error);
        });

      // Send the access token to your server for server-side authentication
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  });

  window.FB.login(function(response) {
    // No need to do anything here
  }, {scope: 'public_profile,email'});
}
  *****************************************************************/

  const signupG = useGoogleLogin({ onSuccess: handleGoogleSignupSuccess });

  return (
    <>
      {" "}
      <div>
        <div className="form-shape" />
        <div className="form-wrapper">
          <div className="container">
            <div className="card">
              <div className="row no-gutters">
                <div className="col">
                  <div className="row">
                    <div className="col-md-10 offset-md-1">
                      <div className="ltf-block-logo d-block d-lg-none text-center text-lg-left">
                        <img src="../assets/images/logo/logo.png" alt="logo" />
                      </div>
                      <div className="my-5 text-center text-lg-left">
                        <h3 className="font-weight-bold">Sign Up</h3>
                        <p className="text-muted">Welcome to EcoWaste! Sign up to get started.</p>
                      </div>
                      <form 
                      onSubmit={handleSubmit((data) => {
                        handleSubmitt(data);
                        console.log(errors);
                      })}
                      encType='multipart/form-data'
                      >
                        {/* first and last name */}
                        <div className="form-group">
                          <div className="form-icon-wrapper">
                          <div className='row g-3'>
                            {/* col */}
                            <div className='col-6'>
                              {/* input */}
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Enter First Name *'
                                id='firstname'
                                autoComplete='off'
                                autoSave='off'
                                aria-label='firstname'
                                {...register("firstname")}
                              />
                              <Error message={errors.firstname?.message}></Error>
                            </div>
                            <div className='col-6'> 
                              {/* input */}
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Last Name *'
                                id='lastname'
                                autoComplete='off'
                                autoSave='off'
                                aria-label='lastname'
                                {...register("lastname")}
                              />
                            <Error message={errors.lastname?.message}></Error>
                            </div>
                          </div>                        
                        </div>
                        </div>
                         {/* full name */}
                        <div className="form-group">
                          <div className="form-icon-wrapper">
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Enter Username*'
                            id='username'
                            autoComplete='off'
                            autoSave='off'
                            aria-label='Last name'
                            {...register("username")}
                          />
                          <i className="form-icon-left mdi bi-person-fill" />
                          </div>
                          <Error message={errors.username?.message}></Error>

                        </div>
                         {/* email */}
                        <div className="form-group">
                          <div className="form-icon-wrapper">
                          <input
                            type='email'
                            className='form-control'
                            id='email'
                            placeholder='Enter Email*'
                            {...register("email")}
                          />
                            <i className="form-icon-left mdi bi-envelope-fill" />
                          </div>
                          <Error message={errors.email?.message}></Error>
                        </div>
                         {/* Password */}
                        <div className="form-group">
                          <div className="form-icon-wrapper">
                          <input
                            type={type}
                            id='password'
                            placeholder='Enter Password*'
                            className='form-control'
                            {...register("password")}
                          />
                           <i className="form-icon-left mdi bi-lock-fill" />
                                  <a onClick={handleToggle} className="form-icon-right password-show-hide" title="Hide or show password">
                                                    <i className={icon} />
                                  </a>
                          </div>
                          <Error message={errors.password?.message}></Error>
                          
                          
                        </div>
                        {/* Phone number */}
                        <div className="form-group">
                          <div className="form-icon-wrapper">
                          <input
                            type='number'
                            id='phoneNumber'
                            placeholder='Enter your phone number*'
                            className='form-control'
                            {...register("phoneNumber")}
                          />
                            <i className="form-icon-left mdi bi-telephone-fill" />      
                          </div>
                          <Error message={errors.phoneNumber?.message}></Error>

                        </div>
                        {/* Image */}
                        <div className="form-group">
                          <div className="form-icon-wrapper">
                          <input
                            type='file'
                            className='form-control'
                            id='image'
                            placeholder='Upload Image'
                            {...register("image")}
                          />
                            <i className="form-icon-left mdi bi-image-fill" />      
                          </div>
                          <Error message={errors.image?.message}></Error>

                        </div>
                        {/* TwoFactorAuth */}
                        <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value=''
                          id='flexCheckDefault'
                          onChange={(e) =>
                            setIsTwoFactorAuthEnabled(e.target.checked)
                          }
                        />
                    <label className='form-check-label' htmlFor='flexCheckDefault'>
                      Enable Two Factor Authentication
                    </label>
                        </div>

                        <div className="text-center">
                        <button type='submit' className='btn btn-primary'>
                          Sign Up
                      </button>
                        </div>
                      </form>
                      <div className="text-divider">or</div>
                      <div className="social-links justify-content-center">
                      <a  onClick={() => signupG()}>
                        <i className="mdi bi-google bg-google" />
                          Sign in with Google
                      </a>
                        
                      </div>
                      
                    </div>
                  </div>
                </div>
                <div className="col d-none d-lg-flex" style={{background: 'url(../assets/images/auth/food7.jpg)'}}>
                  <div className="logo">
                    <img src="../assets/images/logo/logo.ico" alt="logo" />
                  </div>
                  <div>
                    <h3 className="font-weight-bold">Welcome to EcoWaste!</h3>
                    <p className="lead my-5">Do you already have an account?</p>
                    <Link to="/"><a href="sign-in.html" className="btn btn-white">Sign In</a></Link>
                  </div>
                  <ul className="list-inline">
                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
