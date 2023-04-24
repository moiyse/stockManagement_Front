import "./slider.css";
import "./chat.css";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../../utils/HelperFunction";
import { toast, ToastContainer } from "react-toastify";
import { modifyUser, refreshUser } from "../../../actions/auth";
import chatbotData from './chat.json';

function LeftNavButton(props) {
  const { className, onClick } = props;

  return (
    <span onClick={onClick} className='slick-prev slick-arrow'>
      <i className='feather-icon icon-chevron-left'></i>
    </span>
  );
}

function RightNavButton(props) {
  const { className, onClick } = props;
  return (
    <span onClick={onClick} className='slick-next slick-arrow'>
      <i className='feather-icon icon-chevron-right'></i>
    </span>
  );
}

function Home() {
  const [error, setError] = useState(null);

  const { user: currentUser } = useSelector((state) => state.auth);
  var orderLineIds = [];
  const dispatch = useDispatch();

  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQueryByProductname, setSearchQueryByProductname] = useState("");
  const [allProductsForCart, setAllProductsForCart] = useState([]);
  const [call, setCall] = useState(false);
  const [couponEnable, setCouponEnable] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");



  var total = 0;
  useEffect(() => {
    dispatch(refreshUser(currentUser?.id));
    const searchObject = { name: searchQueryByProductname };
    if (searchQueryByProductname?.length > 0) {
      console.log(searchObject);
      axios
        .post(
          "http://localhost:5000/products/prod/searchProductByName",
          searchObject
        )
        .then((res) => {
          setAllProducts(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get("http://localhost:5000/products/prod")
        .then((res) => {
          setAllProducts(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(total);
  }, [searchQueryByProductname]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/getAllProductsFromCart/${currentUser?.email}`
      )
      .then((res) => {
        setAllProductsForCart(res.data);
        const tempCart = [];
        res.data.map((e) => {
          tempCart.push({
            product: e._id,
            quantity: e.quantity,
            price: e.price,
          });
          total = total + e.price;
        });
        setCart(tempCart);

        setTotalAmount(total);
        //setCart(tempCart);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [call]);

  const confirmOrder = async () => {
    let errorMessage ;
    await Promise.all(
      cart.map(async (c) => {
        try {
          const response = await axios.post(
            "http://localhost:5000/orders/orderLine",
            c
          );
          orderLineIds.push(response.data._id);

          return response;
        } catch (error) {
         // notify(error.response.data.message, toast, "error");
         errorMessage = error.response.data.message;
          setError(error.response.data.message);

          console.log(error);
        }
      })
    );
if(errorMessage !== "Insuffiant Quantity") {
    var orderInfo = {
      orderLines: orderLineIds,
      customer: currentUser.id,
      totalAmount: totalAmount,
      paymentMethod: "Credit Card",
      status: "New",
      couponCode: couponCode,
    };
    axios
      .post("http://localhost:5000/orders/order", orderInfo)
      .then(function (response) {
        notify("Order was created succesfully!", toast, "success");
        setAllProductsForCart([]);
        axios
          .put("http://localhost:5000/api/removeAllProdcutsFromCart/", {
            email: currentUser.email,
          })
          .then((res) => {
            dispatch(refreshUser(currentUser?.id));
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

  const addProdcutToCart = (prod) => {
    const req = {
      email: currentUser?.email,
      products: { ...prod, quantity: 1 },
    };
    axios
      .put("http://localhost:5000/api/addProdcutToCart/", req)
      .then((res) => {
        notify("Product was added to the cart!", toast, "success");
        setCall(!call);

        dispatch(refreshUser(currentUser?.id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(currentUser);
  const removeProdcutFromCart = (removeProdcutFromCart) => {
    console.log(removeProdcutFromCart);
    const req = {
      email: currentUser?.email,
      id: removeProdcutFromCart._id,
    };
    console.log(req);
    axios
      .put("http://localhost:5000/api/removeProdcutFromCart/", req)
      .then((res) => {
        setCall(!call);
        console.log(removeProdcutFromCart.price);
        total = total - removeProdcutFromCart.price;
        //setTotalAmount(totalAmount - removeProdcutFromCart.price);
        setTotalAmount(total);
        dispatch(refreshUser(currentUser?.id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeQuantityProductToCart = (removeQuantityProductToCart) => {
    const req = {
      email: currentUser?.email,
      id: removeQuantityProductToCart,
    };
    console.log(req);
    axios
      .put("http://localhost:5000/api/removeQuantityProductToCart/", req)
      .then((res) => {
        setCall(!call);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addQuantityProductToCart = (addQuantityProductToCart) => {
    const req = {
      email: currentUser?.email,
      id: addQuantityProductToCart,
    };
    console.log(req);
    axios
      .put("http://localhost:5000/api/addQuantityProductToCart/", req)
      .then((res) => {
        setCall(!call);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleCollapsible = () => {
    setIsActive(!isActive);
    setMaxHeight(maxHeight === "0px" ? "500px" : "0px");
  };

  const getBotResponse = (userText) => {

    let botResponse = "I'm sorry, I didn't understand that.";

    chatbotData.greetings.forEach((greeting) => {
      console.log("farewell.message.toLowerCase() : ",greeting.message.toLowerCase())
      if (userText.toLowerCase().includes(greeting.message.toLowerCase())) {
        console.log("in condition !")
        botResponse = greeting.response;
        
      }
    });
  
    chatbotData.farewells.forEach((farewell) => {
      
      if (userText.toLowerCase().includes(farewell.message.toLowerCase())) {
        
        botResponse = farewell.response;
        
      }
    });

    for (let i = 0; i < chatbotData.responses.length; i++) {
      let response = chatbotData.responses[i];
  
      // Loop through the questions associated with the current response
      for (let j = 0; j < response.questions.length; j++) {
        let question = response.questions[j];
  
        // If the user's input matches the current question, return the response
        if (userText.toLowerCase().includes(question.toLowerCase())) {
          botResponse = response.message;
        }
      }
    }
  
    // If no response was found, return a default message
    return botResponse;

  }

  /*const getBotResponse = (userText) => {
    switch (userText.toLowerCase()) {
      case 'hello':
        return 'Hi there!';
      case 'how are you':
        return 'I\'m doing great, thanks for asking.';
      case 'what\'s your name':
        return 'My name is ChatBot.';
      default:
        return 'I\'m sorry, I didn\'t understand your question.';
    }
  }*/

  const getTime = () => {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    if (hours < 10) {
      hours = "0" + hours;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
  };

  const firstBotMessage = () => {
    let firstMessage = "How's it going?";
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    document.getElementById("chat-timestamp").innerHTML = time;
    document.getElementById("userInput").scrollIntoView(false);
  };

  useEffect(() => {
    firstBotMessage();
  }, []);

  const getHardResponse = (userText) => {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + "</span></p>";
    document.getElementById("chatbox").innerHTML += botHtml;

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
  };

  const getResponse = () => {
    let userText = document.getElementById("textInput").value;

    if (userText === "") {
      userText = "I love Code Palace!";
    }

    let userHtml = '<p class="userText"><span>' + userText + "</span></p>";

    document.getElementById("textInput").value = "";
    document.getElementById("chatbox").innerHTML += userHtml;
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
      getHardResponse(userText.trim().replace('?', ''));
    }, 1000);
  };

  const buttonSendText = (sampleText) => {
    let userHtml = '<p class="userText"><span>' + sampleText + "</span></p>";

    document.getElementById("textInput").value = "";
    document.getElementById("chatbox").innerHTML += userHtml;
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    //Uncomment this if you want the bot to respond to this buttonSendText event
    // setTimeout(() => {
    //     getHardResponse(sampleText);
    // }, 1000)
  };
  
  


  const introductions = [
    {
      imageUrl: "assets/images/slider/slide-1.jpg",
      "first-comment": "Opening Sale Discount 50%",
      "second-comment": "SuperMarket For Fresh Grocery",
      "third-comment": "",
      "fourth-comment":
        "Introduced a new model for online grocery shopping and convenient home delivery.",
      "fifth-comment": "Shop Now",
    },
    {
      imageUrl: "assets/images/slider/slider-2.jpg",
      "first-comment": "Free Shipping - orders over $100",
      "second-comment": "Free Shipping on orders over ",
      "third-comment": " $100",
      "fourth-comment":
        "Free Shipping to First-Time Customers Only, After promotions and discounts are applied.",
      "fifth-comment": "Shop Now",
    },
  ];

  const categories = [
    {
      name: "tea, coffee &amp drinks",
      src: "assets/images/category/category-tea-coffee-drinks.jpg",
    },
    {
      name: "baby care",
      src: "assets/images/category/category-tea-coffee-drinks.jpg",
    },
    {
      name: "pet care",
      src: "assets/images/category/category-tea-coffee-drinks.jpg",
    },
    {
      name: "chicken &amp meet",
      src: "assets/images/category/category-tea-coffee-drinks.jpg",
    },
    {
      name: "cleaninng essentials",
      src: "assets/images/category/category-tea-coffee-drinks.jpg",
    },
    {
      name: "moez mahmoud",
      src: "assets/images/category/category-tea-coffee-drinks.jpg",
    },
    {
      name: "mekla",
      src: "assets/images/category/category-tea-coffee-drinks.jpg",
    },
    {
      name: "ma9rouna",
      src: "assets/images/category/category-tea-coffee-drinks.jpg",
    },
    {
      name: "chicken &amp meet",
      src: "assets/images/category/category-tea-coffee-drinks.jpg",
    },
    {
      name: "cleaninng essentials",
      src: "assets/images/category/category-tea-coffee-drinks.jpg",
    },
    {
      name: "moez mahmoud",
      src: "assets/images/category/category-tea-coffee-drinks.jpg",
    },
    {
      name: "mekla",
      src: "assets/images/category/category-tea-coffee-drinks.jpg",
    },
    {
      name: "ma9rouna",
      src: "assets/images/category/category-tea-coffee-drinks.jpg",
    },
  ];

  //Slider settings for the intro
  const settings_intro = {
    draggable: true,
    rows: 1,
    nextArrow: null,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: 0,
    dots: true,
    className: "slider-intro",
    centerMode: true,
  };

  //Slider settings for the featured categories
  const settings_feature = {
    draggable: true,
    nextArrow: <RightNavButton />,
    prevArrow: <LeftNavButton />,
    rows: 1,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerPadding: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
  };

  const zoom = (f) => {
    const t = f.currentTarget;
    let offsetX = f.offsetX || f.touches[0].pageX;
    let offsetY = f.offsetY ? f.offsetY : f.touches[0].pageY;
    const x = (offsetX / t.offsetWidth) * 100;
    const y = (offsetY / t.offsetHeight) * 100;
    t.style.backgroundPosition = `${x}% ${y}%`;
  };

  return (
    <div>
      <ToastContainer />

      <div
        className='offcanvas offcanvas-end'
        tabIndex='-1'
        id='offcanvasRight'
        aria-labelledby='offcanvasRightLabel'
      >
        <div className='offcanvas-header border-bottom'>
          <div className='text-start'>
            <h5 id='offcanvasRightLabel' className='mb-0 fs-4'>
              Shop Cart
            </h5>
          </div>
          <button
            type='button'
            className='btn-close text-reset'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
          ></button>
        </div>
        <div className='offcanvas-body'>
          <div className=''>
            <ul className='list-group list-group-flush'>
              {allProductsForCart.map((productForCart) => {
                return (
                  <li className='list-group-item py-3 ps-0 border-top'>
                    <div className='row align-items-center'>
                      <div className='col-2 col-md-2'>
                        <img
                          src={productForCart?.image}
                          alt='image product'
                          className='img-fluid'
                        />
                      </div>
                      <div className='col-2 col-md-2 col-lg-5'>
                        <a
                          href='pages/shop-single.html'
                          className='text-inherit'
                        >
                          <h4 className='mb-0'>{productForCart?.name}</h4>
                        </a>
                      </div>
                      <div className='col-1 col-md-1'>
                        <div className='mt-2 small lh-1'>
                          {" "}
                          <span
                            className='text-decoration-none text-inherit'
                            onClick={() =>
                              removeProdcutFromCart(productForCart)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {" "}
                            <span className='me-1 align-text-bottom'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='20'
                                height='20'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='feather feather-trash-2 text-success'
                              >
                                <polyline points='3 6 5 6 21 6'></polyline>
                                <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                                <line x1='10' y1='11' x2='10' y2='17'></line>
                                <line x1='14' y1='11' x2='14' y2='17'></line>
                              </svg>
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className='col-3 col-md-3 col-lg-3'>
                        {/* input */}
                        {/* input */}
                        <div className='input-group input-spinner  '>
                          {productForCart.quantity > 0 && (
                            <input
                              type='button'
                              value='-'
                              className='button-minus  btn  btn-sm '
                              data-field='quantity'
                              onClick={() =>
                                removeQuantityProductToCart(productForCart._id)
                              }
                            />
                          )}

                          <input
                            type='number'
                            step='1'
                            max='10'
                            value={productForCart?.quantity}
                            name='quantity'
                            className='quantity-field form-control-sm form-input   '
                          />
                          <input
                            type='button'
                            value='+'
                            className='button-plus btn btn-sm '
                            data-field='quantity'
                            onClick={() =>
                              addQuantityProductToCart(productForCart._id)
                            }
                          />
                        </div>
                      </div>
                      <div className='col-1 text-lg-end text-start text-md-end col-md-1'>
                        <span className='fw-bold'>
                          {productForCart?.price < 1
                            ? productForCart?.price
                            : productForCart?.price * productForCart?.quantity}
                          $
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              id='flexCheckDefault'
              onChange={(e) => setCouponEnable(e.target.checked)}
            />
            <label> Add coupon code</label>
            {couponEnable && (
              <input
                onChange={(e) => setCouponCode(e.target.value)}
                type='text'
                name='Coupon code'
                className='form-control'
                id='twoFactor'
                placeholder='Coupon code'
              />
            )}
                          {error && (
                            <div className="alert alert-danger" role="alert">
                              {error}
                            </div>
                          )}
            <div className='d-flex justify-content-between mt-4'>
              <a href='#!' className='btn btn-primary'>
                Continue Shopping
              </a>

              <button className='btn btn-primary' onClick={confirmOrder}>
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className='modal fade'
        id='locationModal'
        tabIndex='-1'
        aria-labelledby='locationModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-sm modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-body p-6'>
              <div className='d-flex justify-content-between align-items-start '>
                <div>
                  <h5 className='mb-1' id='locationModalLabel'>
                    Choose your Delivery Location
                  </h5>
                  <p className='mb-0 small'>
                    Enter your address and we will specify the offer you area.{" "}
                  </p>
                </div>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='my-5'>
                <input
                  type='search'
                  className='form-control'
                  placeholder='Search your area'
                />
              </div>
              <div className='d-flex justify-content-between align-items-center mb-2'>
                <h6 className='mb-0'>Select Location</h6>
                <a
                  href='#'
                  className='btn btn-outline-gray-400 text-muted btn-sm'
                >
                  Clear All
                </a>
              </div>
              <div>
                <div data-simplebar style={{ height: "300px" }}>
                  <div className='list-group list-group-flush'>
                    <a
                      href='#'
                      className='list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action active'
                    >
                      <span>Alabama</span>
                      <span>Min:$20</span>
                    </a>
                    <a
                      href='#'
                      className='list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action'
                    >
                      <span>Alaska</span>
                      <span>Min:$30</span>
                    </a>
                    <a
                      href='#'
                      className='list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action'
                    >
                      <span>Arizona</span>
                      <span>Min:$50</span>
                    </a>
                    <a
                      href='#'
                      className='list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action'
                    >
                      <span>California</span>
                      <span>Min:$29</span>
                    </a>
                    <a
                      href='#'
                      className='list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action'
                    >
                      <span>Colorado</span>
                      <span>Min:$80</span>
                    </a>
                    <a
                      href='#'
                      className='list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action'
                    >
                      <span>Florida</span>
                      <span>Min:$90</span>
                    </a>
                    <a
                      href='#'
                      className='list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action'
                    >
                      <span>Arizona</span>
                      <span>Min:$50</span>
                    </a>
                    <a
                      href='#'
                      className='list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action'
                    >
                      <span>California</span>
                      <span>Min:$29</span>
                    </a>
                    <a
                      href='#'
                      className='list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action'
                    >
                      <span>Colorado</span>
                      <span>Min:$80</span>
                    </a>
                    <a
                      href='#'
                      className='list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action'
                    >
                      <span>Florida</span>
                      <span>Min:$90</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main>
      <div className="chat-bar-collapsible" style={{ zIndex: 9999 }}>
        <button id="chat-button" type="button" className="collapsible" onClick={toggleCollapsible}>
          Chat with us!
          <i id="chat-icon" style={{ color: "#fff" }} className="fa fa-fw fa-comments-o"></i>
        </button>

        <div className="content" style={{ maxHeight: maxHeight }}>
          <div className="full-chat-block">
            <div className="outer-container">
              <div className="chat-container">
                <div id="chatbox">
                  <h5 id="chat-timestamp"></h5>
                  <p id="botStarterMessage" className="botText">
                    <span>Loading...</span>
                  </p>
                </div>
                <div className="chat-bar-input-block">
                  <div id="userInput">
                    <input id="textInput" className="input-box" type="text" name="msg" placeholder="Tap 'Enter' to send a message" />
                    <p></p>
                  </div>
                  <div className="chat-bar-icons">
                    <i
                      id="chat-icon"
                      style={{ color: "crimson" }}
                      className="fa fa-heart"
                      onClick={() => buttonSendText("Heart clicked!")}
                    ></i>
                    <i
                      id="chat-icon"
                      style={{ color: "#333" }}
                      className="bi bi-send"
                      onClick={() => getResponse()}
                    ></i>
                  </div>
                </div>
                <div id="chat-bar-bottom">
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <section className='mt-8'>
          <div className='container'>
            <Slider className='silder-intro' {...settings_intro}>
              {introductions.map((intro, index) => (
                <div className='intro'>
                  <div
                    className='intro-container'
                    style={{
                      backgroundImage: `url(${intro.imageUrl})`,
                    }}
                  >
                    <div className='ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-xs-center'>
                      <span className='badge text-bg-warning'>
                        {intro["first-comment"]}
                      </span>
                      <h2 className='text-dark display-5 fw-bold mt-4'>
                        {intro["second-comment"]}
                        <span className='text-primary'>
                          {intro["third-comment"]}
                        </span>
                      </h2>
                      <p className='lead'>{intro["fourth-comment"]}</p>
                      <a href='#!' className='btn btn-dark mt-3'>
                        Shop Now{" "}
                        <i className='feather-icon icon-arrow-right ms-1'></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        <section className='mb-lg-10 mt-lg-14 my-8'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 mb-6'>
                <h3 className='mb-0'>Products almost expired</h3>
              </div>
            </div>
            <div className='category-slider'>
              <Slider className='silder-feature' {...settings_feature}>
                {categories.map((category, index) => (
                  <a
                    href='pages/shop-grid.html'
                    className='text-decoration-none text-inherit'
                    tabIndex='-1'
                  >
                    <div className='card card-product '>
                      <div className='card-body text-center  py-8'>
                        <img
                          src={category.src}
                          alt='Grocery Ecommerce Template'
                          className='mb-3'
                        />
                        <div className='text-truncate'>{category.name}</div>
                      </div>
                    </div>
                  </a>
                ))}
              </Slider>
            </div>
          </div>
        </section>

        <section>
          <div className='container'>
            <div className='row'>
              <div className='col-12 col-md-6 mb-3 mb-lg-0'>
                <div>
                  <div
                    className='py-10 px-8 rounded'
                    style={{
                      background:
                        "url(assets/images/banner/grocery-banner.png)no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div>
                      <h3 className='fw-bold mb-1'>Fruits & Vegetables</h3>
                      <p className='mb-4'>
                        Get Upto <span className='fw-bold'>30%</span> Off
                      </p>
                      <a href='#!' className='btn btn-dark'>
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-12 col-md-6 '>
                <div>
                  <div
                    className='py-10 px-8 rounded'
                    style={{
                      background:
                        "url(assets/images/banner/grocery-banner-2.jpg)no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div>
                      <h3 className='fw-bold mb-1'>Freshly Baked Buns</h3>
                      <p className='mb-4'>
                        Get Upto <span className='fw-bold'>25%</span> Off
                      </p>
                      <a href='#!' className='btn btn-dark'>
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/****** Product List   ********/}
        <section className='my-lg-14 my-8'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 mb-6'>
                <h3 className='mb-0'>Popular Products</h3>
              </div>
            </div>
            <div className='row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3'>
              {allProducts?.map((product, index) => {
                return (
                  <div className='col' key={index}>
                    <div className='card card-product'>
                      <div className='card-body'>
                        <div className='text-center position-relative '>
                          {/* stock */}
                          <div className=' position-absolute top-0 start-0'>
                            <span
                              className={`badge 
                          ${product?.inStock ? "bg-success" : "bg-danger"}`}
                            >
                              {product?.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                          </div>
                          {/* image */}
                          <a href='#!'>
                            {" "}
                            <img
                              src='assets/images/products/product-img-1.jpg'
                              alt='Grocery Ecommerce Template'
                              className='mb-3 img-fluid'
                            />
                          </a>
                          {/* action */}
                          <div className='card-product-action'>
                            <a
                              href='#!'
                              className='btn-action'
                              data-bs-toggle='modal'
                              data-bs-target='#quickViewModal'
                            >
                              <i
                                className='bi bi-eye'
                                data-bs-toggle='tooltip'
                                data-bs-html='true'
                                title='Quick View'
                              ></i>
                            </a>
                            <a
                              href='#!'
                              className='btn-action'
                              data-bs-toggle='tooltip'
                              data-bs-html='true'
                              title='Wishlist'
                            >
                              <i className='bi bi-heart'></i>
                            </a>
                            <a
                              href='#!'
                              className='btn-action'
                              data-bs-toggle='tooltip'
                              data-bs-html='true'
                              title='Compare'
                            >
                              <i className='bi bi-arrow-left-right'></i>
                            </a>
                          </div>
                        </div>
                        {/* category */}
                        <div className='text-small mb-1'>
                          <a
                            href='#!'
                            className='text-decoration-none text-muted'
                          >
                            <small> {product?.category?.label}</small>
                          </a>
                        </div>
                        {/* name */}
                        <h2 className='fs-6'>
                          <Link to={`/productDetail?id=${product._id}`}>
                            <a
                              href='pages/shop-single.html'
                              className='text-inherit text-decoration-none'
                            >
                              {product.name}
                            </a>
                          </Link>
                        </h2>
                        {/* rating */}
                        <div>
                          <small className='text-warning'>
                            {" "}
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-half'></i>
                          </small>{" "}
                          <span className='text-muted small'>4.5(149)</span>
                        </div>

                        <div className='d-flex justify-content-between align-items-center mt-3'>
                          {/* Price */}
                          <div>
                            <span className='text-dark'>
                              {product.reduction} DT
                            </span>{" "}
                            <span className='text-decoration-line-through text-muted'>
                              {product.price} DT
                            </span>
                          </div>
                          {/* Add to shop */}
                          <div>
                            <span
                              className='btn btn-primary btn-sm'
                              onClick={() => addProdcutToCart(product)}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='feather feather-plus'
                              >
                                <line x1='12' y1='5' x2='12' y2='19'></line>
                                <line x1='5' y1='12' x2='19' y2='12'></line>
                              </svg>{" "}
                              Add
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 mb-6'>
                <h3 className='mb-0'>Daily Best Sells</h3>
              </div>
            </div>
            <div className='table-responsive-xl pb-6'>
              <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-4 flex-nowrap'>
                <div className='col'>
                  <div
                    className=' pt-8 px-6 px-xl-8 rounded'
                    style={{
                      background:
                        "url(assets/images/banner/banner-deal.jpg)no-repeat",
                      backgroundSize: "cover",
                      height: "470px",
                    }}
                  >
                    <div>
                      <h3 className='fw-bold text-white'>
                        100% Organic Coffee Beans.
                      </h3>
                      <p className='text-white'>
                        Get the best deal before close.
                      </p>
                      <a href='#!' className='btn btn-primary'>
                        Shop Now{" "}
                        <i className='feather-icon icon-arrow-right ms-1'></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <div className='card card-product'>
                    <div className='card-body'>
                      <div className='text-center  position-relative '>
                        {" "}
                        <a href='pages/shop-single.html'>
                          <img
                            src='assets/images/products/product-img-11.jpg'
                            alt='Grocery Ecommerce Template'
                            className='mb-3 img-fluid'
                          />
                        </a>
                        <div className='card-product-action'>
                          <a
                            href='#!'
                            className='btn-action'
                            data-bs-toggle='modal'
                            data-bs-target='#quickViewModal'
                          >
                            <i
                              className='bi bi-eye'
                              data-bs-toggle='tooltip'
                              data-bs-html='true'
                              title='Quick View'
                            ></i>
                          </a>
                          <a
                            href='#!'
                            className='btn-action'
                            data-bs-toggle='tooltip'
                            data-bs-html='true'
                            title='Wishlist'
                          >
                            <i className='bi bi-heart'></i>
                          </a>
                          <a
                            href='#!'
                            className='btn-action'
                            data-bs-toggle='tooltip'
                            data-bs-html='true'
                            title='Compare'
                          >
                            <i className='bi bi-arrow-left-right'></i>
                          </a>
                        </div>
                      </div>
                      <div className='text-small mb-1'>
                        <a
                          href='#!'
                          className='text-decoration-none text-muted'
                        >
                          <small>Tea, Coffee & Drinks</small>
                        </a>
                      </div>
                      <h2 className='fs-6'>
                        <a
                          href='pages/shop-single.html'
                          className='text-inherit text-decoration-none'
                        >
                          Roast Ground Coffee
                        </a>
                      </h2>

                      <div className='d-flex justify-content-between align-items-center mt-3'>
                        <div>
                          <span className='text-dark'>$13</span>{" "}
                          <span className='text-decoration-line-through text-muted'>
                            $18
                          </span>
                        </div>
                        <div>
                          <small className='text-warning'>
                            {" "}
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-half'></i>
                          </small>
                          <span>
                            <small>4.5</small>
                          </span>
                        </div>
                      </div>
                      <div className='d-grid mt-2'>
                        <a href='#!' className='btn btn-primary '>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='feather feather-plus'
                          >
                            <line x1='12' y1='5' x2='12' y2='19'></line>
                            <line x1='5' y1='12' x2='19' y2='12'></line>
                          </svg>{" "}
                          Add to cart{" "}
                        </a>
                      </div>
                      <div className='d-flex justify-content-start text-center mt-3'>
                        <div
                          className='deals-countdown w-100'
                          data-countdown='2028/10/10 00:00:00'
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <div className='card card-product'>
                    <div className='card-body'>
                      <div className='text-center  position-relative '>
                        {" "}
                        <a href='pages/shop-single.html'>
                          <img
                            src='assets/images/products/product-img-12.jpg'
                            alt='Grocery Ecommerce Template'
                            className='mb-3 img-fluid'
                          />
                        </a>
                        <div className='card-product-action'>
                          <a
                            href='#!'
                            className='btn-action'
                            data-bs-toggle='modal'
                            data-bs-target='#quickViewModal'
                          >
                            <i
                              className='bi bi-eye'
                              data-bs-toggle='tooltip'
                              data-bs-html='true'
                              title='Quick View'
                            ></i>
                          </a>
                          <a
                            href='#!'
                            className='btn-action'
                            data-bs-toggle='tooltip'
                            data-bs-html='true'
                            title='Wishlist'
                          >
                            <i className='bi bi-heart'></i>
                          </a>
                          <a
                            href='#!'
                            className='btn-action'
                            data-bs-toggle='tooltip'
                            data-bs-html='true'
                            title='Compare'
                          >
                            <i className='bi bi-arrow-left-right'></i>
                          </a>
                        </div>
                      </div>
                      <div className='text-small mb-1'>
                        <a
                          href='#!'
                          className='text-decoration-none text-muted'
                        >
                          <small>Fruits & Vegetables</small>
                        </a>
                      </div>
                      <h2 className='fs-6'>
                        <a
                          href='pages/shop-single.html'
                          className='text-inherit text-decoration-none'
                        >
                          Crushed Tomatoes
                        </a>
                      </h2>
                      <div className='d-flex justify-content-between align-items-center mt-3'>
                        <div>
                          <span className='text-dark'>$13</span>{" "}
                          <span className='text-decoration-line-through text-muted'>
                            $18
                          </span>
                        </div>
                        <div>
                          <small className='text-warning'>
                            {" "}
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-half'></i>
                          </small>
                          <span>
                            <small>4.5</small>
                          </span>
                        </div>
                      </div>
                      <div className='d-grid mt-2'>
                        <a href='#!' className='btn btn-primary '>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='feather feather-plus'
                          >
                            <line x1='12' y1='5' x2='12' y2='19'></line>
                            <line x1='5' y1='12' x2='19' y2='12'></line>
                          </svg>{" "}
                          Add to cart{" "}
                        </a>
                      </div>
                      <div className='d-flex justify-content-start text-center mt-3 w-100'>
                        <div
                          className='deals-countdown w-100'
                          data-countdown='2028/12/9 00:00:00'
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <div className='card card-product'>
                    <div className='card-body'>
                      <div className='text-center  position-relative '>
                        {" "}
                        <a href='pages/shop-single.html'>
                          <img
                            src='assets/images/products/product-img-13.jpg'
                            alt='Grocery Ecommerce Template'
                            className='mb-3 img-fluid'
                          />
                        </a>
                        <div className='card-product-action'>
                          <a
                            href='#!'
                            className='btn-action'
                            data-bs-toggle='modal'
                            data-bs-target='#quickViewModal'
                          >
                            <i
                              className='bi bi-eye'
                              data-bs-toggle='tooltip'
                              data-bs-html='true'
                              title='Quick View'
                            ></i>
                          </a>
                          <a
                            href='#!'
                            className='btn-action'
                            data-bs-toggle='tooltip'
                            data-bs-html='true'
                            title='Wishlist'
                          >
                            <i className='bi bi-heart'></i>
                          </a>
                          <a
                            href='#!'
                            className='btn-action'
                            data-bs-toggle='tooltip'
                            data-bs-html='true'
                            title='Compare'
                          >
                            <i className='bi bi-arrow-left-right'></i>
                          </a>
                        </div>
                      </div>
                      <div className='text-small mb-1'>
                        <a
                          href='#!'
                          className='text-decoration-none text-muted'
                        >
                          <small>Fruits & Vegetables</small>
                        </a>
                      </div>
                      <h2 className='fs-6'>
                        <a
                          href='pages/shop-single.html'
                          className='text-inherit text-decoration-none'
                        >
                          Golden Pineapple
                        </a>
                      </h2>
                      <div className='d-flex justify-content-between align-items-center mt-3'>
                        <div>
                          <span className='text-dark'>$13</span>{" "}
                          <span className='text-decoration-line-through text-muted'>
                            $18
                          </span>
                        </div>
                        <div>
                          <small className='text-warning'>
                            {" "}
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-half'></i>
                          </small>
                          <span>
                            <small>4.5</small>
                          </span>
                        </div>
                      </div>
                      <div className='d-grid mt-2'>
                        <a href='#!' className='btn btn-primary '>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='feather feather-plus'
                          >
                            <line x1='12' y1='5' x2='12' y2='19'></line>
                            <line x1='5' y1='12' x2='19' y2='12'></line>
                          </svg>{" "}
                          Add to cart{" "}
                        </a>
                      </div>
                      <div className='d-flex justify-content-start text-center mt-3'>
                        <div
                          className='deals-countdown w-100'
                          data-countdown='2028/11/11 00:00:00'
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='my-lg-14 my-8'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-6 col-lg-3'>
                <div className='mb-8 mb-xl-0'>
                  <div className='mb-6'>
                    <img src='assets/images/icons/clock.svg' alt='' />
                  </div>
                  <h3 className='h5 mb-3'>10 minute grocery now</h3>
                  <p>
                    Get your order delivered to your doorstep at the earliest
                    from EcoWaste pickup stores near you.
                  </p>
                </div>
              </div>
              <div className='col-md-6  col-lg-3'>
                <div className='mb-8 mb-xl-0'>
                  <div className='mb-6'>
                    <img src='assets/images/icons/gift.svg' alt='' />
                  </div>
                  <h3 className='h5 mb-3'>Best Prices & Offers</h3>
                  <p>
                    Cheaper prices than your local supermarket, great cashback
                    offers to top it off. Get best pricess & offers.
                  </p>
                </div>
              </div>
              <div className='col-md-6 col-lg-3'>
                <div className='mb-8 mb-xl-0'>
                  <div className='mb-6'>
                    <img src='assets/images/icons/package.svg' alt='' />
                  </div>
                  <h3 className='h5 mb-3'>Wide Assortment</h3>
                  <p>
                    Choose from 5000+ products across food, personal care,
                    household, bakery, veg and non-veg & other categories.
                  </p>
                </div>
              </div>
              <div className='col-md-6 col-lg-3'>
                <div className='mb-8 mb-xl-0'>
                  <div className='mb-6'>
                    <img src='assets/images/icons/refresh-cw.svg' alt='' />
                  </div>
                  <h3 className='h5 mb-3'>Easy Returns</h3>
                  <p>
                    Not satisfied with a product? Return it at the doorstep &
                    get a refund within hours. No questions asked
                    <a href='#!'>policy</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* quick View Modal */}
      <div
        className='modal fade'
        id='quickViewModal'
        tabIndex='-1'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-xl modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-body p-8'>
              <div className='position-absolute top-0 end-0 me-3 mt-3'>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='row'>
                <div className='col-lg-6'>
                  <div className='product productModal' id='productModal'>
                    <div
                      className='zoom'
                      onMouseMove={(event) => zoom(event)}
                      style={{
                        backgroundImage:
                          "url(assets/images/products/product-single-img-1.jpg)",
                      }}
                    >
                      <img
                        src='assets/images/products/product-single-img-1.jpg'
                        alt=''
                      />
                    </div>
                    <div>
                      <div
                        className='zoom'
                        onMouseMove={(event) => zoom(event)}
                        style={{
                          backgroundImage:
                            "url(assets/images/products/product-single-img-2.jpg)",
                        }}
                      >
                        <img
                          src='assets/images/products/product-single-img-2.jpg'
                          alt=''
                        />
                      </div>
                    </div>
                    <div>
                      <div
                        className='zoom'
                        onMouseMove={(event) => zoom(event)}
                        style={{
                          backgroundImage:
                            " url(assets/images/products/product-single-img-3.jpg)",
                        }}
                      >
                        <img
                          src='assets/images/products/product-single-img-3.jpg'
                          alt=''
                        />
                      </div>
                    </div>
                    <div>
                      <div
                        className='zoom'
                        onMouseMove={(event) => zoom(event)}
                        style={{
                          backgroundImage:
                            "url(assets/images/products/product-single-img-4.jpg)",
                        }}
                      >
                        <img
                          src='assets/images/products/product-single-img-4.jpg'
                          alt=''
                        />
                      </div>
                    </div>
                  </div>

                  <div className='product-tools'>
                    <div
                      className='thumbnails row g-3'
                      id='productModalThumbnails'
                    >
                      <div className='col-3 tns-nav-active'>
                        <div className='thumbnails-img'>
                          <img
                            src='assets/images/products/product-single-img-1.jpg'
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='col-3'>
                        <div className='thumbnails-img'>
                          <img
                            src='assets/images/products/product-single-img-2.jpg'
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='col-3'>
                        <div className='thumbnails-img'>
                          <img
                            src='assets/images/products/product-single-img-3.jpg'
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='col-3'>
                        <div className='thumbnails-img'>
                          <img
                            src='assets/images/products/product-single-img-4.jpg'
                            alt=''
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='ps-lg-8 mt-6 mt-lg-0'>
                    <a href='#!' className='mb-4 d-block'>
                      Bakery Biscuits
                    </a>
                    <h2 className='mb-1 h1'>Napolitanke Ljesnjak</h2>
                    <div className='mb-4'>
                      <small className='text-warning'>
                        <i className='bi bi-star-fill'></i>
                        <i className='bi bi-star-fill'></i>
                        <i className='bi bi-star-fill'></i>
                        <i className='bi bi-star-fill'></i>
                        <i className='bi bi-star-half'></i>
                      </small>
                      <a href='#' className='ms-2'>
                        (30 reviews)
                      </a>
                    </div>
                    <div className='fs-4'>
                      <span className='fw-bold text-dark'>$32</span>
                      <span className='text-decoration-line-through text-muted'>
                        $35
                      </span>
                      <span>
                        <small className='fs-6 ms-2 text-danger'>26% Off</small>
                      </span>
                    </div>
                    <hr className='my-6' />
                    <div className='mb-4'>
                      <button
                        type='button'
                        className='btn btn-outline-secondary'
                      >
                        250g
                      </button>
                      <button
                        type='button'
                        className='btn btn-outline-secondary'
                      >
                        500g
                      </button>
                      <button
                        type='button'
                        className='btn btn-outline-secondary'
                      >
                        1kg
                      </button>
                    </div>
                    <div>
                      <div className='input-group input-spinner  '>
                        <input
                          type='button'
                          defaultValue='-'
                          className='button-minus  btn  btn-sm '
                          data-field='quantity'
                        />
                        <input
                          type='number'
                          step='1'
                          max='10'
                          defaultValue='1'
                          name='quantity'
                          className='quantity-field form-control-sm form-input   '
                        />
                        <input
                          type='button'
                          defaultValue='+'
                          className='button-plus btn btn-sm '
                          data-field='quantity'
                        />
                      </div>
                    </div>
                    <div className='mt-3 row justify-content-start g-2 align-items-center'>
                      <div className='col-lg-4 col-md-5 col-6 d-grid'>
                        <button type='button' className='btn btn-primary'>
                          <i className='feather-icon icon-shopping-bag me-2'></i>
                          Add to cart
                        </button>
                      </div>
                      <div className='col-md-4 col-5'>
                        <a
                          className='btn btn-light'
                          href='#'
                          data-bs-toggle='tooltip'
                          data-bs-html='true'
                          aria-label='Compare'
                        >
                          <i className='bi bi-arrow-left-right'></i>
                        </a>
                        <a
                          className='btn btn-light'
                          href='#!'
                          data-bs-toggle='tooltip'
                          data-bs-html='true'
                          aria-label='Wishlist'
                        >
                          <i className='feather-icon icon-heart'></i>
                        </a>
                      </div>
                    </div>
                    <hr className='my-6' />
                    <div>
                      <table className='table table-borderless'>
                        <tbody>
                          <tr>
                            <td>Product Code:</td>
                            <td>FBB00255</td>
                          </tr>
                          <tr>
                            <td>Availability:</td>
                            <td>In Stock</td>
                          </tr>
                          <tr>
                            <td>Type:</td>
                            <td>Fruits</td>
                          </tr>
                          <tr>
                            <td>Shipping:</td>
                            <td>
                              <small>
                                01 day shipping.
                                <span className='text-muted'>
                                  ( Free pickup today)
                                </span>
                              </small>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
