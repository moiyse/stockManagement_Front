import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Layout from "./components/layout";
import LayoutBack from "./components/layout/LayoutBack";

import Settings from "./pages/user/Settings";
import axios from "axios";
import Users from "./pages/back/Users";
axios.defaults.baseURL = "http://localhost:5000";

const Register = React.lazy(() => import("./pages/user/Register"));
const TemplateFront = React.lazy(() =>
  import("./components/front/TemplateFront")
);
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
              <TemplateFront />
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
