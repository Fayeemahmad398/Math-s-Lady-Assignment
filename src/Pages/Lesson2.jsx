import React, { useState } from "react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { dataOfLesson2 } from "../Utils/store";
import { toast } from "react-toastify";
import celebration from "../assets/tones/Congratulations.mp3";
import sorrow from "../assets/tones/negative tone.mp3";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Lesson2() {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [answeredByStudent, setAnsweredByStudent] = useState("");
  const lesson2InLocal = JSON.parse(localStorage.getItem("lesson2"));

  const [lesson2, setlesson2] = useState(lesson2InLocal || [...dataOfLesson2]);

  // Function to check,Answered by student is correct or not
  function handleCheckAnswer(obj) {
    if (isSubmitted) {
      toast.success("You  have submitted the test ");
      return;
    }
    if (!answeredByStudent) {
      toast.error("Enter the Answer Please");
      return;
    }

    if (obj.noOfAttempts > 0 && obj.natureOfAttempt != "correct") {
      if (obj.answer == answeredByStudent) {
        playPositiveTone();
      } else {
        playNegativeTone();
      }

      let lesson2Data = getDataFromLocal();

      let newData = lesson2Data.map((ques) => {
        if (obj.qid == ques.qid) {
          return {
            ...ques,
            natureOfAttempt:
              ques.answer == answeredByStudent ? "correct" : "inCorrect",
            noOfAttempts: ques.noOfAttempts - 1,
            answeredByStudent: answeredByStudent,
          };
        }
        return { ...ques };
      });

      setDataToLocal(newData);
      setAnsweredByStudent("");
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
    setlesson2(JSON.parse(localStorage.getItem("lesson2")) || lesson2);
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
  function setDataToLocal(updateData) {
    localStorage.setItem("lesson2", JSON.stringify(updateData));
  }
  function getDataFromLocal() {
    return JSON.parse(localStorage.getItem("lesson2")) || lesson2;
  }

  function handleOptions(e) {
    setAnsweredByStudent(e.target.value);
  }

  function handleSubmitQuiz() {
    let lesson2Data = getDataFromLocal();

    let updateData = lesson2Data.map((obj) => {
      return {
        ...obj,
        isFlag: false,
        isVisited: false,
      };
    });
    setDataToLocal(updateData);

    setIsSubmitted(true);
    setCurrentQuiz(0);
    toast.success("Check your answers as a feedback !");

    localStorage.removeItem("lesson2");
  }

  function startExerciseAgain() {
    let data = lesson2.map((obj) => {
      return {
        ...obj,
        isVisited: false,
        isFlag: false,
        noOfAttempts: 7,
        natureOfAttempt: "",
        answeredByStudent: "",
      };
    });

    setlesson2([...data]);
    setCurrentQuiz(0);
    setAnsweredByStudent("");
    setIsSubmitted(false);
  }
  return (
    <div className="big-box">
      <h2>Questions Type:Single Choice</h2>

      <div className="container-questions">
        {lesson2.length > 0 &&
          lesson2.map((obj) => {
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
                      <div className="SingleChoice">
                        <div className="allOptions">
                          {obj.Options.length &&
                            obj.Options.map((city) => (
                              <div className="eachRad">
                                <input
                                  type="radio"
                                  name="selectone"
                                  value={city}
                                  onChange={(e) => {
                                    handleOptions(e);
                                  }}
                                />
                                <strong>{city}</strong>
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
                    Note: You provided answer is:{obj.answeredByStudent}. That
                    is not correct.
                  </div>
                )}
                {obj.natureOfAttempt == "correct" && (
                  <div className={`feedback correctAns`}>
                    <CheckCircleOutlineOutlinedIcon />
                    Answer Provided by you is {obj.answeredByStudent}.That is
                    Correct
                  </div>
                )}
                {isSubmitted && (
                <div className="correctAnsWas">
                  <InfoOutlinedIcon />
                  <p>Correct answer was:{obj.answer}</p>
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
          disabled={currentQuiz == dataOfLesson2.length - 1}
        >
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>
    </div>
  );
}

export default Lesson2;
