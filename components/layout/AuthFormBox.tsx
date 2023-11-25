import { Box, Typography } from "@mui/joy";

export const AuthFormBox = ({
  title,
  children,
  ...rest
}: React.ComponentProps<typeof Box> & { title: string }) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 420,
        p: {
          xs: 2,
          md: 4,
          lg: 6,
        },
      }}
      {...rest}
    >
      <Typography level="h2" textAlign="center" mb={2}>
        {title}
      </Typography>

      {children}
    </Box>
  );
};
