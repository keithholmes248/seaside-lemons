"use client";

import { Box, Container, Paper, Typography } from "@mui/material";
import { ConstituentContactsDataGrid } from "./constituent-contacts.data-grid";
import React from "react";
import { PageLoaderContext } from "./page-loader.context";
import { FirebaseClientAuth } from "@/firebase/client-firebase";
import { onFirebaseAuthStateChanged, signInWithGoogle } from "@/firebase/client-firebase-google-authenticate";

export default function Home() {
  const [hasAuthLoaded, setHasAuthLoaded] = React.useState<boolean>(false);
  const [hasUser, setHasUser] = React.useState<boolean>(false);

  const handleInitialRender = () => {
    (async () => {
      await FirebaseClientAuth.authStateReady();
      setHasAuthLoaded(true);
    })();
  };
  React.useEffect(handleInitialRender, []);

  const handleFirebaseAuthChanges = () => {
    const unsubscribe = onFirebaseAuthStateChanged((firebaseUser) => {
      const hasUser = Boolean(FirebaseClientAuth.currentUser);
      setHasUser(hasUser);
    });

    return () => unsubscribe();
  };
  React.useEffect(handleFirebaseAuthChanges);

  return (
    <Container>
      <Paper elevation={1} sx={{ borderRadius: "12px", height: "85vh", padding: "1rem" }}>
        {hasAuthLoaded && hasUser && <ConstituentContactsDataGrid />}
        {!hasUser && (
          <Box display="flex" height="100%" alignItems="center" justifyContent="center">
            <Typography variant="h3" color="grey">
              Please Login
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
