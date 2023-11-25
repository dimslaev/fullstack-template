import { Sheet, Typography } from "@mui/joy";

export const AuthFormBox = ({
  title,
  children,
  ...rest
}: React.ComponentProps<typeof Sheet> & { title: string }) => {
  return (
    <Sheet
      sx={{
        width: "100%",
        maxWidth: 360,
        mx: "auto",
        my: [4, 4, 8],
        py: 4,
        px: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
      variant="outlined"
    >
      <Typography level="h3" textAlign="center" mb={2}>
        {title}
      </Typography>

      {children}
    </Sheet>
  );
};
