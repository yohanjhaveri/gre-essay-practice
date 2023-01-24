import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { CompletedEssay } from "../components/CompletedEssay";
import { useDevice } from "../hooks/useDevice";
import { useTheme } from "../hooks/useTheme";
import { RootState } from "../redux/store";
import { actions } from "../redux/reducer";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isDesktop } = useDevice();
  const { bgColor, grayColor, blueColor } = useTheme();
  const { essays, active, select } = useSelector((state: RootState) => state);

  const completedEssays = essays.filter((essay) => essay.submitTime);
  const remainingEssays = essays.filter((essay) => !essay.submitTime);

  useEffect(() => {
    if (select) {
      dispatch(actions.unselect());
    }

    if (active?.id) {
      navigate("/write");
    }
  }, [active]);

  const onClickWrite = (type: "issue" | "argument") => {
    const essayByType = remainingEssays.filter((essay) => essay.type === type);
    const randomIndex = Math.floor(Math.random() * essayByType.length);
    const randomEssay = essayByType[randomIndex];

    dispatch(actions.start(randomEssay.id));
    navigate("/write");
  };

  const onClickView = (essayId: string) => {
    dispatch(actions.select(essayId));
    navigate("/view");
  };

  return (
    <Flex
      width={isDesktop ? "1000px" : "100%"}
      minHeight="100vh"
      padding="30px"
      flexDirection="column"
    >
      <Grid>
        <Heading size="lg" fontSize="22px">
          GRE Essay Practice
        </Heading>
        <Text paddingTop="6px" color={grayColor} fontSize="18px">
          This is a free tool to practice the issue and argument essays in the
          analytical writing section of the GRE test
        </Text>
      </Grid>
      <Grid width="100%" paddingY="30px" gap="20px">
        <Flex
          justifyContent={isDesktop ? "space-between" : "center"}
          alignItems={isDesktop ? "center" : "flex-start"}
          flexDirection={isDesktop ? "row" : "column"}
          gap={isDesktop ? "0" : "10px"}
        >
          <Heading size="md">Completed Essays</Heading>
          <Flex gap="10px">
            <Button
              size={isDesktop ? "sm" : "xs"}
              colorScheme="blue"
              onClick={() => onClickWrite("issue")}
            >
              Attempt Issue Essay
            </Button>
            <Button
              size={isDesktop ? "sm" : "xs"}
              colorScheme="blue"
              onClick={() => onClickWrite("argument")}
            >
              Attempt Argument Essay
            </Button>
          </Flex>
        </Flex>
        {completedEssays.length ? (
          <Grid gap="20px" templateColumns={isDesktop ? "1fr 1fr" : "1fr"}>
            {completedEssays.map((essay) => (
              <Box
                key={essay.id}
                cursor="pointer"
                onClick={() => onClickView(essay.id)}
              >
                <CompletedEssay
                  id={essay.id}
                  prompt={essay.prompt}
                  answer={essay.answer || ""}
                  startTime={essay.startTime || 0}
                />
              </Box>
            ))}
          </Grid>
        ) : (
          <Flex
            color={grayColor}
            bg={bgColor}
            textAlign="center"
            borderRadius="5px"
            justifyContent="center"
            alignItems="center"
            w="100%"
            h="400px"
            p="50px"
          >
            <Text>
              Once you complete essays, you will see them populate here
            </Text>
          </Flex>
        )}
      </Grid>
      <Text
        position="relative"
        marginTop="auto"
        fontSize="16px"
        fontWeight="500"
      >
        Built with{" "}
        <Icon
          as={FaHeart}
          position="relative"
          marginX="2px"
          top="2px"
          color={blueColor}
          fontSize="14px"
        />{" "}
        by{" "}
        <a href="https://yohanjhaveri.com" target="_blank" rel="noreferrer">
          <ChakraLink color={blueColor} fontWeight="600">
            Yohan Jhaveri
          </ChakraLink>
        </a>
      </Text>
    </Flex>
  );
};
