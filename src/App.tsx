import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import { Home } from "./pages/Home";
import { Write } from "./pages/Write";
import { View } from "./pages/View";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/write",
    element: <Write />,
  },
  {
    path: "/view",
    element: <View />,
  },
]);

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ChakraProvider resetCSS theme={theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
};
