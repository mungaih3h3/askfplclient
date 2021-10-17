import { Container, CssBaseline } from "@mui/material";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { PlayersProvider } from "./contexts/PlayersProvider";
import { PollProvider } from "./contexts/PollProvider";
import routes from "./pages/routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Switch>
        <Container maxWidth={"sm"}>
          <Toaster />
          <AuthProvider>
            <PollProvider>
              <PlayersProvider>
                {routes.map(({ path, Component }) => (
                  <Route exact key={path} path={path} component={Component} />
                ))}
              </PlayersProvider>
            </PollProvider>
          </AuthProvider>
        </Container>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
