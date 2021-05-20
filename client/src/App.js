import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
import { Suspense, version } from 'react'
import Footer from "./components/views/Footer/Footer"
import NavBar from "./components/views/NavBar/NavBar"
import UploadProductPage from "./components/views/UploadProductPage/UploadProductPage"


function App() {
  return (
      <div>
        <Router>
          <NavBar/>
          <div>
            <Switch>
              <Route exact path="/" component={Auth(LandingPage, null)} />
              <Route exact path="/login" component={Auth(LoginPage, false)} />
              <Route exact path="/register" component={Auth(RegisterPage, false)} />
              <Route exact path="/upload" component={Auth(UploadProductPage, true)} />
            </Switch>
          </div>
        </Router>
       {/* <Footer/> */}
       </div>
  );
}

export default App;
