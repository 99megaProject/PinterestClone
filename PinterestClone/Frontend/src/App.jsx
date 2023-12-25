import { useState } from "react";
import {
  BrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Router,
  createBrowserRouter,
} from "react-router-dom";
import {
  Header,
  Home,
  Profile,
  Created,
  Message,
  Notification,
  EditProfile,
  Account,
  Layout,
  Setting,
  Menu
} from "./components/export.comp";
import "./App.css";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/account/login" element={<Account />} />
        <Route path="/account/signup" element={<Account />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/menu" element={<Menu />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
