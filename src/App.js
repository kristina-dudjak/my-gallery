import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import MyGallery from "./pages/MyGallery";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
//import Settings from "./pages/Settings";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRouteGuest from "./PrivateRouteGuest";
import PrivateRouteLogged from "./PrivateRouteLogged";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route element={<PrivateRouteLogged />}>
            <Route path="/mygallery" element={<MyGallery />} />
            {/*<Route path="/settings" element={<Settings />} />*/}
          </Route>
          <Route path="/photos/:query" element={<Home />} />
          <Route element={<PrivateRouteGuest />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
