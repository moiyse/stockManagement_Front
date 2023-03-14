function MailVerification(props){
  
    return(
       <div 
        className="modal fade" 
        
        id="userModal" 
        tabIndex={-1} 
        aria-labelledby="userModalLabel" 
        aria-hidden="true"
        style={{display: "none"}} 
       
        aria-modal="true" 
        role="dialog"
        >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4">
            <div className="modal-header border-0">
              <h5 className="modal-title fs-3 fw-bold" id="userModalLabel">verify your email!</h5>
              
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className=" text-center" >
                <div className="card-body">
                <p className="card-text">
                Please enter the 4-digit verification code that was sent to your email.{" "}
                <br/> the code is valid for 5 minutes
                </p>
                </div>
             </div>
            
            
            <div className="modal-body">
                
              <form>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Verification Code</label>
                  <input type="text" className="form-control" id="fullName" maxLength={4} 
                  value={props.codeOpt} onChange={props.handleChangeCodeOpt} placeholder="Enter Your Code" required />
                </div>
                <div className="col-12 d-grid gap-2"> 
                    <button type="button" className="btn btn-primary" 
                    onClick={props.verifCode} >Continue</button>
                </div>
              </form>
            </div>
            <div className="modal-footer border-0 justify-content-center">
              Already have an account? <a href="#">Sign in</a>
            </div>
          </div>
        </div>
      </div>


    );
}
export default MailVerification ;