import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import ResisterPage from './components/views/RegisterPage/ResisterPage'

function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route path="/login">
              <LoginPage/>
            </Route> 
            <Route path="/register">
              <ResisterPage/>
            </Route> 
          </Switch>
        </div>
      </Router>
  );
}

export default App;
