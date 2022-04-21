import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import CityWeather from "./pages/CityWeather.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/weather/:lot/:lon" element={<CityWeather/>} />
          <Route path="/notfound" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
