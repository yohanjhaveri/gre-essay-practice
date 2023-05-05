import { Textarea } from "@chakra-ui/react";

type WriteResponseProps = {
  answer: string;
  onChange: (value: string) => void;
};

export const WriteResponse = (props: WriteResponseProps) => (
  <Textarea
    value={props.answer}
    onChange={(e) => props.onChange(e.target.value)}
    minHeight="sm"
  />
);
