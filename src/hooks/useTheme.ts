import { useColorModeValue } from "@chakra-ui/color-mode";

export const useTheme = () => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const grayColor = useColorModeValue("gray.500", "gray.400");
  const blueColor = useColorModeValue("blue.500", "blue.400");

  return { bgColor, grayColor, blueColor };
};
