import MoviesList from "./features/movies/MoviesList";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import MovieInfo from "./features/movies/MovieInfo";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/SearchPage";
import DiscoverPage from "./pages/DiscoverPage";
import CategoriesPage from "./pages/CategoriesPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MoviesList />} />
          <Route path="/:type/:id" element={<MovieInfo />} />
          <Route path="/search/:query/:page" element={<SearchPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route
            path="/categories/:type/:id/:page"
            element={<CategoriesPage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
