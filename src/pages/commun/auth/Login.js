import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../actions/auth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [error, setError] = useState(null);

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
    console.log(username + password);
    dispatch(login(username, password))
      .then(() => {
        navigate("/home");
        //  window.location.reload();
      })
      .catch((error) => {
        setError(error);
      });
  };
  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }
  return (
    <div>
      <div className="border-bottom shadow-sm">
        <nav className="navbar navbar-light py-2">
          <div className="container justify-content-center justify-content-lg-between">
            <a className="navbar-brand" href="../index.html">
              <img
                src="../assets/images/logo/logo.png"
                style={{ width: "80px" }}
                alt=""
                className="d-inline-block align-text-top"
              />
            </a>
            <span className="navbar-text">
              Already have an account? <a href="signin.html">Sign in</a>
            </span>
          </div>
        </nav>
      </div>
      <main>
        <section className="my-lg-14 my-8">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
                <img
                  src="../assets/images/svg-graphics/signin-g.svg"
                  alt=""
                  className="img-fluid"
                />
              </div>

              <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
                <div className="mb-lg-9 mb-5">
                  <h1 className="mb-1 h2 fw-bold">Sign in to EcoWaste</h1>
                  <p>
                    Welcome back to EcoWaste! Enter your email to get started.
                  </p>
                </div>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <form>
                  <div className="row g-3">
                    <div className="col-12">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={handleChangeUsername}
                      />
                    </div>
                    <div className="col-12">
                      <div className="password-field position-relative">
                        <input
                          type="password"
                          id="fakePassword"
                          placeholder="Enter Password"
                          className="form-control"
                          onChange={handleChangePassword}
                        />
                        <span>
                          <i id="passwordToggler" className="bi bi-eye-slash" />
                        </span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      {/*  
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                         <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                          </label>
                        </div>
                        */}
                      <div>
                        {" "}
                        Forgot password?{" "}
                        <a href="forgot-password.html">Reset It</a>
                      </div>
                    </div>

                    <div className="col-12 d-grid">
                      {" "}
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={Login}
                      >
                        Sign In
                      </button>
                    </div>

                    <div>
                      Don’t have an account? <a href="signup.html"> Sign Up</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default Login;
