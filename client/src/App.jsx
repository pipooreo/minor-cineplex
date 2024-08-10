import "./App.css";
import "@fontsource/roboto";
import { useNavigate } from "react-router-dom";
import jwtInterceptor from "./utils/jwtInterceptor";
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
import CinemaPage from "./pages/CinemaPage";
import SearchResultPage from "./pages/SearchResultPage";
import SeatSelectorPage from "./pages/SeatSelectorPage";
import { SearchProvider } from "./contexts/SearchContext";
import UserProfilePage from "./pages/UserProfilePage";
import { ScrollToTop } from "./componants/ScrollToTop";
import StripeTest from "./pages/StripeTestPage";
// import TestPaymentPage from "./pages/TestPaymentPage";
import PaymentPageSuccess from "./pages/PaymentPageSuccess";
import StripeQr from "./pages/StripeQrCode";
// import StripeQrResult from "./pages/StripeQrResult";
import RefundPageSuccess from "./pages/RefundPageSuccess";
import { useEffect } from "react";

function App() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    jwtInterceptor(navigate);
  }, [navigate]);
  return (
    <>
      <SearchProvider>
        <ScrollToTop>
          {auth.isAuthenticated ? <NavbarUser /> : <Navbar />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/registersuccess" element={<RegisterPageSuccess />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/resetpassword" element={<ResetPassword />} />

            <Route path="/movie/:title" element={<MoviePage />} />
            <Route path="/bookticket/:title" element={<BookTicketPage />} />
            <Route path="/cinema/:title" element={<CinemaPage />} />
            <Route path="/moviesearch" element={<SearchResultPage />} />
            <Route
              path="/seat/:title/:cinema/:date/:hall/:time"
              element={<SeatSelectorPage />}
            />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route
              path="/payment/:title/:cinema/:date/:hall/:time"
              element={<StripeTest />}
            />
            <Route path="/payment/qr" element={<StripeQr />} />
            <Route
              path="/paymentsuccess/:title/:cinema/:date/:hall/:time"
              element={<PaymentPageSuccess />}
            />
            <Route
              path="/refund/success/:price"
              element={<RefundPageSuccess />}
            />
            {/* <Route path="/payment/QrResult" element={<StripeQrResult />} /> */}
          </Routes>
          <Footer />
        </ScrollToTop>
      </SearchProvider>
    </>
  );
}

export default App;
