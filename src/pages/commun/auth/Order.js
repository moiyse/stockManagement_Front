import axios from "axios";

import { useSelector } from "react-redux";
function Order() {
  const { user: currentUser } = useSelector((state) => state.auth);
  var orderLineIds = [];
  const handleSubmitt = () => {
    const cart = [
      {
        product: "6427d2e7b6116d2ddb04aac0",
        quantity: 4,
        price: 19.99,
      },
      {
        product: "6427d3f7b137de121f4b80cd",
        quantity: 15,
        price: 9.99,
      },
    ];
    cart.map((c) => {
      axios
        .post("http://localhost:5000/orders/orderLine", c)
        .then(function (response) {
          orderLineIds.push(response.data._id);

          console.log(orderLineIds);
          return orderLineIds;
        })
        .catch(function (error) {
          console.log(error);
        });
        return orderLineIds;
    });
  };
  const confirmOrder = async () => {
    const cart = [
      {
        product: "6427d2e7b6116d2ddb04aac0",
        quantity: 4,
        price: 19.99,
      },
      {
        product: "6427d3f7b137de121f4b80cd",
        quantity: 15,
        price: 9.99,
      },
    ];
    await Promise.all(
      cart.map(async (c) => {
        try {
          const response = await axios.post(
            "http://localhost:5000/orders/orderLine",
            c
          );
          orderLineIds.push(response.data._id);
          console.log(orderLineIds);
          return response;
        } catch (error) {
          console.log(error);
        }
      })
    );

    var orderInfo = {
      orderLines: orderLineIds,
      customer: currentUser.id,
      totalAmount: 4000,
      paymentMethod: "creditcard",
      status: "processing",
    };
    axios
      .post("http://localhost:5000/orders/order", orderInfo)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <section className="my-lg-14 my-8">
        <button className="btn btn-primary" onClick={handleSubmitt}>
          Confirm Cart
        </button>
        <button className="btn btn-primary" onClick={confirmOrder}>
          Confirm Order
        </button>
      </section>
    </>
  );
}

export default Order;
