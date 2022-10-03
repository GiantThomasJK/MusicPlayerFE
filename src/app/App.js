import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PageNotFound from "../common/components/404";
import Header from "../common/components/Header";
import Detail from "../features/musicPlayer/pages/Detail";
import Home from "../features/musicPlayer/pages/Home";
import AddSong from "features/musicPlayer/pages/AddSong";
import SignIn from "features/authentication/pages/SignIn";
import SignUp from "features/authentication/pages/SignUp";
import { AuthRoute, PrivateRoute } from "./Guard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { signInAction } from "features/authentication/action";
import AdminTemplate from "common/components/Admin/AdminTemplate";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}

      <Switch>
        {/* <PrivateRoute path="/home" component={Home} redirectPath="/" exact /> */}
        {/* <PrivateRoute
          path="/detail/:id"
          component={Detail}
          redirectPath="/Signin"
        /> */}
        {/* <PrivateRoute
          path="/addSong"
          component={AddSong}
          redirectPath="/Signin"
        /> */}
        <AdminTemplate path="/Signin" exact Component={SignIn} />
        <AdminTemplate path="/" exact Component={Home} />
        <AdminTemplate path="/addSong" exact Component={AddSong} />
        <AdminTemplate path="/detail/:id" exact Component={Detail} />

        {/* <AuthRoute path="/Signin" component={SignIn} /> */}
        <Route path="*" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
