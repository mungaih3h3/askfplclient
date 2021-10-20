import React from "react";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { PlayersProvider } from "./contexts/PlayersProvider";
import { VotesProvider } from "./contexts/VotesProvider";
import routes from "./pages/routes";
import { Toaster } from "react-hot-toast";
import theme from "./theme/theme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Container maxWidth={"sm"}>
            <Toaster />
            <AuthProvider>
              <VotesProvider>
                <PlayersProvider>
                  {routes.map(({ path, Component }) => (
                    <Route exact key={path} path={path} component={Component} />
                  ))}
                </PlayersProvider>
              </VotesProvider>
            </AuthProvider>
          </Container>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
