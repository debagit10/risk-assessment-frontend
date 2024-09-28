import React from "react";
import "./App.css";
import UploadPage from "./pages/UploadPage";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ViewSummary from "./pages/ViewSummary";
import Sheets from "./pages/Sheets";
import Test from "./pages/Test";

const App = () => {
  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/test" Component={Test} />
      <Route path="/signup" Component={Signup} />
      <Route path="/upload" Component={UploadPage} />
      <Route path="/:id/summary" Component={ViewSummary} />
      <Route path="/:id/sheets" Component={Sheets} />
    </Routes>
  );
};

export default App;
