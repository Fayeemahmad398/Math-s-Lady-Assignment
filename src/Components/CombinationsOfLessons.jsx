import React from "react";
import img from "../assets/mathlady.jpg";
import { useNavigate } from "react-router-dom";
import pencil from "../assets/pencil-big.png";

function CombinationsOfLessons() {
  const navigate = useNavigate();
  return (
    <div className="classes-box">
      <h2>Math's exercises by Math's lady </h2>
      <div className="CombinationsOfLessons">
        <div className="img-box">
          <img src={img} alt="" />
        </div>
        <div className="all-pencils">
          <div
            className="pencil-box"
            onClick={() => {
              navigate("/lesson1");
            }}
          >
            <div className="penc-img-box">
              <img src={pencil} alt="" />
            </div>
            <strong className="float-lesson">Exercise 1</strong>
          </div>
          <div
            className="pencil-box"
            onClick={() => {
              navigate("/lesson2");
            }}
          >
            <div className="penc-img-box">
              <img src={pencil} alt="" />
            </div>
            <strong className="float-lesson">Exercise 2</strong>
          </div>{" "}
          <div
            className="pencil-box"
            onClick={() => {
              navigate("/lesson3");
            }}
          >
            <div className="penc-img-box">
              <img src={pencil} alt="" />
            </div>

            <strong className="float-lesson">Exercise 3</strong>
          </div>
          <div
            className="pencil-box"
            onClick={() => {
              navigate("/lesson4");
            }}
          >
            <div className="penc-img-box">
              <img src={pencil} alt="" />
            </div>
            <strong className="float-lesson">Exercise 4</strong>
          </div>{" "}
          <div
            className="pencil-box"
            onClick={() => {
              navigate("/lesson5");
            }}
          >
            <div className="penc-img-box">
              <img src={pencil} alt="" />
            </div>
            <strong className="float-lesson">Exercise 5</strong>
          </div>{" "}
          <div
            className="pencil-box"
            onClick={() => {
              navigate("/lesson6");
            }}
          >
            <div className="penc-img-box">
              <img src={pencil} alt="" />
            </div>
            <strong className="float-lesson">Exercise 6</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CombinationsOfLessons;
