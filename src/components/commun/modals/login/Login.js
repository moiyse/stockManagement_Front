import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Error from "../../errors";
import * as yup from "yup";
import { Link } from "react-router-dom";
const schema = yup
  .object({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors);
  return (
    <>
      <div
        className='modal fade'
        id='userModal'
        tabIndex='-1'
        aria-labelledby='userModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content p-4'>
            <div className='modal-header border-0'>
              <h5 className='modal-title fs-3 fw-bold' id='userModalLabel'>
                Sign Up
              </h5>

              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form onSubmit={handleSubmit((data) => console.log(data))}>
                <div className='mb-3'>
                  <label htmlFor='fullName' className='form-label'>
                    Name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='fullName'
                    placeholder='Enter Your Name'
                    {...register("fullName")}
                  />
                  <Error message={errors.fullName?.message}></Error>
                </div>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>
                    Email address
                  </label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    placeholder='Enter Email address'
                    required=''
                    {...register("email")}
                  />
                  <Error message={errors.email?.message}></Error>
                </div>

                <div className='mb-5'>
                  <label htmlFor='password' className='form-label'>
                    Password
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    placeholder='Enter Password'
                    required=''
                    {...register("password")}
                  />
                  <Error message={errors.password?.message}></Error>

                  <small className='form-text'>
                    By Signup, you agree to our{" "}
                    <a href='#!'>Terms of Service</a> &{" "}
                    <a href='#!'>Privacy Policy</a>
                  </small>
                </div>

                <button type='submit' className='btn btn-primary'>
                  Sign Up
                </button>
              </form>
            </div>
            <div className='modal-footer border-0 justify-content-center'>
              Not a member?{" "}
              <Link to='/register'>
                <a style={{ color: "#0aad0a" }}>Sign Up</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
