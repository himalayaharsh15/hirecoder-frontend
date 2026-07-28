import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

import "./Navbar.scss";

const Navbar = () => {
  return (
    <AppBar position="sticky" elevation={0} className="navbar">
      <Toolbar className="navbar__toolbar">
        <Typography variant="h6" className="navbar__logo">
          HireCoder AI
        </Typography>

        <Box className="navbar__menu">
          <Button component={Link} to="/" className="navbar__link">
            Home
          </Button>

          <Button component={Link} to="/login" className="navbar__login">
            Login
          </Button>

          <Button
            component={Link}
            to="/register"
            variant="contained"
            className="navbar__register"
          >
            Register
          </Button>
          <Button
            component={Link}
            to="/resume-analyzer"
            className="navbar__resume-analyzer"
          >
            Resume Analyzer
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
