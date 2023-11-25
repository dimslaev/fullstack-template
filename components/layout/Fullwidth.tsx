import { Box } from "@mui/joy";

export const Fullwidth = (props: React.ComponentProps<typeof Box>) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
      }}
      {...props}
    />
  );
};
