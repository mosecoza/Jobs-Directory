import React from 'react';
import { Route, Switch,  BrowserRouter as Router,  } from "react-router-dom";
import Home from "./screens/Home/Home";
import JobDetail from "./screens/JobDetail/JobDetail";
function App() {

  return <Router>
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/:jobId'>
        <JobDetail />
      </Route>
    </Switch>
  </Router>
}

export default App;
