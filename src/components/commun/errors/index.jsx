const Error = ({message}) =>{
    // && if then
    // ?: if else
    return ( (message &&
        <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
    )
    )

}
export default Error;