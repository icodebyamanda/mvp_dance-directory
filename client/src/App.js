import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dancestyles from './components/Dancestyles';
import Instructors from './components/Instructors';
import Home from './components/Home';
import Classes from './components/Classes';

function App() {

  return (
    <Router>
    <div className="App">

      <h1>Dance Classes</h1>

      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dancestyles">Dance Styles</Link>
            </li>
            <li>
              <Link to="/classes">Classes</Link>
            </li>
            <li>
              <Link to="/instructors">Instructors</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/dancestyles">
            <Dancestyles />
          </Route>
          <Route path="/classes">
            <Classes />
          </Route>
          <Route path="/instructors">
            <Instructors />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>

    </div>
    </Router>
  );
}

export default App;
