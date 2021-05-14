import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import ResisterPage from './components/views/RegisterPage/ResisterPage'
import Auth from './hoc/auth'

function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage,null,true)}/>
            <Route exact path="/login" component={Auth(LoginPage,false)}>
              <LoginPage/>
            </Route> 
            <Route exact path="/register" component={Auth(ResisterPage,false)}>
              <ResisterPage/>
            </Route> 
          </Switch>
        </div>
      </Router>
  );
}

export default App;
