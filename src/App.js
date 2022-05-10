import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import MyGallery from "./pages/MyGallery";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/mygallery" element={<MyGallery />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
