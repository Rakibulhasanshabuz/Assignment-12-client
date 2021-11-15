import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import Booking from "./Components/Booking/Booking/Booking";
import PlaceOrder from "./Components/Booking/PlaceOrder/PlaceOrder";
import Dashboard from "./Components/Dashboard/Dashboard/Dashboard";
import Explore from "./Components/Explore/Explore";
import Home from "./Components/Home/Home/Home";
import Login from "./Components/Login/Login/Login";
import PrivateRoute from "./Components/Login/PrivateRoute/PrivateRoute";
import Register from "./Components/Login/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import Footer from "./Components/Shared/Footer/Footer";
import Header from "./Components/Shared/Header/Header";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
       <Header></Header>
      <Switch>
          <Route path="/explore">
            <Explore></Explore>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <PrivateRoute path="/booking/:id">
            <Booking></Booking>
          </PrivateRoute>
          <Route path="/placeOrder/:orderId">
            <PlaceOrder></PlaceOrder>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
