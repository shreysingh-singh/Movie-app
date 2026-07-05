import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";;
import Autocomplete from "@mui/material/Autocomplete";
import { MOVIE_API_KEY } from "../config/config";
import { FaSearch } from "react-icons/fa";
export default function SearchBar() {

    const [myOptions, setMyOptions] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      if (searchTerm.trim().length < 3) return;

      const timer = setTimeout(() => {
        getDataFromAPI(searchTerm);
      }, 500);

      return () => clearTimeout(timer);
    }, [searchTerm]);

    const getDataFromAPI =  (title: string) => {
      console.log("Options Fetched from API");

      fetch(`${MOVIE_API_KEY}&s=${title}`)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          console.log(res);
          for (var i = 0; i < res.Search.length; i++) {
            const options = res.Search.map((movie: any) => movie.Title);
            setMyOptions(options);
            }
        });

        
        
    };
  return (
    <div
      style={{ marginLeft: "40%", marginTop: "60px" }}
      className="flex flex-col items-center justify-center"
    >
      <h3 className="font-mono text-5xl antialiase font-stretch-100%">
        🎬 MovieVerse
      </h3>
      <Autocomplete
        className="border-none"
        style={{ width: 500 }}
        freeSolo
        autoComplete
        autoHighlight
        options={myOptions}
        renderInput={(params) => (
          <TextField
            className="rounded-xl bg shadow-2xl border-dotted"
            {...params}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            label="Search Movies..."
          />
        )}
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg flex items-center justify-center"
        onClick={() => getDataFromAPI(searchTerm)}
      >
        <FaSearch size={18} />
      </button>
    </div>
  );
}
