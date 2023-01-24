import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Text, Link as ChakraLink } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useTheme } from "../hooks/useTheme";
import { useDevice } from "../hooks/useDevice";
import { RootState } from "../redux/store";
import { EmptyResponse } from "../components/EmptyResponse";

export const View = () => {
  const navigate = useNavigate();

  const { isDesktop } = useDevice();
  const { bgColor, grayColor, blueColor } = useTheme();
  const { essays, select } = useSelector((state: RootState) => state);

  const selectedEssay = essays.find((essay) => essay.id === select);

  useEffect(() => {
    if (!select) {
      navigate("/");
    }
  }, []);

  return (
    <Grid width={isDesktop ? "1000px" : "100%"} padding="30px">
      <Link to="/">
        <ChakraLink
          display="flex"
          alignItems="center"
          color={blueColor}
          gap="5px"
        >
          <ArrowBackIcon />
          <Text>Back home</Text>
        </ChakraLink>
      </Link>
      <Text
        fontWeight="600"
        whiteSpace="pre-wrap"
        marginTop="30px"
        marginBottom="5px"
      >
        {selectedEssay?.prompt}
      </Text>
      <Text color={grayColor} marginBottom="30px">
        {selectedEssay?.instructions}
      </Text>
      <Text
        padding="50px"
        marginBottom="30px"
        borderRadius="5px"
        background={bgColor}
        whiteSpace="pre-wrap"
      >
        {selectedEssay?.answer || <EmptyResponse />}
      </Text>
    </Grid>
  );
};
