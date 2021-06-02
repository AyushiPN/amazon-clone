import React,{useEffect} from "react";
import './App.css';
import Header from "../src/components/Header";
import Home from "../src/components/Home";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Checkout from "./components/Checkout";
import Login from "../src/components/Login";
import {auth} from "./firebase";
import { useStateValue } from "./StateProvider";


//Always put the root route at the end of all the routings
function App() {
  const [{ basket, user }, dispatch] = useStateValue();
  //listener to keep trak of the logged in user
  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        
        <Switch>

           <Route path="/login">
            <Login/>
          </Route>
          <Route path="/checkout">
            <Header/>
            <Checkout/>
          </Route>
          
          <Route path="/">
            <Header/>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
