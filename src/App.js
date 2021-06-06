import React,{useEffect} from 'react';
import './App.css';
import Header from './component/Header';
import Home from './component/Home';
import Checkout from './component/Checkout';
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import Login from './component/Login';
import { auth } from './firebase';
import { useStateValue } from "./component/StateProvider";

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
             <Checkout/>
        </Route>
          <Route path="/">
           <Header />  
          <Home />
       </Route>  
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
