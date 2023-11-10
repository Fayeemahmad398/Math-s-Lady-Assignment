import React, { useState } from "react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { dataOfLesson3 } from "../Utils/store";
import { toast } from "react-toastify";
import celebration from "../assets/tones/Congratulations.mp3";
import sorrow from "../assets/tones/negative tone.mp3";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Lesson3() {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const lesson3InLocal = JSON.parse(localStorage.getItem("lesson3"));

  const [lesson3, setlesson3] = useState(lesson3InLocal || [...dataOfLesson3]);

  function getDataFromLocal() {
    return JSON.parse(localStorage.getItem("lesson3")) || lesson3;
  }
  function setDataToLocal(data) {
    localStorage.setItem("lesson3", JSON.stringify(data));
  }

  function unCheckedAllInput(obj) {
    for (let key in obj) {
      obj[key] = false;
    }
    console.log(obj);
  }

  function handleCheckAnswer(obj) {
    if (isSubmitted) {
      toast.success("You  have submitted the test ");
      return;
    }

    if (obj.noOfAttempts > 0 && obj.natureOfAttempt != "correct") {
      let lesson3Data = getDataFromLocal();

      let newData = lesson3Data.map((ques) => {
        if (obj.qid == ques.qid) {
          let mappedAns = obj.optionsSelected;
          let answers = ques.answer;

          let allAnsMatch = true;

          let newArrOfAns = [];
          let ct = 0;

          for (let key in mappedAns) {
            if (mappedAns[key]) {
              if (answers.includes(key)) {
                ct++;
              } else {
                allAnsMatch = false;
              }
              newArrOfAns.push(key);
            }
          }

          if (!allAnsMatch || ct != answers.length) {
            ques.natureOfAttempt = "inCorrect";
            playNegativeTone();
          } else {
            ques.natureOfAttempt = "correct";
            playPositiveTone();
          }

          unCheckedAllInput(ques.optionsSelected);
          return {
            ...ques,
            answeredByStudent: newArrOfAns,
            noOfAttempts: ques.noOfAttempts - 1,
          };
        }
        return { ...ques };
      });
      setDataToLocal(newData);
      setDataFromLocal();
    } else if (obj.natureOfAttempt == "correct") {
      toast("You have already solved it", {
        style: {
          color: "green",
        },
      });
    } else if (obj.noOfAttempts == 0) {
      toast.error("Sorry, You don't have any left attempt ");
    }
  }

  function playPositiveTone() {
    new Audio(celebration).play();
  }
  function playNegativeTone() {
    new Audio(sorrow).play();
  }

  function setDataFromLocal() {
    setlesson3(JSON.parse(localStorage.getItem("lesson3")) || lesson3);
  }

  function handleBookMark(obj) {
    let lesson2Data = getDataFromLocal();
    console.log(lesson2Data);

    let updateData = lesson2Data.map((ques) => {
      if (ques.qid == obj.qid) {
        return { ...ques, isFlag: ques.isFlag == true ? false : true };
      }
      return {
        ...ques,
      };
    });

    setDataToLocal(updateData);
    setDataFromLocal();
  }

  function handlePrev() {
    if (currentQuiz == 0) {
      return;
    }
    let lesson2Data = getDataFromLocal();
    let currentIndex = currentQuiz - 1;

    if (!isSubmitted) {
      while (currentIndex >= 0) {
        if (lesson2Data[currentIndex].isFlag == true) {
          setCurrentQuiz(currentIndex);
          break;
        }
        currentIndex--;
      }
    } else {
      setCurrentQuiz(currentQuiz - 1);
    }
  }

  function handleNext() {
    let lesson2Data = getDataFromLocal();

    if (!isSubmitted) {
      lesson2Data[currentQuiz].isVisited = true;
    }
    localStorage.setItem("lesson2", JSON.stringify(lesson2Data));

    let currentIndex = currentQuiz + 1;
    if (!isSubmitted) {
      while (currentIndex <= lesson2Data.length - 1) {
        if (
          lesson2Data[currentIndex].isFlag == true ||
          lesson2Data[currentIndex].isVisited == false
        ) {
          setCurrentQuiz(currentIndex);
          break;
        }
        currentIndex++;
      }
    } else {
      setCurrentQuiz(currentIndex);
    }
  }

  function handleOptions(e, obj) {
    if (isSubmitted || obj.natureOfAttempt == "correct") {
      return;
    }

    let lesson3Data = getDataFromLocal();

    let newData = lesson3Data.map((ques) => {
      if (ques.qid == obj.qid) {
        if (ques.optionsSelected[e.target.value]) {
          ques.optionsSelected[e.target.value] = false;
        } else {
          ques.optionsSelected[e.target.value] = true;
        }
        return {
          ...ques,
        };
      }
      return ques;
    });
    setDataToLocal(newData);
    setDataFromLocal();
  }

  function handleSubmitQuiz() {
    setIsSubmitted(true);
    setCurrentQuiz(0);
    toast.success("Check your answers as a feedback !");

    localStorage.removeItem("lesson3");
  }

  function startExerciseAgain() {
    let data = lesson3.map((obj) => {
      return {
        ...obj,
        isVisited: false,
        isFlag: false,
        noOfAttempts: 7,
        natureOfAttempt: "",
        answeredByStudent: [],
      };
    });
    localStorage.removeItem("lesson3");
    setDataToLocal(data);
    setCurrentQuiz(0);
    setDataFromLocal();
    setIsSubmitted(false);
  }
  return (
    <div className="big-box">
      <h2>Questions Type:Multiple Choice</h2>

      <div className="container-questions">
        {lesson3.length > 0 &&
          lesson3.map((obj) => {
            return (
              <div
                className="question"
                style={{ transform: `translateX(-${currentQuiz}00%)` }}
              >
                <div className="equation-flag">
                  <h1 className="equation">{obj.question}</h1>
                  <div className="flag">
                    {obj.isFlag == true && (
                      <div>
                        <BookmarkIcon
                          onClick={() => {
                            handleBookMark(obj);
                          }}
                        />
                      </div>
                    )}

                    {obj.isFlag == false && (
                      <div>
                        <BookmarkBorderOutlinedIcon
                          onClick={() => {
                            handleBookMark(obj);
                          }}
                        />
                      </div>
                    )}
                    <strong>flag for later</strong>
                  </div>
                </div>

                <div className="Questions-box">
                  <div>
                    <div className="question-types">
                      <div className="multiChoice">
                        <div className="all-multi-Options">
                          {obj.Options.length &&
                            obj.Options.map((option) => (
                              <div className="eachRad-Multi">
                                <input
                                  checked={obj.optionsSelected[option]}
                                  type="checkbox"
                                  value={option}
                                  onChange={(e) => {
                                    handleOptions(e, obj);
                                  }}
                                />
                                <strong>{option}</strong>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="check-div">
                        <button
                          onClick={() => {
                            handleCheckAnswer(obj);
                          }}
                          className="checkbtn"
                        >
                          check
                        </button>
                        <h3 className="Attempts">
                          {obj.noOfAttempts}:Attempts left
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {console.log(obj.natureOfAttempt)}
                {obj.natureOfAttempt == "" && isSubmitted && (
                  <div className="notAttempt">
                    <div className="info">
                      <InfoOutlinedIcon />
                      You did't attempt this one.
                    </div>
                  </div>
                )}
                {obj.natureOfAttempt == "inCorrect" && (
                  <div className="feedback inCorrectAns">
                    <InfoOutlinedIcon />
                    Note: You provided answer is:
                    {obj.answeredByStudent.join(",")}. That is not correct.
                  </div>
                )}
                {obj.natureOfAttempt == "correct" && (
                  <div className={`feedback correctAns`}>
                    <CheckCircleOutlineOutlinedIcon />
                    Answer {obj.answeredByStudent.join(",")}.That is Correct
                  </div>
                )}
                {isSubmitted && (
                  <div className="correctAnsWas">
                    <InfoOutlinedIcon />
                    <p>Correct answer was:{obj.answer.join(",")}</p>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      <div className="submitPractice">
        <button
          className="floating-btns btn1"
          onClick={handlePrev}
          disabled={currentQuiz == 0}
        >
          <ArrowBackIosIcon />
        </button>
        <button
          className="PracticeAgain"
          onClick={() => {
            startExerciseAgain();
          }}
        >
          Reset
        </button>

        <button className="submitBtn" onClick={handleSubmitQuiz}>
          Submit
        </button>

        <button
          className="floating-btns btn2"
          onClick={handleNext}
          disabled={currentQuiz == dataOfLesson3.length - 1}
        >
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>
    </div>
  );
}

export default Lesson3;
