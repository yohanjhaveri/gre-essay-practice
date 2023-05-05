import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { Provider } from "./context/Context";
import { PageWrapper } from "./components/PageWrapper";

import { Home } from "./pages/Home/Home";
import { Write } from "./pages/Write/Write";
import { View } from "./pages/View/View";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageWrapper page={Home} />,
  },
  {
    path: "/write",
    element: <PageWrapper page={Write} />,
  },
  {
    path: "/view",
    element: <PageWrapper page={View} />,
  },
]);

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export const App = () => (
  <Provider>
    <ChakraProvider resetCSS theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </Provider>
);
