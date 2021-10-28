import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";
import routes from "../../pages/routes";
import CNav from "./CNav";
import { CSideNav } from "./CSideNav";
import { Route } from "react-router-dom";
import { Box } from "@mui/system";

export const CLayout: FC = () => {
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid container spacing={2}>
      {!onMobile && (
        <Grid item md={3}>
          <Box
            sx={{
              position: "sticky",
              top: 10,
            }}
          >
            <CSideNav />
          </Box>
        </Grid>
      )}

      {routes.map(({ path, Component, navTitle }) => (
        <Route exact key={path} path={path}>
          <Grid item md={7} xs={12} sm={12} key={path}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CNav title={navTitle} />
              </Grid>
              <Grid item xs={12}>
                <Component />
              </Grid>
            </Grid>
          </Grid>
        </Route>
      ))}
    </Grid>
  );
};
