import { useMediaQuery } from "@chakra-ui/media-query";

export const useDevice = () => {
  const [isMobile] = useMediaQuery("(max-width: 1000px)");

  return {
    isMobile,
    isDesktop: !isMobile,
  };
};
