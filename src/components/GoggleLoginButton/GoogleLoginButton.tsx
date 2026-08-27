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
  const handleSuccess = (response: { credential?: string }) => {
    if (!response.credential) {
      console.error("Google did not return a credential");
      return;
    }

    onSuccess(response.credential);
  };

  const handleError = () => {
    console.error("Google login failed");
  };

  return (
    <div
      className={`google-login-button ${
        disabled ? "google-login-button--disabled" : ""
      }`}
    >
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={false}
        theme="outline"
        size="large"
        text="signin_with"
        shape="rectangular"
        width="100%"
      />
    </div>
  );
};

export default GoogleLoginButton;
