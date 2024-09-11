import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { CreateConstituentContacts, NewConstituentContact } from "@/api-client/create-constituent-contact";
import { PageLoaderContext } from "./page-loader.context";
import { confirmUniqueEmailForContact } from "@/api-client/confirm-unique-email-for-contact";
import { Dayjs } from "dayjs";
import { DateField, DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { CsvForContacts } from "@/api-client/export-contacts";

export interface ExportContactsModalProps {
  onCancelled: () => void;
}

export const ExportContactsModal: React.FunctionComponent<ExportContactsModalProps> = (props: ExportContactsModalProps): React.ReactNode => {
  const [beginValue, setBeginValue] = React.useState<Dayjs | null>();
  const handleBeginValueChange = (value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>): void => {
    setBeginValue(value);
  };

  const [endValue, setEndValue] = React.useState<Dayjs | null>();
  const handleEndValueChange = (value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>): void => {
    setEndValue(value);
  };

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onCancelled();
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    await CsvForContacts(beginValue, endValue);
    props.onCancelled();
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Export Contacts</DialogTitle>

      <DialogContent>
        <form>
          <Grid container>
            <Grid size={6}>
              <DateField label="Start Date" variant="standard" value={beginValue} onChange={handleBeginValueChange} sx={{ mr: "10px" }} />
            </Grid>
            <Grid size={6}>
              <DateField label="End Date" variant="standard" value={endValue} onChange={handleEndValueChange} sx={{ ml: "10px" }} />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};
