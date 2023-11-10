import React, { useState } from "react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { dataOfLesson5 } from "../Utils/store";
import { toast } from "react-toastify";
import celebration from "../assets/tones/Congratulations.mp3";
import sorrow from "../assets/tones/negative tone.mp3";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Lesson5() {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragStartedIndex, setDragStartedIndex] = useState(undefined);
  const [dragOverIndex, setDragOverIndex] = useState(undefined);

  const lesson5InLocal = JSON.parse(localStorage.getItem("lesson5"));

  const [lesson5, setlesson5] = useState(lesson5InLocal || [...dataOfLesson5]);

  function getDataFromLocal() {
    return JSON.parse(localStorage.getItem("lesson5")) || lesson5;
  }
  function setDataToLocal(data) {
    localStorage.setItem("lesson5", JSON.stringify(data));
  }

  function handleCheckAnswer(obj) {
    if (isSubmitted) {
      toast.success("You  have submitted the test ");
      return;
    }

    if (obj.noOfAttempts > 0 && obj.natureOfAttempt != "correct") {
      let lesson5Data = getDataFromLocal();
      let newData = lesson5Data.map((ques) => {
        if (ques.qid == obj.qid) {
          let optionsOrder = ques.fixedOptions.join("");

          let answerOrder = ques.DragabbleOptions;

          let ans = answerOrder.map((obj) => {
            return obj.type;
          });

          if (optionsOrder == ans.join("")) {
            ques.natureOfAttempt = "correct";
            playPositiveTone();
          } else {
            ques.natureOfAttempt = "inCorrect";
            playNegativeTone();
          }
          return {
            ...ques,
            answeredByStudent: ans,
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
    setlesson5(JSON.parse(localStorage.getItem("lesson5")) || lesson5);
  }

  function handleBookMark(obj) {
    let lesson5Data = JSON.parse(localStorage.getItem("lesson5")) || lesson5;

    lesson5Data.map((ques) => {
      if (ques.qid == obj.qid) {
        if (ques.isFlag == true) {
          ques.isFlag = false;
        } else {
          ques.isFlag = true;
        }
      }
    });
    localStorage.setItem("lesson5", JSON.stringify(lesson5Data));

    setDataFromLocal();
  }

  function handlePrev() {
    if (currentQuiz == 0) {
      return;
    }
    let lesson5Data = JSON.parse(localStorage.getItem("lesson5")) || lesson5;
    let currentIndex = currentQuiz - 1;

    if (!isSubmitted) {
      while (currentIndex >= 0) {
        if (lesson5Data[currentIndex].isFlag == true) {
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
    let lesson5Data = JSON.parse(localStorage.getItem("lesson5")) || lesson5;

    if (!isSubmitted) {
      lesson5Data[currentQuiz].isVisited = true;
    }
    localStorage.setItem("lesson5", JSON.stringify(lesson5Data));

    let currentIndex = currentQuiz + 1;
    while (currentIndex <= lesson5Data.length - 1) {
      if (
        lesson5Data[currentIndex].isFlag == true ||
        lesson5Data[currentIndex].isVisited == false
      ) {
        setCurrentQuiz(currentIndex);
        setDataFromLocal();
        break;
      }
      currentIndex++;
    }
  }

  function handleSubmitQuiz() {
    setIsSubmitted(true);
    setCurrentQuiz(0);
    toast.success("Check your answers as a feedback !");

    localStorage.removeItem("lesson5");
  }

  function startExerciseAgain() {
    let data = dataOfLesson5.map((obj) => {
      return {
        ...obj,
        isVisited: false,
        isFlag: false,
        noOfAttempts: 7,
        natureOfAttempt: "",
      };
    });
    setDataToLocal(data);
    setCurrentQuiz(0);
    setDataFromLocal();
    setIsSubmitted(false);
  }

  function handleDragStart(e, ind) {
    setDragStartedIndex(ind);
  }

  function handleDragOver(ind) {
    setDragOverIndex(ind);
  }

  function handleDrop(obj) {
    const data = getDataFromLocal();

    let updatedArr = data.map((ques) => {
      if (ques.qid == obj.qid) {
        let orderOfOptions = ques.DragabbleOptions;

        let [draggedItem] = orderOfOptions.splice(dragStartedIndex, 1);

        orderOfOptions.splice(dragOverIndex, 0, draggedItem);
        return { ...ques };
      }

      return { ...ques };
    });
    setDataToLocal(updatedArr);
    setDataFromLocal();
  }

  return (
    <div className="big-box">
      <h2>Questions Type:Single Choice</h2>

      <div className="container-questions">
        {lesson5.length > 0 &&
          lesson5.map((obj) => {
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
                      <div className="sortingType">
                        <div className="allOptions-mutliSort">
                          {obj.fixedOptions.length &&
                            obj.fixedOptions.map((option, index) => (
                              <div className="eachoption-multi-sort">
                                <div className="right-order">
                                  <strong>{option}</strong>
                                </div>
                                <div
                                  draggable
                                  onDragStart={(e) => {
                                    handleDragStart(e, index);
                                  }}
                                  onDragOver={(e) => {
                                    e.preventDefault();
                                    handleDragOver(index);
                                  }}
                                  onDrop={(e) => {
                                    handleDrop(obj);
                                  }}
                                >
                                  <img
                                    src={obj.DragabbleOptions[index].img}
                                    alt=""
                                  />
                                </div>
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
                {obj.natureOfAttempt == "correct" && (
                  <div className={`feedback correctAns`}>
                    <CheckCircleOutlineOutlinedIcon />
                 Your Answer{" "}
                    {obj.answeredByStudent.join(",")}.That is Correct
                  </div>
                )}
                {obj.natureOfAttempt == "inCorrect" && (
                  <div className="feedback inCorrectAns">
                    <InfoOutlinedIcon />
                    Note: You provided answer is:
                    {obj.answeredByStudent.join(",")}. That is not correct.
                  </div>
                )}
                {isSubmitted && (
                  <div className="correctAnsWas">
                    <InfoOutlinedIcon />
                    <p>Correct answer was:{obj.fixedOptions.join(",")}</p>
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
          disabled={currentQuiz == dataOfLesson5.length - 1}
        >
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>
    </div>
  );
}

export default Lesson5;
