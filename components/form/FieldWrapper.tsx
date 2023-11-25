import * as React from "react";
import { FieldError } from "react-hook-form";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";

type Props = Omit<React.ComponentProps<typeof FormControl>, "error"> & {
  label?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  required?: boolean;
  description?: string;
};

export const FieldWrapper = (props: Props) => {
  const { label, error, children, required, ...rest } = props;

  return (
    <FormControl error={!!error} {...rest}>
      <FormLabel required={required}>{label}</FormLabel>
      {children}
      {error?.message && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};
