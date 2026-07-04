import Loader from "../components/Lodder";
import SearBar from "../components/searchBar";
import { MOVIE_API_KEY } from "../config/config"
import { useEffect, useState } from "react";


interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");




    const searchMovie = async (title: string) => {
      setLoading(true);
      setError("");
      
      try {
        const response = await fetch(`${MOVIE_API_KEY}&s=${title}`);
        const data = await response.json();

        if(data.response === "True"){
          searchMovie(data.Search);
        }else{
          searchMovie("");
          setError(data.error)
        }

        console.log(data.Search);
      } catch (e) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
        
      }
    
    
      useEffect(() => {
        searchMovie("Batman")
      }, [])
    return (
      <>
        <SearBar />
        {loading && <Loader />}
        {!loading && error && (
          <h3>{error}</h3>
        )};
        {!loading && !error && (
          // <MovieList movies={movies} />
          <h1>hello</h1>
        )}
      </>
    );
}