import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, Grid, Heading, Text, Textarea } from "@chakra-ui/react";
import { CountdownTimer } from "../components/CountdownTimer";
import { useTheme } from "../hooks/useTheme";
import { RootState } from "../redux/store";
import { actions } from "../redux/reducer";
import { getCurrentTimeInSecondsUNIX } from "../utils/datetime";

export const Write = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { grayColor } = useTheme();
  const { essays, active } = useSelector((state: RootState) => state);

  const activeEssay = essays.find((essay) => essay.id === active?.id);

  useEffect(() => {
    // if there is no active essay, redirect back to home
    if (!active?.id) {
      navigate("/");
    }
  }, [active?.id]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(actions.update(e.target.value));
  };

  const onCancel = () => {
    dispatch(actions.cancel());
    navigate("/");
  };

  const onSubmit = () => {
    dispatch(actions.submit(getCurrentTimeInSecondsUNIX()));
    navigate("/");
  };

  const SECONDS_IN_30_MINUTES = 30 * 60;
  const endTime =
    active?.startTime && active?.startTime + SECONDS_IN_30_MINUTES;

  return (
    <Grid width={{ base: "100%", xl: "1000px" }} padding="30px">
      <Heading size="md">Time Remaining</Heading>
      {endTime && <CountdownTimer endTime={endTime} onTimerEnd={() => {}} />}
      <Text
        marginTop="30px"
        marginBottom="5px"
        fontWeight="600"
        whiteSpace="pre-wrap"
      >
        {activeEssay?.prompt}
      </Text>
      <Text color={grayColor} marginBottom="30px">
        {activeEssay?.instructions}
      </Text>
      <Textarea value={active?.answer} onChange={onChange} minHeight="300px" />
      <Flex width="100%" marginTop="20px" justify="flex-end" gap="10px">
        <Button colorScheme="gray" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="blue" onClick={onSubmit}>
          Submit
        </Button>
      </Flex>
    </Grid>
  );
};
