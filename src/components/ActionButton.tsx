import { Button, ButtonProps } from "@chakra-ui/react";

export const ActionButton = (props: ButtonProps) => (
  <Button size={{ base: "xs", md: "sm" }} {...props} />
);
