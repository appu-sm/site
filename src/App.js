import React from 'react';
import './App.css';
import { Route, Router } from "react-router-dom";
import Investment from './components/Investments';
import Expenses from './components/Expenses';

function App() {
  return (
    
     <div className="App">
       
     
    <Route exact path="/" component={Investment} />
    <Route path="/expenses" component={Expenses} />
   </div>
  );
}

export default App;
