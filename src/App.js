import React from 'react';
import CrudApi from './components/CrudApi';
import CrudApp from './components/CrudApp';


function App() {
  return (
    <>
      <CrudApi/>
      <hr/>
      <h1>MI CRUD CON REACT</h1>
      <CrudApp/>
      <hr/>
    </>
  );
}

export default App;
