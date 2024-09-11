import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { CreateConstituentContacts, NewConstituentContact } from "@/api-client/create-constituent-contact";
import { PageLoaderContext } from "./page-loader.context";
import { confirmUniqueEmailForContact } from "@/api-client/confirm-unique-email-for-contact";

export interface ConstituentContactFormModalProps {
  onCancelled: () => void;
  onSubmitted: () => void;
}

export const ConstituentContactFormModal: React.FunctionComponent<ConstituentContactFormModalProps> = (
  props: ConstituentContactFormModalProps
): React.ReactNode => {
  const pageLoaderContext = React.useContext(PageLoaderContext);

  const [emailValue, setEmailValue] = React.useState<string>("");
  const [emailHasError, setEmailHasError] = React.useState<boolean>(false);
  const [emailErrorText, setEmailErrorText] = React.useState<string>();
  const [isEmailUnique, setIsEmailUnique] = React.useState<boolean>();
  const emailIsEmpty = !emailValue || emailValue === "";

  const validateEmail = async () => {
    if (emailIsEmpty) {
      setEmailHasError(true);
      setEmailErrorText("Email address is required");
      return;
    }

    const isEmailUnique = await confirmUniqueEmailForContact(emailValue);
    if (isEmailUnique) {
      setEmailHasError(false);
      setIsEmailUnique(true);
      setEmailErrorText(undefined);
    } else {
      setEmailHasError(true);
      setIsEmailUnique(false);
      setEmailErrorText("Email address is already used by another contact");
    }
  };

  const handleEmailChange: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event: React.FocusEvent<HTMLInputElement>): void => {
    setEmailValue(event.target.value);
  };

  const handleEmailBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event: React.FocusEvent<HTMLInputElement>): void => {
    validateEmail();
  };

  const [givenNameValue, setGivenNameValue] = React.useState<string>("");
  const [givenNameHasError, setGivenNameHasError] = React.useState<boolean>(false);
  const [givenNameErrorText, setGivenNameErrorText] = React.useState<string>();
  const givenNameIsEmpty = !givenNameValue || givenNameValue === "";

  const validateGivenName = () => {
    if (givenNameIsEmpty) {
      setGivenNameHasError(true);
      setGivenNameErrorText("Given / first name is required");
    } else {
      setGivenNameHasError(false);
      setGivenNameErrorText(undefined);
    }
  };

  const handleGivenNameChange: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event: React.FocusEvent<HTMLInputElement>): void => {
    setGivenNameValue(event.target.value);
  };

  const handleGivenNameBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event: React.FocusEvent<HTMLInputElement>): void => {
    validateGivenName();
  };

  const [familyNameValue, setFamilyNameValue] = React.useState<string>("");
  const [familyNameHasError, setFamilyNameHasError] = React.useState<boolean>(false);
  const [familyNameErrorText, setFamilyNameErrorText] = React.useState<string>();
  const familyNameIsEmpty = !familyNameValue || familyNameValue === "";

  const validateFamilyName = () => {
    if (familyNameIsEmpty) {
      setFamilyNameHasError(true);
      setFamilyNameErrorText("Family / last name is required");
    } else {
      setFamilyNameHasError(false);
      setFamilyNameErrorText(undefined);
    }
  };

  const handleFamilyNameChange: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event: React.FocusEvent<HTMLInputElement>): void => {
    setFamilyNameValue(event.target.value);
  };

  const handleFamilyNameBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event: React.FocusEvent<HTMLInputElement>): void => {
    validateFamilyName();
  };

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onCancelled();
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    validateEmail();
    validateGivenName();
    validateFamilyName();

    const invalidForm = emailIsEmpty || !isEmailUnique || givenNameIsEmpty || familyNameIsEmpty;

    if (!invalidForm) {
      const newConstituentContact: NewConstituentContact = {
        email: emailValue,
        givenName: givenNameValue,
        familyName: familyNameValue,
      };
      pageLoaderContext.showPageLoader("Creating Contact");
      await CreateConstituentContacts(newConstituentContact);
      pageLoaderContext.hidePageLoader();
      props.onSubmitted();
    }
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Contact</DialogTitle>

      <DialogContent>
        <form>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                id="email-textfield-input"
                variant="standard"
                fullWidth
                label="Email"
                value={emailValue}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                error={emailHasError}
                helperText={emailErrorText}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                id="givenName-textfield-input"
                variant="standard"
                fullWidth
                label="Given / First Name"
                value={givenNameValue}
                onChange={handleGivenNameChange}
                onBlur={handleGivenNameBlur}
                error={givenNameHasError}
                helperText={givenNameErrorText}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                id="familyName-textfield-input"
                variant="standard"
                fullWidth
                label="Family / Last Name"
                value={familyNameValue}
                onChange={handleFamilyNameChange}
                onBlur={handleFamilyNameBlur}
                error={familyNameHasError}
                helperText={familyNameErrorText}
              />
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
