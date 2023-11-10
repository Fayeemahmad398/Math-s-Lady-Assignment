import React from "react";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import CombinationsOfLessons from "./Components/CombinationsOfLessons";
import "./style/CombinationsOfLessons.css";
import Lesson1 from "./Pages/Lesson1";
import Lesson2 from "./Pages/Lesson2";
import Lesson3 from "./Pages/Lesson3";
import Lesson4 from "./Pages/Lesson4";
import Lesson5 from "./Pages/Lesson5";
import Lesson6 from "./Pages/Lesson6";
import "./style/navbar.css";
import "./style/common.css";
import "./style/lesson1.css";
import "./style/lesson2.css";
import "./style/lesson3.css";
import "./style/lesson4.css";
import "./style/lesson5.css";
import "./style/lesson6.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<CombinationsOfLessons />} />
        <Route path="/Lesson1" element={<Lesson1 />} />
        <Route path="/Lesson2" element={<Lesson2 />} />
        <Route path="/Lesson3" element={<Lesson3 />} />
        <Route path="/Lesson4" element={<Lesson4 />} />
        <Route path="/Lesson5" element={<Lesson5 />} />
        <Route path="/Lesson6" element={<Lesson6 />} />
      </Routes>
    </div>
  );
}

export default App;
