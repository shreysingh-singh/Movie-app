import CardField from "../components/Card";
import Loader from "../components/Lodder";
import SearchBar from "../components/searchBar";
import { MOVIE_API_KEY } from "../config/config"
import { useEffect, useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";


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
        console.log(response);

        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError(data.Error);
        }

        console.log(data.Search);
      } catch (error) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    
    
    
    
      useEffect(() => {
        searchMovie("Batman")
      }, [])
    return (
      <div className="h-screen w-screen">
        <Scrollbar style={{ width: "100%", height: "100%" }}>
          <SearchBar onSearch={searchMovie} />
          {error && <p>{error}</p>}
          {loading ? (
            <Loader />
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              {movies.map((movie) => (
                <CardField
                  key={movie.imdbID}
                  Title={movie.Title}
                  Year={movie.Year}
                  imdbID={movie.imdbID}
                  Type={movie.Type}
                  Poster={movie.Poster}
                />
              ))}
            </div>
          )}
        </Scrollbar>
      </div>
    );

  }