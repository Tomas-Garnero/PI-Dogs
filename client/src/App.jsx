import './App.css';
import { Route, Routes } from "react-router-dom";
import LandinPage from "./components/LandingPage/LandingPage.jsx";
import DogDetail from "./components/DogDetail/DogDetail.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import DogCreate from "./components/DogCreate/DogCreate.jsx";

function App() {
  return (
    <div className="App">
      <div id='portal'/>
      <Routes>
        <Route path="/" element={<LandinPage />}/>
        <Route exact path="/home" element={<HomePage />}/>
        <Route exact path="/home/:id" element={<DogDetail />}/>
        <Route exact path="/home/createdog" element={<DogCreate />}/>
        <Route path="*" element={
            <main>
              <p>No se encontro la ruta buscada</p>
            </main>
            }
        />
      </Routes>
    </div>
  );
}

export default App;