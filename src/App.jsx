import { useDiscoverMoviesQuery } from "./features/movies/moviesSlice";

function App() {
  const { data, isLoading, isSuccess, isError, error } =
    useDiscoverMoviesQuery();
  console.log(data);
  return (
    <>
      <h1>Hello</h1>
    </>
  );
}

export default App;
