import Header from "../componants/homepage/Header";
import CinemaList from "../componants/homepage/CinemaList";
import MovieList from "../componants/homepage/MovieList";

function HomePage() {
  return (
    <>
      <div
        className="box-border p-0 m-0 "
        style={{ fontFamily: "Roboto Condensed" }}
      >
        <Header />
        <MovieList />
        <CinemaList />
      </div>
    </>
  );
}

export default HomePage;
