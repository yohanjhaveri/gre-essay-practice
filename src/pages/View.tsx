import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Text, Link as ChakraLink } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { EmptyResponse } from "../components/EmptyResponse";
import { useTheme } from "../hooks/useTheme";
import { RootState } from "../redux/store";

export const View = () => {
  const navigate = useNavigate();

  const { bgColor, grayColor, blueColor } = useTheme();
  const { essays, select } = useSelector((state: RootState) => state);

  const selectedEssay = essays.find((essay) => essay.id === select);

  useEffect(() => {
    if (!select) {
      navigate("/");
    }
  }, []);

  return (
    <Grid width={{ base: "100%", xl: "1000px" }} padding="30px">
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
