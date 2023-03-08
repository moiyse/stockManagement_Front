
import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import Layout from './components/layout';
const Register = React.lazy(()=> import ('./pages/user/Register'))
const TemplateFront = React.lazy(()=> import ('./components/front/TemplateFront'))
const TemplateBack = React.lazy(()=> import ('./components/back/TemplateBack'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
    <Routes>
    <Route path='*' element={<TemplateFront/>}/>
  
      <Route path='/register' element={<Register />}/>
         
      <Route path='/admin' element={<TemplateBack />}/>


  </Routes>
  </Layout>
  </Suspense>
  );
}

export default App;
