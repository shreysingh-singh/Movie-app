import CardField from "../components/Card";
import Loader from "../components/Lodder";
import SearchBar from "../components/searchBar";
import { MOVIE_API_KEY } from "../config/config"
import { useEffect, useState } from "react";


interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
}

const movie = 
  {
    "Title": "Batman Begins",
    "Year": "2005",
    "imdbID": "tt0372784",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMzA2NDQzZDEtNDU5Ni00YTlkLTg2OWEtYmQwM2Y1YTBjMjFjXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg"
}


export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");




    const searchMovie = async (title: string) => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${MOVIE_API_KEY}&s=${title}`);
        const data = await response.json();

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
      <>
        <SearchBar />
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
      </>
    );
}