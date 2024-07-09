import "./App.css";
import "@fontsource/roboto";
import RegisterPage from "./pages/RegisterPage";
import RegisterPageSuccess from "./pages/RegisterPageSuccess";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/success" element={<RegisterPageSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
