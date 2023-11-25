import NextLink from "next/link";
import { Link as JoyLink } from "@mui/joy";

export const Link = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <NextLink href={href} passHref>
      <JoyLink component="span">{children}</JoyLink>
    </NextLink>
  );
};
