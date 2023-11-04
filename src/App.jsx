import MoviesList from "./features/movies/MoviesList";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import MovieInfo from "./features/movies/MovieInfo";

function App() {
  return (
    <>
      <h1>Hello</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MoviesList />} />
          <Route path=":id" element={<MovieInfo />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
