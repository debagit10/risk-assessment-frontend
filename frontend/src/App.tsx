import React from "react";
import "./App.css";
import UploadPage from "./pages/UploadPage";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ViewSummary from "./pages/ViewSummary";
import Sheets from "./pages/Sheets";
import Password from "./pages/auth/Password";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/signup" Component={Signup} />
      <Route path="/recover-password" Component={Password} />
      <Route path="/upload" Component={UploadPage} />
      <Route path="/:id/summary" Component={ViewSummary} />
      <Route path="/:id/sheets" Component={Sheets} />
      <Route path="/:id/settings" Component={Settings} />
    </Routes>
  );
};

export default App;
