import "./App.css";
import "@fontsource/roboto";
import RegisterPage from "./pages/RegisterPage";
import RegisterPageSuccess from "./pages/RegisterPageSuccess";
import MoviePage from "./pages/MoviePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./componants/Navbar";
import NavbarUser from "./componants/NavbarUser";
import Footer from "./componants/Footer";
import { useAuth } from "./contexts/authentication";
import ResetPassword from "./pages/ResetPassword";
import BookTicketPage from "./pages/BookTicketPage";
import SearchResultPage from "./pages/SearchResultPage";
import SeatSelectorPage from "./pages/SeatSelectorPage";
import { SearchProvider } from "./contexts/SearchContext";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  const auth = useAuth();
  return (
    <>
      <SearchProvider>
        {auth.isAuthenticated ? <NavbarUser /> : <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/registersuccess" element={<RegisterPageSuccess />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/movie/:title" element={<MoviePage />} />
          <Route path="/bookticket/:title" element={<BookTicketPage />} />
          <Route path="/moviesearch" element={<SearchResultPage />} />
          <Route
            path="/seat/:title/:cinema/:date/:hall/:time"
            element={<SeatSelectorPage />}
          />
          <Route path="/profile" element={<UserProfilePage />} />
        </Routes>
        <Footer />
      </SearchProvider>
    </>
  );
}

export default App;
