import { GoogleLogin } from "@react-oauth/google";

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
      style={{
        width: "100%",
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={false}
        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
        width="100%"
      />
    </div>
  );
};

export default GoogleLoginButton;
