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
import DetailProductPage from "./components/views/DetailProductPage/DetailProductPage"

function App() {
  return (
        <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar/>
        <Router>
          <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
            <Switch>
              <Route exact path="/" component={Auth(LandingPage, null)} />
              <Route exact path="/login" component={Auth(LoginPage, false)} />
              <Route exact path="/register" component={Auth(RegisterPage, false)} />
              <Route exact path="/upload" component={Auth(UploadProductPage, true)} />
              <Route exact path="/product/:productId" component={Auth(DetailProductPage,null)}/>
            </Switch>
          </div>
        </Router>
       {/* <Footer/> */}
       </Suspense>
  );
}

export default App;
