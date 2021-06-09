import React,{useEffect} from 'react';
import './App.css';
import Header from './component/Header';
import Home from './component/Home';
import Checkout from './component/Checkout';
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import Login from './component/Login';
import { auth } from './firebase';
import { useStateValue } from "./component/StateProvider";
import Footer from "./component/Footer";
import Payment from './component/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./component/Orders"

const promise = loadStripe("pk_test_51IzangEMWBc7KWcdu6dEiMpiX3oWH7nczchITCaM7LFcIvcdQDqoFpVJWcdhHyFwGFCauVFoQ9ZkGj1rsNnbiPSp00XVGWqJh4")

function App() {
  

  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("this is user", authUser);

      if (authUser) {
        //the user is logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        //user is logged out
        dispatch({
          type: "SET_USER",
          user: null
        })
      }

    })
    
  }, [])
  
  return (
     <BrowserRouter>
      <div className="App">
       
        <Switch>
          <Route path='/login'>
            <Login/>
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
            <Footer/>
          </Route>

         <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
            <Payment />
            </Elements>
            
          </Route>
          <Route path="/orders">
             <Header />
            <Orders />            
            <Footer/>
          </Route>
          <Route path="/">
           <Header />  
            <Home />
            <Footer/>
          </Route>
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
