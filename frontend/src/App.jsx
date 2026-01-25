import {
  SignInButton,
  SignOutButton,
  SignedOut,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";

import { Routes, Route } from "react-router";

import HomePage from "./pages/HomePage";

function App() {
  return (
      <>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
     <Toaster toastOptions={{duration:3000}} />
      </>
  );
}

export default App;
