import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PageNotFound from "../common/components/404";
import Header from "../common/components/Header";
import Detail from "../features/musicPlayer/pages/Detail";
import Home from "../features/musicPlayer/pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/detail/:id"  component={Detail}/>
        <Route path="*" component={PageNotFound}/>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
