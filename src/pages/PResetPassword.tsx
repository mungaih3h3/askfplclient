import { FC } from "react";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router";
import CResetPassword from "../components/auth/CResetPassword";

interface PResetPasswordProps {}

const PResetPassword: FC<PResetPasswordProps> = () => {
  const history = useHistory();
  const { email, resetCode } =
    useParams<{ email: string; resetCode: string }>();
  if (!email || !resetCode) {
    toast.error("Invalid password reset link");
    history.push("/");
    return null;
  } else {
    return (
      <CResetPassword
        onReset={() => {
          history.push("/");
        }}
        email={email}
        resetCode={resetCode}
      />
    );
  }
};

export default PResetPassword;
