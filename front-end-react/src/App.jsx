import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Authors from "./components/Authors/Authors";
import Layout from "./pages/Layout/Layout";
import Home from "./components/HomeContainer/Home";
import Articles from "./components/Articles/Articles";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="authors" element={<Authors />} />
          <Route path="articles" element={<Articles />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
