const { Route, Redirect } = require("react-router-dom");

const checkAuth = () => {
  if (!localStorage.getItem("token")) {
    return true;
  }
  return false;
};

const checkLogin = () => {
  if (localStorage.getItem("token")) {
    return true;
  }

  return false;
};

export const AuthRoute = (props) => {
  const { path, component, redirectPath } = props;
  if (checkAuth()) {
    return <Route path={path} component={component} />;
  }
  return <Redirect to={redirectPath} />;
};

export const PrivateRoute = (props) => {
  const { path, component, redirectPath } = props;
  if (checkLogin()) {
    return <Route path={path} component={component} />;
  }

  return <Redirect to={redirectPath} />;
};
