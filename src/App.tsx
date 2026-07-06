import { useEffect } from 'react'
import './App.css'
import { MOVIE_API_KEY } from './config/config';
import Home from './Pages/Home';
import background from "../src/assets/Movie-app-bg.jpg"


function App() {

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <Home />
      </div>
    </>
  );
}

export default App
