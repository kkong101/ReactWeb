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
import DetailProductPage from "./components/views/DetailProductPage/DetailProductPage";
import CartPage from "./components/views/CartPage/CartPage"

function App() {
  return (
        <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar/>
        <Router>
          <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
            <Switch>
              <Route exact path="/" component={Auth(LandingPage, null)} />
              {/* 로그인 한사람만 => true */}
              <Route exact path="/user/cart" component={Auth(CartPage, true)} /> 
              <Route exact path="/login" component={Auth(LoginPage, false)} />
              <Route exact path="/register" component={Auth(RegisterPage, false)} />
              <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
              <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
            </Switch>
          </div>
        </Router>
       {/* <Footer/> */}
       </Suspense>
  );
}

export default App;
