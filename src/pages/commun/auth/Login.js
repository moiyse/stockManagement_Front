import axios from "axios";
import { useState,useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginGoogle, login, loginFacebook } from "../../../actions/auth";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";


function Login() {
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


  const [username, setUsername] = useState("");
  const [password, SetPassword] = useState("");

  const [error, setError] = useState(null);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const handTwoFactorChange = (e) => {
    console.log(e.target.value);
    setTwoFactorCode(e.target.value);
  };

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const { error: errorr } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleChangePassword = (e) => {
    console.log(e.target.value);
    SetPassword(e.target.value);
  };

  const handleChangeUsername = (e) => {
    console.log(e.target.value);

    setUsername(e.target.value);
  };
  const Login = async (e) => {
    e.preventDefault();
    dispatch(login(username, password, twoFactorCode))
      .then((data) => {
        console.log(data.roles[0]);
        if (data.roles[0] === "ROLE_USER") {
          navigate("/home");
        } else {
          navigate("/admin");
        }

        //  window.location.reload();
      })
      .catch((error) => {
        setError(error);
        if (error === "Invalid Two Factor Secret!") {
          setTwoFactorAuth(true);
        }
      });
  };

  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;

    dispatch(loginGoogle(accessToken))
      .then((data) => {
        console.log("data from dispatch : ", data);
        console.log("role of user : ", data.roles[0]);
        if (data.roles[0] === "ROLE_USER") {
          navigate("/home");
        } else {
          navigate("/dashboard/users");
        }
        //  window.location.reload();
      })
      .catch((error) => {
        console.log("error : ", error);
        setError(error);
      });
  }


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

  const handleFacebookLogin = async () => {
    await window.FB.Event.subscribe('auth.statusChange', async function(response) {
      if (response.authResponse) {
        console.log("auth Response : ",response.authResponse.accessToken)
        const access_token = response.authResponse.accessToken;
        console.log("access token : ",access_token)
        dispatch(loginFacebook(access_token))
          .then((data) => {
            console.log("data from dispatch : ", data);
            console.log("role of user : ", data.roles[0]);
            if (data.roles[0] === "ROLE_USER") {
              navigate("/home");
            } else {
              navigate("/dashboard/users");
            }
            //  window.location.reload();
          })
          .catch((error) => {
            console.log("error : ", error);
            setError(error);
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


  const loginG = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  if (isLoggedIn) {
    return <Navigate to='/home' />;
  }
  return (
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
                              <img src="../assets/images/logo/logo.ico" alt="logo" />
                            </div>
                            <div className="my-5 text-center text-lg-left">
                              <h3 className="font-weight-bold">Sign In</h3>
                              <p className="text-muted">Sign in to Latform to continue</p>
                            </div>
                                {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                                )}
                            <form>
                              <div className="form-group">
                                <div className="form-icon-wrapper">
                                  <input 
                                  type="email" 
                                  className="form-control" 
                                  placeholder="Enter Username*" 
                                  onChange={handleChangeUsername}
                                  />

                                  <i className="form-icon-left mdi bi-envelope-fill" />
                                </div>
                              </div>
                              <div className="form-group">
                                <div className="form-icon-wrapper">
                                  <input 
                                  type={type}  
                                  id="fakePassword"
                                  className="form-control" 
                                  placeholder="Enter password*" 
                                  onChange={handleChangePassword}
                                  
                                  />
                                  <i className="form-icon-left mdi bi-lock-fill" />
                                  <a onClick={handleToggle} className="form-icon-right password-show-hide" title="Hide or show password">
                                                    <i className={icon} />
                                  </a>
                                </div>
                              </div>
                              <div className="form-group">
                                <div className="form-icon-wrapper">
                                {twoFactorAuth &&
                                  error === "Invalid Two Factor Secret!" && (
                                    <input
                                    onChange={handTwoFactorChange}
                                    type="text"
                                    name="twoFactorAuth"
                                    className="form-control"
                                    id="twoFactor"
                                    placeholder="Two Factor Auth*"
                                    />
                                ) && (
                                  <a onClick={handleToggle} className="form-icon-right password-show-hide" title="Hide or show password">
                                    <i className={icon} />
                                  </a>)}
                               
                               

                                </div>
                              </div>
                              <p className="text-center mb-4">
                                Can't access your account? <Link to="/forgetPassword"><a>Reset your password now</a></Link>.
                              </p>
                              <div className="text-center">
                                <button 
                                type="submit"
                                className="btn btn-primary mb-4"
                                onClick={Login}
                                >
                                  Sign In
                                </button>
                              </div>
                            </form>
                            <div className="text-divider">or</div>
                            <div className="social-links justify-content-center">
                              <a  href="#" onClick={() => loginG()}>
                                <i className="mdi bi-google bg-google" />
                                 Sign in with Google
                              </a>
                              <a href="#"  onClick={handleFacebookLogin}>
                                <i className="mdi bi-facebook bg-facebook" /> Sign in with Facebook
                              </a>
                            </div>
                           
                          </div>
                        </div>
                      </div>
                      <div className="col d-none d-lg-flex" style={{background: 'url(../assets/images/auth/food1.jpg)'}}>
                        <div className="logo">
                          <img src="../assets/images/logo/logo.ico" alt="logo" />
                        </div>
                        <div>
                          <h3 className="font-weight-bold">Welcome to EcoWaste!</h3>
                          <p className="lead my-5">If you don't have an account, would you like to register right now?</p>
                          <Link to="/register">
                          <a className="btn btn-white">Sign Up</a>
                          </Link>
                        </div>
                        <ul className="list-inline">
                          
                        
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    );
}
export default Login;
