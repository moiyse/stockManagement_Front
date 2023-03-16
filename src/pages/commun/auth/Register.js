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
    console.log(formData);

    axios
      .post("http://localhost:5000/api/auth/signup", formData)
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
      <div className='border-bottom shadow-sm'>
        <nav className='navbar navbar-light py-2'>
          <div className='container justify-content-center justify-content-lg-between'>
            <a className='navbar-brand' href='../index.html'>
              <img
                src='../assets/images/logo/logo.png'
                style={{ width: "80px" }}
                alt=''
                className='d-inline-block align-text-top'
              />
            </a>
            <span className='navbar-text'>
              Already have an account?{" "}
              <Link to='/'>
              Sign In
              </Link>
            </span>
          </div>
        </nav>
      </div>
      <section className='my-lg-14 my-8'>
        {/* container */}
        <div className='container'>
          {/* row */}
          <div className='row justify-content-center align-items-center'>
            <div className='col-12 col-md-6 col-lg-4 order-lg-1 order-2'>
              {/* img */}
              <img
                src='../assets/images/svg-graphics/signup-g.svg'
                alt=''
                className='img-fluid'
              />
            </div>
            {/* col */}
            <div className='col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1'>
              <div className='mb-lg-9 mb-5'>
                <h1 className='mb-1 h2 fw-bold'>Welcome to EcoWaste</h1>
                <p>Welcome to EcoWaste! Sign up to get started.</p>
              </div>
              {error && (
                <div className='alert alert-danger' role='alert'>
                  {error}
                </div>
              )}
              {/* form */}
              <form
                onSubmit={handleSubmit((data) => {
                  handleSubmitt(data);
                  console.log(errors);
                })}
                encType='multipart/form-data'
              >
                <div className='row g-3'>
                  {/* col */}
                  <div className='col-6'>
                    {/* input */}
                    <input
                      type='text'
                      className='form-control'
                      placeholder='First Name'
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
                      placeholder='Last Name'
                      id='lastname'
                      autoComplete='off'
                      autoSave='off'
                      aria-label='lastname'
                      {...register("lastname")}
                    />
                    <Error message={errors.lastname?.message}></Error>
                  </div>
                  <div className='col-12'>
                    {/* input */}
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Full Name'
                      id='username'
                      autoComplete='off'
                      autoSave='off'
                      aria-label='Last name'
                      {...register("username")}
                    />
                    <Error message={errors.username?.message}></Error>
                  </div>
                  <div className='col-12'>
                    {/* input */}
                    <input
                      type='email'
                      className='form-control'
                      id='email'
                      placeholder='Email'
                      {...register("email")}
                    />
                    <Error message={errors.email?.message}></Error>
                  </div>
                  <div className='col-12'>
                    <div className='password-field position-relative'>
                      <input
                        type='password'
                        id='password'
                        placeholder='Enter Password'
                        className='form-control'
                        {...register("password")}
                      />
                      <Error message={errors.password?.message}></Error>
                      <span>
                        <i id='passwordToggler' className='bi bi-eye-slash' />
                      </span>
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='password-field position-relative'>
                      <input
                        type='text'
                        id='phoneNumber'
                        placeholder='Enter your phone number'
                        className='form-control'
                        {...register("phoneNumber")}
                      />
                      <Error message={errors.phoneNumber?.message}></Error>
                    </div>
                  </div>
                  <div className='col-12'>
                    {/* input */}
                    <input
                      type='file'
                      className='form-control'
                      id='image'
                      placeholder='Upload Image'
                      {...register("image")}
                    />
                    <Error message={errors.image?.message}></Error>
                  </div>
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
                  {/* btn */}
                  <div className='col-12 d-grid'>
                    {" "}
                    <button type='submit' className='btn btn-primary'>
                      Register
                    </button>
                  </div>
                  {/* Facebook SignUp */}
                  {/* 
                  <div className='col-12 d-grid'>
                    {" "}
                    <a className='btn btn-info' onClick={handleFacebookSignup}>
                      <i className='bi-brands bi-facebook'></i> Sign up with Facebook
                    </a>
                  </div>
                  */}
                  {/* Google SignUp */}
                  <div className='col-12 d-grid'>
                    {" "}
                    <a className='btn btn-secondary' onClick={() => signupG()}>
                      <i className='bi-brands bi-google'></i> Sign up with Google
                    </a>
                  </div>
                  {/* text */}
                  <p>
                    <small>
                      By continuing, you agree to our{" "}
                      <a href='#!'> Terms of Service</a> &amp;{" "}
                      <a href='#!'>Privacy Policy</a>
                    </small>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
