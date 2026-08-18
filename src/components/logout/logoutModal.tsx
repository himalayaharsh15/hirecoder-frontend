import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface LogoutModalProps {
  open: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal = ({
  open,
  isLoading,
  onConfirm,
  onCancel,
}: LogoutModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-description"
    >
      <DialogTitle id="logout-dialog-title">Logout</DialogTitle>

      <DialogContent>
        <DialogContentText id="logout-dialog-description">
          Are you sure you want to logout?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>

        <Button onClick={onConfirm} variant="contained" disabled={isLoading}>
          {isLoading ? "Logging out..." : "Logout"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;
