import { Box } from "@mui/joy";
import { Fullwidth } from "./Fullwidth";
import { Header } from "./Header";
import { ModeToggle } from "./ModeToggle";

export const Layout = ({
  children,
  ...rest
}: React.ComponentProps<typeof Box>) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
      {...rest}
    >
      <Header justifyContent="flex-end">
        <ModeToggle />
      </Header>
      <Fullwidth>{children}</Fullwidth>
    </Box>
  );
};
