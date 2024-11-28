import { RouterProvider } from "react-router-dom";
import { router } from "../src/routes/router"; // Supondo que você tenha exportado o router de outro arquivo

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
