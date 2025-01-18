import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Authors from "./components/Authors/Authors";
import Layout from "./pages/Layout/Layout";
import Home from "./components/HomeContainer/Home";
import Articles from "./components/Articles/Articles";
import ArticleContent from "./components/ArticleContent/ArticleContent";
import Conferences from "./components/Conferences/Conferences";

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
          <Route path="creators" element={<Authors />} />
          <Route path="articles" element={<Articles />} />
          <Route path="conferences" element={<Conferences />} />
          <Route path="articles/:id" element={<ArticleContent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
