import Header from "../componants/homepage/Header";
import CinemaList from "../componants/homepage/CinemaList";
import MovieList from "../componants/homepage/MovieList";
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";

function HomePage() {
  return (
    <>
      <div
        className="box-border p-0 m-0"
        style={{ fontFamily: "Roboto Condensed" }}
      >
        <Navbar />
        <Header />
        <MovieList />
        <CinemaList />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
