import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ChakraProvider } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import UserSettingsPage from "./pages/UserSettings";
import Video from "./pages/Video";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        
        path: "/settings",
        element: <UserSettingsPage username={''} createdAt={new Date('2024-05-08')}/>,
      },
      {
        index:true,
        element: <Video/>,
      },
      {
        path: "/login",
        element: <Login />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <ChakraProvider>
  <RouterProvider router={router} />
  </ChakraProvider>
</React.StrictMode>,
 
);