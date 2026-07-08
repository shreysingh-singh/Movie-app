import  { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { MOVIE_API_KEY } from "../config/config";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (title: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [myOptions, setMyOptions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.trim().length < 3) return;

    const timer = setTimeout(() => {
      getDataFromAPI(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const getDataFromAPI = async (title: string) => {
    if (title.trim().length < 3) {
      setMyOptions([]);
      return;
    }

    try {
      const response = await fetch(`${MOVIE_API_KEY}&s=${title}`);
      const res = await response.json();
      console.log(`${MOVIE_API_KEY}&s=${title}`);

      console.log(res);

      if (res.Response === "False") {
        console.error(res.Error);
        setMyOptions([]);
        return;
      }

      const options = res.Search.map((movie: any) => movie.Title);
      setMyOptions(options);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-screen mb-10 mt-3">
      <div
        className="flex
      items-center justify-center"
      >
        <h3 className="font-mono text-5xl antialiase font-stretch-100%">
          🎬 MovieVerse
        </h3>
      </div>
      <div className=" py-0 px-4 ">
        <div className="flex items-center justify-center">
          <Autocomplete
            className="border-none"
            style={{ width: 500 }}
            freeSolo
            autoComplete
            autoHighlight
            options={myOptions}
            renderInput={(params) => (
              <TextField
                className="rounded-xl bg shadow-2xl border-dotted bg-white"
                {...params}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSearch(searchTerm);
                  }
                }}
                variant="outlined"
                label="Search Movies..."
              />
            )}
          />
          <button
            className="bg-blue-600  hover:bg-blue-700 text-white px-5 flex items-center justify-center m-5 p-3 flex-col-reverse  rounded-4xl"
            onClick={() => onSearch(searchTerm)}
          >
            <FaSearch size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
