import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "shards-react";
import { Route, Switch, Link, BrowserRouter as Router, useLocation, useHistory } from "react-router-dom";
import Home from "./screens/Home/Home";
import JobDetail from "./screens/JobDetail/JobDetail";
function App() {

  function handleBack() {
    console.log('---handle back');
  }


  return <Router>
    
    <div>
{/* <div className='masthead mb-auto row'>

      <nav className="nav nav-masthead d-flex justify-content-between align-items-center fixed-top bg-primary pr-50 p-0 shadow">
        <a onClick={()=>handleBack()} className="  mr-8 text-white" href="#"> &larr; </a>
        <p className="navbar-brand  mr-0 text-white ">page name</p>
        
      </nav>
</div> */}
      <div className='chartjs-size-monitor'>

        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/:jobId'>
            <JobDetail />
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
}

export default App;
