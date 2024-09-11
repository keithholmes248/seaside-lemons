import { CircularProgress, CircularProgressProps, Grid2 as Grid, Modal, Typography } from "@mui/material";
import React from "react";

export interface CircularProgressWithText extends CircularProgressProps {
  text?: string;
  fullscreen?: boolean;
}

export function CircularProgressWithText(props: CircularProgressWithText): React.ReactElement {
  const hasText = props.text !== undefined && props.text !== null && props.text !== "";

  const spinner = (
    <Grid container spacing={3} display="flex" alignContent="center" justifyContent="center" className="loader-overlay">
      {hasText && (
        <Grid size={12}>
          <Typography variant="h5" align="center">
            {props.text}
          </Typography>
        </Grid>
      )}

      <Grid display="flex" alignContent="center" justifyContent="center" size={12}>
        <CircularProgress color="info" />
      </Grid>
    </Grid>
  );

  if (props.fullscreen) {
    return <Modal open={true}>{spinner}</Modal>;
  } else {
    return spinner;
  }
}

export default CircularProgressWithText;
