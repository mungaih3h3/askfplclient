import { Suspense } from "react";
import { CircularProgress, Container, CssBaseline, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { PlayersProvider } from "./contexts/PlayersProvider";
import { VotesProvider } from "./contexts/VotesProvider";
import routes from "./pages/routes";
import { Toaster } from "react-hot-toast";
import theme from "./theme/theme";
import { ApiProvider } from "./contexts/ApiProvider";
import { Box } from "@mui/system";
import CNav from "./components/present/CNav";
import { FeedbackProvider } from "./contexts/FeedbackProvider";
import { HideOnScroll } from "./components/utils/HideOnScroll";
import { DiscussionProvider } from "./contexts/DiscussionProvider";

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <CircularProgress color={"inherit"} />
          </Box>
        }
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Container maxWidth={"sm"}>
              <Toaster />
              <AuthProvider>
                <ApiProvider>
                  <FeedbackProvider>
                    <VotesProvider>
                      <PlayersProvider>
                        <DiscussionProvider>
                          {routes.map(({ path, Component, navTitle }) => (
                            <Route exact key={path} path={path}>
                              <Stack spacing={2}>
                                <HideOnScroll>
                                  <CNav title={navTitle} />
                                </HideOnScroll>
                                <Component />
                              </Stack>
                            </Route>
                          ))}
                        </DiscussionProvider>
                      </PlayersProvider>
                    </VotesProvider>
                  </FeedbackProvider>
                </ApiProvider>
              </AuthProvider>
            </Container>
          </Switch>
        </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
