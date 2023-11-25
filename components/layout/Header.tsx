import { Box } from "@mui/joy";

export const Header = (props: React.ComponentProps<typeof Box>) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        py: 2,
        px: 2,
        borderBottom: "1px solid",
        borderColor: (theme) => theme.palette.divider,
      }}
      {...props}
    />
  );
};
