import { useEffect, useState } from "react";
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
  const [width, setWidth] = useState(400);

  useEffect(() => {
    const updateWidth = () => {
      const availableWidth = Math.min(window.innerWidth - 40, 400);

      setWidth(availableWidth);
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

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
        theme="outline"
        size="large"
        text="signin_with"
        shape="rectangular"
        width={width}
      />
    </div>
  );
};

export default GoogleLoginButton;
