/* eslint-disable */
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import routes from "./config/routes";
import { AuthProvider } from "./context";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Setting up routing */}
        <Switch>
          {/* <Nav /> */}
          {routes.map((e) => (
            <AppRoutes
              key={e.path}
              path={e.path}
              component={e.component}
              isPrivate={e.isPrivate}
            />
          ))}
        </Switch>
        <Route
          exact
          path="/facebook"
          render={() =>
            (window.location =
              "https://www.facebook.com/shopify/")
          }
        />
        <Route
          exact
          path="/linkedin"
          render={() =>
            (window.location =
              "https://www.linkedin.com/company/shopify/")
          }
        />
        <Route
          exact
          path="/twitter"
          render={() =>
            (window.location = "https://twitter.com/Shopify/")
          }
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
