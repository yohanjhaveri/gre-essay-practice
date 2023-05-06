import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/react";

type SearchInputProps = Omit<InputProps, "value" | "onChange"> & {
  hide?: boolean;
  value: string;
  onChange: (v: string) => void;
};

export const SearchInput = ({
  value,
  onChange,
  hide,
  isDisabled,
  ...rest
}: SearchInputProps) => (
  <InputGroup display={hide ? "none" : ""}>
    <InputLeftElement
      pointerEvents="none"
      children={<SearchIcon color={isDisabled ? "gray.700" : "gray.500"} />}
    />
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search"
      borderColor="gray.700"
      _hover={{ borderColor: "gray.500" }}
      _placeholder={{ color: "gray.500" }}
      isDisabled={isDisabled}
      {...rest}
    />
  </InputGroup>
);
