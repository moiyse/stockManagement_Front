import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

import React, { Suspense, useCallback, useEffect, useState } from "react";

import Layout from "./components/layout";
import LayoutBack from "./components/layout/LayoutBack";

import Settings from "./pages/front/user/Settings";
import axios from "axios";
import Users from "./pages/back/users/Users";
import Home from "./pages/front/home/Home";
import Login from "./pages/commun/auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/messages";


axios.defaults.baseURL = "http://localhost:5000";

const Register = React.lazy(() => import("./pages/commun/auth/Register"));

const TemplateBack = React.lazy(() => import("./components/back/TemplateBack"));

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
          path='*'
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          exact
          path='/register'
          element={
              <Register />
          }
        />
        <Route
          exact
          path='/admin'
          element={
            <Layout>
              <TemplateBack />
            </Layout>
          }
        />
        <Route
          exact
          path='/settings'
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
                <Route
          exact
          path='/'
          element={
         
              <Login />
    
          }
        />
        <Route
          exact
          path='/dashboard/users'
          element={
            <LayoutBack>
              <Users />
            </LayoutBack>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
