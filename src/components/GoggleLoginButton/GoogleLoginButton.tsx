import { GoogleLogin } from "@react-oauth/google";
import "./GoogleLoginButton.scss";

interface GoogleLoginButtonProps {
  onSuccess: (credential: string) => void;
  disabled?: boolean;
}

const GoogleLoginButton = ({
  onSuccess,
  disabled = false,
}: GoogleLoginButtonProps) => {
  return (
    <div
      className={`google-login-button ${
        disabled ? "google-login-button--disabled" : ""
      }`}
    >
      <GoogleLogin
        onSuccess={(response) => {
          if (response.credential) {
            onSuccess(response.credential);
          }
        }}
        onError={() => {
          console.error("Google login failed");
        }}
        useOneTap={false}
        type="standard"
        theme="outline"
        size="large"
        text="signin_with"
        shape="rectangular"
        logo_alignment="left"
        width="100%"
      />
    </div>
  );
};

export default GoogleLoginButton;
