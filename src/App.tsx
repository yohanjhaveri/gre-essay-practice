import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "./context/Context";
import { Main } from "./Main";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export const App = () => (
  <Provider>
    <ChakraProvider resetCSS theme={theme}>
      <Main />
    </ChakraProvider>
  </Provider>
);
