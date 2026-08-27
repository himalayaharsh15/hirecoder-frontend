import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";

interface GoogleLoginButtonProps {
  onSuccess: (credential: string) => void;
  disabled?: boolean;
}

/**
 * ============================================================
 * Google Login Button
 * ============================================================
 *
 * Custom MUI Google login button.
 *
 * Instead of using Google's pre-styled <GoogleLogin />
 * component, we use the useGoogleLogin hook so that
 * the button can be completely controlled by MUI.
 *
 * Flow:
 *
 * MUI Button
 *     ↓
 * Google authentication
 *     ↓
 * Google access token
 *     ↓
 * Backend verification
 */
const GoogleLoginButton = ({
  onSuccess,
  disabled = false,
}: GoogleLoginButtonProps) => {
  const loginWithGoogle = useGoogleLogin({
    /**
     * Google authentication succeeded.
     *
     * The access_token returned here is passed to the parent.
     */
    onSuccess: (tokenResponse) => {
      onSuccess(tokenResponse.access_token);
    },

    /**
     * Google authentication failed.
     */
    onError: () => {
      console.error("Google login failed");
    },
  });

  return (
    <Button
      type="button"
      fullWidth
      variant="outlined"
      size="large"
      startIcon={<GoogleIcon />}
      onClick={() => loginWithGoogle()}
      disabled={disabled}
      sx={{
        height: 48,
        textTransform: "none",
        fontSize: "15px",
        fontWeight: 500,
        borderRadius: "6px",

        color: "#3c4043",
        backgroundColor: "#fff",
        borderColor: "#dadce0",

        "&:hover": {
          backgroundColor: "#69bbe5",
          borderColor: "#c7c9cc",
          boxShadow:
            "0 1px 2px rgba(60, 64, 67, 0.2), 0 1px 3px rgba(60, 64, 67, 0.1)",
        },

        "&:active": {
          backgroundColor: "#69bbe5",
        },

        "& .MuiButton-startIcon": {
          marginRight: "10px",
        },
      }}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButton;
