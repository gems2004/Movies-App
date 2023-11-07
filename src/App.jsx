import MoviesList from "./features/movies/MoviesList";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import MovieInfo from "./features/movies/MovieInfo";
import Navbar from "./components/Navbar";
import MorePage from "./pages/MorePage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MoviesList />} />
          <Route path=":id" element={<MovieInfo />} />
          <Route path="/:type/:page" element={<MorePage />} />
          <Route path="/search/:q" element={<SearchPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
