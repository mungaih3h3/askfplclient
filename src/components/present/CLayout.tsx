import { Divider, Grid, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";
import routes from "../../pages/routes";
import CNav from "./CNav";
import { CSideNav } from "./CSideNav";
import { Route } from "react-router-dom";
import { grey } from "@mui/material/colors";

export const CLayout: FC = () => {
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid container spacing={0} rowSpacing={0}>
      {!onMobile && (
        <Grid
          item
          sm={3}
          md={2}
          sx={{
            position: "sticky",
            top: 0,
            bgcolor: grey[800],
            height: "100vh",
          }}
        >
          <CSideNav />
        </Grid>
      )}

      <Grid item sm={9} md={10} xs={12} sx={{ pt: 3 }}>
        <Grid container sx={{ pl: onMobile ? 0 : 4 }}>
          {routes.map(({ path, Component, navTitle }) => (
            <Route exact key={path} path={path}>
              <Grid item sm={12} xs={12}>
                <CNav title={navTitle} />
              </Grid>
              <Grid item sm={8} xs={12} sx={{ p: 2 }}>
                <Component />
              </Grid>
            </Route>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
