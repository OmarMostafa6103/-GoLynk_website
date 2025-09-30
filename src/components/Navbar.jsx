import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Divider,
  Container,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const links = [
  { to: "/home", label: "الرئيسية" },
  { to: "/map", label: "الخريطة" },
  { to: "/orders", label: "الأوردرات" },
  { to: "/chat", label: "الشات" },
  { to: "/notifications", label: "الإشعارات" },
  { to: "/users", label: "المستخدمين" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (to) => (pathname === to ? "contained" : "text");

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        borderBottom: "1px solid rgba(2,6,23,0.06)",
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "saturate(180%) blur(8px)",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, md: 72 }, px: 0 }}>
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" className="font-extrabold text-brand-700">
            <Link
              to="/home"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              GoLynk
            </Link>
          </Typography>

          {/* Desktop nav */}
          <Box className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Button
                key={l.to}
                component={Link}
                to={l.to}
                color="inherit"
                variant={isActive(l.to)}
                sx={{
                  fontSize: { md: 15, lg: 16 },
                  mx: 0.75,
                  px: 2,
                  borderRadius: 999,
                  textTransform: "none",
                }}
              >
                <span className="px-1">{l.label}</span>
              </Button>
            ))}
            <Button
              component={Link}
              to="/auth/login"
              color="inherit"
              variant="contained"
              sx={{
                fontWeight: 800,
                ml: 1.5,
                borderRadius: 999,
                backgroundColor: "#2563eb",
                "&:hover": { backgroundColor: "#1d4ed8" },
              }}
            >
              دخول
            </Button>
          </Box>

          {/* Mobile toggle */}
          <Box className="md:hidden">
            <IconButton color="inherit" onClick={() => setOpen((v) => !v)}>
              {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Container>
      </Toolbar>

      {/* Mobile menu */}
      <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
        <Box
          role="presentation"
          sx={{ width: "100vw" }}
          className="bg-white text-gray-800"
        >
          <Container maxWidth={false} disableGutters sx={{ py: 1 }}>
            <Box className="flex items-center justify-between py-2">
              <Typography variant="h6" className="font-bold">
                القائمة
              </Typography>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider />
            <List>
              {links.map((l) => (
                <ListItemButton
                  key={l.to}
                  component={Link}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  selected={pathname === l.to}
                >
                  <ListItemText primary={l.label} sx={{ textAlign: "right" }} />
                </ListItemButton>
              ))}
              <Divider />
              <ListItemButton
                component={Link}
                to="/auth/login"
                onClick={() => setOpen(false)}
              >
                <ListItemText primary="دخول" sx={{ textAlign: "right" }} />
              </ListItemButton>
            </List>
          </Container>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
