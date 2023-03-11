const Error = ({message}) =>{
    // && if then
    // ?: if else
    return (
        <span className="fw-bold">{message && message}</span>
    )

}
export default Error;