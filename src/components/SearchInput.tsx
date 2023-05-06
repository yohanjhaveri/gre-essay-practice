import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/react";

type SearchInputProps = Omit<InputProps, "value" | "onChange"> & {
  value: string;
  onChange: (v: string) => void;
};

export const SearchInput = ({
  value,
  onChange,
  isDisabled,
  ...rest
}: SearchInputProps) => (
  <InputGroup>
    <InputLeftElement
      pointerEvents="none"
      children={<SearchIcon color="gray.500" />}
    />
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search"
      borderColor="gray.700"
      _hover={{ borderColor: "gray.500" }}
      _placeholder={{ color: "gray.500" }}
      {...rest}
    />
  </InputGroup>
);
