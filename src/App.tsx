import { Container, CssBaseline } from "@mui/material";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { PollProvider } from "./contexts/PollProvider";
import routes from "./pages/routes";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Switch>
        <Container maxWidth={"sm"}>
          <AuthProvider>
            <PollProvider>
              {routes.map(({ path, Component }) => (
                <Route exact key={path} path={path} component={Component} />
              ))}
            </PollProvider>
          </AuthProvider>
        </Container>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
