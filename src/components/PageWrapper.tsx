import { useContext } from "react";
import { Flex } from "@chakra-ui/react";
import { Context, ContextValue } from "../context/Context";

export type PageProps = {
  context: ContextValue;
};

type PageWrapperProps = {
  page: React.FC<PageProps>;
};

export const PageWrapper = (props: PageWrapperProps) => {
  const context = useContext(Context);

  const Page = props.page;

  return context ? (
    <Flex
      width={{ base: "full", xl: "container.lg" }}
      minHeight="100dvh"
      padding="8"
    >
      <Page context={context} />
    </Flex>
  ) : (
    <div>Loading...</div>
  );
};
