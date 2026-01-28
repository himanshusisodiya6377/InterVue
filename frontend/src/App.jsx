import { useUser } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";

import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <HomePage />} />

      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;