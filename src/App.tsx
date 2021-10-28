import { Suspense } from "react";
import { CircularProgress, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { PlayersProvider } from "./contexts/PlayersProvider";
import { VotesProvider } from "./contexts/VotesProvider";
import { Toaster } from "react-hot-toast";
import theme from "./theme/theme";
import { ApiProvider } from "./contexts/ApiProvider";
import { Box } from "@mui/system";
import { FeedbackProvider } from "./contexts/FeedbackProvider";
import { DiscussionProvider } from "./contexts/DiscussionProvider";
import { CLayout } from "./components/present/CLayout";
import { BotProvider } from "./contexts/BotProvider";
import { ActiveBotProvider } from "./contexts/ActiveBotProvider";

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
            <Box>
              <Toaster />
              <AuthProvider>
                <ActiveBotProvider>
                  <ApiProvider>
                    <BotProvider>
                      <FeedbackProvider>
                        <VotesProvider>
                          <PlayersProvider>
                            <DiscussionProvider>
                              <CLayout />
                            </DiscussionProvider>
                          </PlayersProvider>
                        </VotesProvider>
                      </FeedbackProvider>
                    </BotProvider>
                  </ApiProvider>
                </ActiveBotProvider>
              </AuthProvider>
            </Box>
          </Switch>
        </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
