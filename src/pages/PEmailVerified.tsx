import { Button, Stack, Typography } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { ApiContext } from "../contexts/ApiProvider";
import { AuthContext, AuthProvider } from "../contexts/AuthProvider";

interface PEmailVerifiedProps {}

const PEmailVerified: FC<PEmailVerifiedProps> = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { getInstance } = useContext(ApiContext);
  const { setToken } = useContext(AuthContext);
  const { code } = useParams<{ code: string }>();
  const history = useHistory();
  useEffect(() => {
    (async () => {
      try {
        if (!code) throw new Error("Invalid code");
        const {
          data: { success, token, message },
        } = await getInstance().get<any, any>(`/email/verify/${code}`);
        if (!success) throw new Error(message);
        setToken(token);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    })();
  }, []);
  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  if (error) {
    return (
      <Stack spacing={2}>
        <Typography>
          There was an error verifying your email address. Please try again
          later
        </Typography>
      </Stack>
    );
  } else {
    return (
      <Stack spacing={2}>
        <Typography>Your email has been verified!</Typography>
        <Button
          variant="contained"
          onClick={() => {
            history.push("/");
          }}
        >
          Explore
        </Button>
      </Stack>
    );
  }
};

export default PEmailVerified;
