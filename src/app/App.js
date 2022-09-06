import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PageNotFound from "../common/components/404";
import Header from "../common/components/Header";
import Detail from "../features/musicPlayer/pages/Detail";
import Home from "../features/musicPlayer/pages/Home";
import AddSong from "features/musicPlayer/pages/AddSong";
import SignIn from "features/authentication/pages/SignIn";
import SignUp from "features/authentication/pages/SignUp";
import { AuthRoute, PrivateRoute } from "./Guard";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <PrivateRoute path="/" component={Home} redirectPath="/Signin" exact />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/addSong" component={AddSong} />
        {/* <Route path="/Signin" component={SignIn} />
        <Route path="/Signup" component={SignUp} /> */}

        <AuthRoute path="/Signin" component={SignIn} redirectPath="/" />
        <Route path="*" component={PageNotFound} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
