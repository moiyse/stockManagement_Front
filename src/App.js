import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Layout from "./components/layout";
import LayoutBack from "./components/layout/LayoutBack";

import Settings from "./pages/front/user/Settings";
import axios from "axios";
import Users from "./pages/back/users/Users";
import Home from "./pages/front/home/Home";
axios.defaults.baseURL = "http://localhost:5000";

const Register = React.lazy(() => import("./pages/commun/auth/Register"));

const TemplateBack = React.lazy(() => import("./components/back/TemplateBack"));

function App() {
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
            <Layout>
              <Register />
            </Layout>
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
