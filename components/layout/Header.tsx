import { Box } from "@mui/joy";

export const Header = (props: React.ComponentProps<typeof Box>) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: [56, 64, 72],
        px: 2,
        borderBottom: "1px solid",
        borderColor: (theme) => theme.palette.divider,
      }}
      {...props}
    />
  );
};
