import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { ReplacingBooks } from "./components/ReplacingBooks";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/replacing-books",
    element: <ReplacingBooks />,
  },
  {
    path: "/fetch-data",
    element: <FetchData />,
  },
];

export default AppRoutes;
