import { Snackbar } from "@mui/joy";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export const ErrorAlert = ({
  children,
  ...rest
}: React.ComponentProps<typeof Snackbar>) => (
  <Snackbar
    variant="solid"
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    startDecorator={<ErrorOutlineIcon />}
    {...rest}
  >
    {children}
  </Snackbar>
);

export const SuccessAlert = ({
  children,
  ...rest
}: React.ComponentProps<typeof Snackbar>) => (
  <Snackbar
    variant="solid"
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    startDecorator={<CheckCircleOutlineIcon />}
    {...rest}
  >
    {children}
  </Snackbar>
);

export const InfoAlert = ({
  children,
  ...rest
}: React.ComponentProps<typeof Snackbar>) => (
  <Snackbar
    variant="solid"
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    startDecorator={<HelpOutlineIcon />}
    {...rest}
  >
    {children}
  </Snackbar>
);
