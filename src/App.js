
import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
const Login = React.lazy(() => import('./pages/user/Login'))
const Register = React.lazy(()=> import ('./pages/user/Register'))
const TemplateFront = React.lazy(()=> import ('./components/front/TemplateFront'))
const TemplateBack = React.lazy(()=> import ('./components/back/TemplateBack'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
    <Route path='*' element={<TemplateFront/>}></Route>

      <Route path='/login'  element={<Login />}></Route>
  
      <Route path='/register' element={<Register />}></Route>
         
      <Route path='/admin' element={<TemplateBack />}></Route>


  </Routes>
  </Suspense>
  );
}

export default App;
