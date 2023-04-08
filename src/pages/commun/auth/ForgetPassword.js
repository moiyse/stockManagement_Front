import MailVerification from "../../../components/modal/MailVerification";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../../utils/HelperFunction";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';


const ForgetPassword = (props) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [mailOpened, setMailOpened] = useState(false);
  const [codeOpt, setCodeOpt] = useState('');
  const [mailCode, setMailCode] = useState('');

  //verification sur la saisie de 'email
  const CheckEmail = (e) => {
    setEmail(e.target.value);
    const regex = /^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$/;
    if(regex.test(email)===false){ 
      setError('please enter valid email address');
    }else{
      setError(' ');
    }
  };
  console.log(email);
  
  //const { mailCode } = useParams();

  
  
  //l'envoi de code 
  const openModal = () => {
    if (email!=='') {
      const forgotPassword = {
        email: email
      };
    
      axios
      .post(`/api/auth/forgetPassword`, forgotPassword, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
          console.log(res); 
          setError('');  
          setMailCode(true);
          setMailOpened(true);
          notify("Verification Mail was send successfully! check your mailbox", toast, "success");        
        
      })
      .catch((err) => {
        console.log(err)
        notify("This email address does not correspond to any account. Please check and try again.!", toast, "error");
      });

    }else{
      setError('Pease enter email adress');
     setMailOpened(false);
    }
  };

  const navigate = useNavigate();
  //verification du code 
  const verifCode = (e) => {

    if (codeOpt!=='') {
      
      console.log('code not empty');      
      const verificationCode = {
        email: email,
        code: codeOpt
        
      };
      axios
      .post(`/api/auth/verifCode`, verificationCode, {
        headers: { "Content-Type": "application/json" },
        
      })
      .then((res) => {
          setMailOpened(false)
          notify("Mail is verificated!", toast, "success"); 
          navigate(`/ChangePassword?email=${email}`);
      })
      .catch((err) => {
        if({ message: "Time Expired." }){
          notify("Time Expired, Please resent new code!", toast, "error");
        }
        else{
          console.log(err);
          notify("This email code is Wrong. Please check and try again!", toast, "error");
        }
          
      });

    }else{
      console.log('Pease enter code');
    }


  }

  const handleChangeCodeOpt=(e)=>{
    setCodeOpt(e.target.value);
  }


    return(
 <>
            <ToastContainer />
          {/*************/}

          <div>
            <div className="form-shape" />
                <div className="form-wrapper">
                <div className="container">
                    <div className="card">
                    <div className="row no-gutters">
                        <div className="col">
                        <div className="row h-100 align-items-center">
                           <div className="col-md-10 offset-md-1">                            
                            <div className="my-5 text-center text-lg-left">
                            <img
                                        src="../assets/images/logo/logo.png"
                                        style={{ width: "100px", paddingBottom: "30px" }}
                                        alt=""
                                        className="d-inline-block align-text-top"
                                    />   
                                <h3 className="font-weight-bold">Reset Password</h3>
                                <p className="text-muted">Type and send the email address to reset your password.</p>
                            </div>
                            <form>
                                <div className="form-group">
                                <div className="form-icon-wrapper">
                                {!mailCode && (
                                    <input type="email"
                                    className="form-control" 
                                    onChange={CheckEmail} 
                                    placeholder="Enter email" 
                                    autofocus 
                                    value={email} />    
                               )}
                               {!mailCode && (<i className="form-icon-left mdi bi-envelope" />)}
                               {mailCode && (
                                <input type="text" className="form-control" 
                                id="mailCode" maxLength={4} 
                                value={codeOpt}
                                onChange={handleChangeCodeOpt} 
                                placeholder="Enter Your Code" 
                                required /> 
                              )}
                                </div>
                                {!mailCode && (
                                <p className="text-danger p-2 m-2">{error}</p>)}
                                </div>
                                <div className="text-center col-12 d-grid gap-2">
                                
                                {!mailCode && (
                                    <button type="button" 
                                    className="btn btn-primary mb-4"  
                                    data-bs-toggle="modal"
                                    data-bs-target="#userModal"
                                    onClick={openModal}> Send Code</button>
                                )}
                                {mailCode && (
                                    <button type="button" 
                                    className="btn btn-primary mb-4"
                                    onClick={verifCode} >Continue</button>
                                )}
                                {mailCode && (<a onClick={openModal}  className="btn btn-light">Resent</a>)
                                }
                          
                                </div>
                            </form>
                            <p className="text-center d-block d-lg-none mt-4 mt-lg-0">
                                You can now <Link to="/"><a>sign in</a></Link> or <Link to="/register"><a>create an account</a></Link>.
                            </p>
                            </div>
                        </div>
                        </div>
                        <div className="col d-none d-lg-flex" style={{background: 'url(../assets/images/auth/food6.jpg)'}}>
                        <div className="logo">
                            <img src="../assets/images/logo/logo.ico" alt="logo" />
                        </div>
                        <div>
                            <h3 className="font-weight-bold">Do a different action</h3>
                            <p className="lead my-5">Are you going to do a different action?</p>
                            <div className="text-center">
                            You can now 
                            <Link to="/"> <a className="btn btn-white btn-sm" >sign in</a></Link> or
                             <Link to="/register"><a className="btn btn-white btn-sm">create an account</a></Link>.
                            </div>
                        </div>
                        <ul className="list-inline">
                            
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                  {/*console.log(mailOpened)}
                    {(mailOpened && mailOpened===true) && <MailVerification/>*/}
                    { /*  <MailVerification  verifCode={verifCode} handleChangeCodeOpt={handleChangeCodeOpt} mailOpened={mailOpened}/>*/}
           
           {console.log(mailOpened)}
         
          </div>
          
      </>
    );
 
}
export default ForgetPassword;