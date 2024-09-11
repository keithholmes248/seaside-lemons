"use client";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Image from "next/image";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CompanyLogo from "../../public/company-logo.png";

import { onFirebaseAuthStateChanged, signInWithGoogle, signOut } from "@/firebase/client-firebase-google-authenticate";
import { User } from "firebase/auth";
import { ListItem, ListItemAvatar, ListItemText, Avatar, Menu, Typography } from "@mui/material";
import { getAuthenticatedFirebaseAppForUser } from "@/firebase/server-firebase";
import { FirebaseClientAuth } from "@/firebase/client-firebase";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `12px`,
  backdropFilter: "blur(32px)",
  border: "1px solid",
  borderColor: alpha("hsl(220, 20%, 80%)", 0.4),
  backgroundColor: "hsla(0, 0%, 99%, 0.9)",
  boxShadow: "hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px,hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px",
  padding: "8px 12px",
}));

export interface AppNavbarProps {}

export default function AppNavbar(props: AppNavbarProps) {
  const [user, setUser] = React.useState<User | null>(FirebaseClientAuth.currentUser);
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = React.useState<HTMLElement>();
  const accountMenuOpen = Boolean(accountMenuAnchorEl);

  const handleAccountMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchorEl(event.currentTarget);
  };
  const handleCloseAccountMenu = () => {
    setAccountMenuAnchorEl(undefined);
  };

  const handleSignIn = async (event: React.MouseEvent<HTMLElement>) => {
    await signInWithGoogle();
  };

  const handleSignOut = async (event: React.MouseEvent<HTMLElement>) => {
    await signOut();
    handleCloseAccountMenu();
  };

  const handleFirebaseAuthChanges = () => {
    const unsubscribe = onFirebaseAuthStateChanged((firebaseUser) => {
      console.log("currentUser", firebaseUser);
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  };
  React.useEffect(handleFirebaseAuthChanges);

  return (
    <AppBar position="static" sx={{ boxShadow: 0, bgcolor: "transparent", backgroundImage: "none", mt: "16px", mb: "16px" }}>
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ width: 32, height: 32, mr: "10px" }}>
            <Image
              src={CompanyLogo}
              alt="Picture of the author"
              width={32}
              height={32}
              // width={500} automatically provided
              // height={500} automatically provided
              // blurDataURL="data:..." automatically provided
              // placeholder="blur" // Optional blur-up while loading
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button variant="text" color="info">
                Contacts
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {!user && (
              <Button onClick={handleSignIn} variant="text" color="info">
                <AccountCircle sx={{ width: 32, height: 32, mr: "8px" }} color="primary" />
                Login
              </Button>
            )}

            {user && (
              <Button onClick={handleAccountMenuClick} variant="text" color="info">
                <Avatar alt={user.displayName as string} src={user.photoURL as string} sx={{ width: 32, height: 32, mr: "8px" }} color="primary" />
                {user.displayName}
              </Button>
            )}

            <Menu id="account-menu" anchorEl={accountMenuAnchorEl} open={accountMenuOpen} onClose={handleCloseAccountMenu}>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
