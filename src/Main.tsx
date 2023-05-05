import { PageWrapper } from "./components/PageWrapper";
import { Home } from "./pages/Home/Home";
import { View } from "./pages/View/View";
import { Write } from "./pages/Write/Write";

export const Main = () => (
  <PageWrapper
    page={({ context }) => {
      // {
      //   path: "/",
      //   element: <PageWrapper page={Home} />,
      // },
      // {
      //   path: "/write",
      //   element: <PageWrapper page={Write} />,
      // },
      // {
      //   path: "/view",
      //   element: <PageWrapper page={View} />,
      // },

      if (context.active) {
        return <Write context={context} />;
      }

      if (context.select) {
        return <View context={context} />;
      }

      return <Home context={context} />;
    }}
  />
);
