import React, { useState } from "react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { dataOfLesson4 } from "../Utils/store";
import { toast } from "react-toastify";
import celebration from "../assets/tones/Congratulations.mp3";
import sorrow from "../assets/tones/negative tone.mp3";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Lesson4() {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragStartedIndex, setDragStartedIndex] = useState(undefined);
  const [dragOverIndex, setDragOverIndex] = useState(undefined);

  const lesson4InLocal = JSON.parse(localStorage.getItem("lesson4"));

  const [lesson4, setlesson4] = useState(lesson4InLocal || [...dataOfLesson4]);

  function getDataFromLocal() {
    return JSON.parse(localStorage.getItem("lesson4")) || lesson4;
  }
  function setDataToLocal(data) {
    localStorage.setItem("lesson4", JSON.stringify(data));
  }

  function handleCheckAnswer(obj) {
    if (isSubmitted) {
      toast.success("You  have submitted the test ");
      return;
    }

    if (obj.noOfAttempts > 0 && obj.natureOfAttempt != "correct") {
      let lesson4Data = getDataFromLocal();

      let newData = lesson4Data.map((ques) => {
        if (ques.qid == obj.qid) {
          let optionsOrder = ques.Options.join("");
          let answerOrder = ques.answer.join("");

          if (optionsOrder == answerOrder) {
            ques.natureOfAttempt = "correct";
            playPositiveTone();
          } else {
            ques.natureOfAttempt = "inCorrect";
            playNegativeTone();
          }
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
    setlesson4(JSON.parse(localStorage.getItem("lesson4")) || lesson4);
  }

  function handleBookMark(obj) {
    let lesson4Data = JSON.parse(localStorage.getItem("lesson4")) || lesson4;

    lesson4Data.map((ques) => {
      if (ques.qid == obj.qid) {
        if (ques.isFlag == true) {
          ques.isFlag = false;
        } else {
          ques.isFlag = true;
        }
      }
    });
    localStorage.setItem("lesson4", JSON.stringify(lesson4Data));

    setDataFromLocal();
  }

  function handlePrev() {
    if (currentQuiz == 0) {
      return;
    }
    let lesson4Data = JSON.parse(localStorage.getItem("lesson4")) || lesson4;
    let currentIndex = currentQuiz - 1;

    if (!isSubmitted) {
      while (currentIndex >= 0) {
        if (lesson4Data[currentIndex].isFlag == true) {
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
    let lesson4Data = JSON.parse(localStorage.getItem("lesson4")) || lesson4;

    if (!isSubmitted) {
      lesson4Data[currentQuiz].isVisited = true;
    }
    localStorage.setItem("lesson4", JSON.stringify(lesson4Data));

    let currentIndex = currentQuiz + 1;
    while (currentIndex <= lesson4Data.length - 1) {
      if (
        lesson4Data[currentIndex].isFlag == true ||
        lesson4Data[currentIndex].isVisited == false
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

    localStorage.removeItem("lesson4");
  }

  function startExerciseAgain() {
    let data = dataOfLesson4.map((obj) => {
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
        let orderOfOptions = ques.Options;

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
      <h2>Questions Type:Sorting</h2>

      <div className="container-questions">
        {lesson4.length > 0 &&
          lesson4.map((obj) => {
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
                        <div className="allOptions-sorting">
                          {obj.Options.length &&
                            obj.Options.map((option, index) => (
                              <div
                                className="eachoption-sort"
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
                                <span>{option}</span>
                                <span>:</span>
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
                {obj.natureOfAttempt == "inCorrect" && (
                  <div className="feedback inCorrectAns">
                    <InfoOutlinedIcon />
                    Note: You provided answer is:{obj.answer.join(",")}. That is
                    not correct.
                  </div>
                )}

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
                    Answer
                    {obj.answer.join(",")}.That is Correct
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
          disabled={currentQuiz == dataOfLesson4.length - 1}
        >
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>
    </div>
  );
}

export default Lesson4;
