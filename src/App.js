import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

import React, { Suspense, useCallback, useEffect, useState } from "react";

import Layout from "./components/layout";
import LayoutBack from "./components/layout/LayoutBack";

import Settings from "./pages/front/user/Settings";
import axios from "axios";
import Home from "./pages/front/home/Home";
import Login from "./pages/commun/auth/Login";
import SignIn from "./pages/commun/auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/messages";
import Order from "./pages/commun/auth/Order";
import OrdersList from "./pages/front/orders/OrdersList";
import OrderDetail from "./pages/front/orders/OrderDetail";
import Categories from "./pages/back/categories/Categories";
import AddCategory from "./pages/back/categories/AddCategory";
//import EditProduct from "./pages/back/products/EditProduct";


axios.defaults.baseURL = "http://localhost:5000";

const Register = React.lazy(() => import("./pages/commun/auth/Register"));
const Users = React.lazy(() => import("./pages/back/users/Users"));
const Stock = React.lazy(() => import( "./pages/back/stock/Stock"));

const ForgetPassword = React.lazy(() =>
  import("./pages/commun/auth/ForgetPassword")
);

const TemplateBack = React.lazy(() => import("./components/back/TemplateBack"));
const Products = React.lazy(() => import("./pages/back/products/Products"));
const AddProduct = React.lazy(() => import("./pages/back/products/AddProduct"));
const ProductDetail  = React.lazy(() => import("./pages/front/products/ProductDetail"));
const EditProduct  = React.lazy(() => import("./pages/back/products/EditProduct"));


function App() {
  const [showCustomerBoard, setShowCustomerBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  useEffect(() => {
    if (currentUser) {
      setShowCustomerBoard(currentUser.roles.includes("ROLE_USER"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowCustomerBoard(false);
      setShowAdminBoard(false);
    }
  }, [currentUser]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          exact
          path="*"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
                <Route
          exact
          path='/productDetail'
          element={
            <Layout>
              <ProductDetail />
            </Layout>
          }
        />
        <Route exact path="/forgetPassword" element={<ForgetPassword />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/admin" element={<TemplateBack />} />
        <Route exact path="/signIn" element={<SignIn />} />
        <Route exact path="/order" element={<Order />} />

        <Route exact path="/ordersList" element={ <Layout><OrdersList /></Layout>} />
        <Route path="/OrderDetail/:orderId" element={ <Layout><OrderDetail /></Layout>} />


        <Route
          exact
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
        <Route exact path="/" element={<Login />} />
        <Route
          exact
          path="/dashboard/users"
          element={
            <LayoutBack>
              <Users />
            </LayoutBack>
          }
        />

        <Route
          exact
          path='/dashboard/products'
          element={
            <LayoutBack>
              <Products />
            </LayoutBack>
          }
        />
        <Route
          exact
          path="/admin/categories"
          element={
            <LayoutBack>
              <Categories />
            </LayoutBack>
          }
        />
        <Route
          exact
          path="/dashboard/addCategory"
          element={
            <LayoutBack>
              <AddCategory />
            </LayoutBack>
          }
        />
        <Route
          exact
          path="/dashboard/addCategory/:id"
          element={
            <LayoutBack>
              <AddCategory />
            </LayoutBack>
          }
        />
        <Route
          exact
          path="/dashboard/stock/:id"
          element={
            <LayoutBack>
              <Stock />
            </LayoutBack>
          }
        />

        
        <Route
          exact
          path='/dashboard/addProduct'
          element={
            <LayoutBack>
              <AddProduct />
            </LayoutBack>
          }
          />

          <Route
          exact
          path='/dashboard/editProduct'
          element={
            <LayoutBack>
              <EditProduct />
            </LayoutBack>
          }
          />
          

             
           
      </Routes>
    </Suspense>
  );
}

export default App;
