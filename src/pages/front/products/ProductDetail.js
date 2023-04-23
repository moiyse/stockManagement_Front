import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { notify } from "../../../utils/HelperFunction";
import { Rating } from "react-simple-star-rating";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetail = (props) => {
  const navigate = useNavigate();

  const { productId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [name, setName] = useState("");

  const [product, setProduct] = useState({});

  const [ratingValue, setRatingValue] = useState(0);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [review, setReview] = useState({});
  const [reviews, setReviews] = useState([]);

  const [reviewMessage, setReviewMessage] = useState("");
  const [headline, setHeadline] = useState("");
  const [error, setError] = useState(null);
  const [seeMore, setSeeMore] = useState(2);

  const handleRating = (rate) => {
    setRatingValue(rate);
  };

  useEffect(() => {
    console.log(id);
    axios
      .get(`http://localhost:5000/products/prod/${id}`)
      .then(function (response) {
        setProduct(response.data);
        //setName(response.data.name);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addReview = async () => {
    setReview({
      username: currentUser.username,
      image: currentUser.image,
      rating: ratingValue,
      review: reviewMessage,
      headline: headline,
    });
    try {
      const response = await axios.post(`/products/prod/addReview/${id}`, {
        username: currentUser.username,
        image: currentUser.image,
        rating: ratingValue,
        review: reviewMessage,
        headline: headline,
      });
      document.getElementById("myForm").reset(); // reset the form
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(`/products/prod/reviews/${id}`);
      setReviews(response.data);
    };
    fetchReviews();
  }, [() => review]);

  const handleSeeMore = () => {
    setSeeMore((prevState) => prevState + 2);
  };
  return <></>;
};
export default ProductDetail;
