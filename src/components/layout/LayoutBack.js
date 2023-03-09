import Navbar from "../back/Navbar";
import VerticalNav from "../back/VerticalNav";
const LayoutBack = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='main-wrapper'>
        <VerticalNav />
        {children}
      </div>
    </>
  );
};

export default LayoutBack;
