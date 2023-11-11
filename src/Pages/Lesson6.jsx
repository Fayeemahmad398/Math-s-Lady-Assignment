import React, { useState } from "react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { dataOfLesson6 } from "../Utils/store";
import { toast } from "react-toastify";
import celebration from "../assets/tones/Congratulations.mp3";
import sorrow from "../assets/tones/negative tone.mp3";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
function Lesson6() {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const lesson6InLocal = JSON.parse(localStorage.getItem("lesson6"));

  const [wordsOrder, setWordOrder] = useState(
    lesson6InLocal ? lesson6InLocal[0].wordsOrder : dataOfLesson6[0].wordsOrder
  );

  console.log(wordsOrder);

  const [lesson6, setlesson6] = useState(lesson6InLocal || [...dataOfLesson6]);

  function getDataFromLocal() {
    return JSON.parse(localStorage.getItem("lesson6")) || lesson6;
  }
  function setDataToLocal(data) {
    localStorage.setItem("lesson6", JSON.stringify(data));
  }

  function handleCheckAnswer(obj) {
    if (isSubmitted) {
      toast.success("You  have submitted the test ");
      return;
    }

    if (obj.noOfAttempts > 0 && obj.natureOfAttempt != "correct") {
      let lesson6Data = getDataFromLocal();

      let newData = lesson6Data.map((ques) => {
        if (ques.qid == obj.qid) {
          let values = Object.values(wordsOrder);

          if (ques.answer.join("") != values.join("").toLowerCase()) {
            playNegativeTone();
          } else {
            playPositiveTone();
          }

          return {
            ...ques,
            answeredByStudent: values,
            wordsOrder: { ...wordsOrder },
            noOfAttempts: ques.noOfAttempts - 1,
            natureOfAttempt:
              ques.answer.join("") == values.join("").toLowerCase()
                ? "correct"
                : "inCorrect",
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
    setlesson6(JSON.parse(localStorage.getItem("lesson6")) || lesson6);
  }

  function handleBookMark(obj) {
    let lesson6Data = JSON.parse(localStorage.getItem("lesson6")) || lesson6;

    lesson6Data.map((ques) => {
      if (ques.qid == obj.qid) {
        if (ques.isFlag == true) {
          ques.isFlag = false;
        } else {
          ques.isFlag = true;
        }
      }
    });
    localStorage.setItem("lesson6", JSON.stringify(lesson6Data));

    setDataFromLocal();
  }

  function handlePrev() {
    if (currentQuiz == 0) {
      return;
    }
    let lesson6Data = JSON.parse(localStorage.getItem("lesson6")) || lesson6;
    let currentIndex = currentQuiz - 1;

    if (!isSubmitted) {
      while (currentIndex >= 0) {
        if (lesson6Data[currentIndex].isFlag == true) {
          setCurrentQuiz(currentIndex);
          setWordOrder(lesson6Data[currentIndex].wordsOrder);
          break;
        }
        currentIndex--;
      }
    } else {
      setCurrentQuiz(currentQuiz - 1);
      setWordOrder(lesson6Data[currentIndex].wordsOrder);
    }
  }

  function handleNext() {
    let lesson6Data = JSON.parse(localStorage.getItem("lesson6")) || lesson6;

    if (!isSubmitted) {
      lesson6Data[currentQuiz].isVisited = true;
    }
    setDataToLocal(lesson6Data);

    let currentIndex = currentQuiz + 1;

    if (!isSubmitted) {
      while (currentIndex <= lesson6Data.length - 1) {
        if (
          lesson6Data[currentIndex].isFlag == true ||
          lesson6Data[currentIndex].isVisited == false
        ) {
          setCurrentQuiz(currentIndex);
          setWordOrder(lesson6Data[currentIndex].wordsOrder);
          setDataFromLocal();
          break;
        }
        currentIndex++;
      }
    } else {
      setCurrentQuiz(currentIndex);
      setWordOrder(lesson6Data[currentIndex].wordsOrder);
    }
  }

  function handleSubmitQuiz() {
    let lesson6Data = getDataFromLocal();
    setIsSubmitted(true);
    setCurrentQuiz(0);
    toast.success("Check your answers as a feedback !");
    setWordOrder(lesson6Data[0].wordsOrder);

    localStorage.removeItem("lesson6");
  }

  function startExerciseAgain() {
    let data = dataOfLesson6.map((obj) => {
      return {
        ...obj,
        isVisited: false,
        isFlag: false,
        noOfAttempts: 7,
        natureOfAttempt: "",
        answeredByStudent: [],
        wordsOrder: { like: "", watch: "", alot: "" },
      };
    });
    setDataToLocal(data);
    setCurrentQuiz(0);
    setDataFromLocal();
    setIsSubmitted(false);
    setWordOrder(data[0].wordsOrder);
  }

  function handleChangeChar(key, value) {
    console.log(key, value);
    wordsOrder[key] = value;

    setWordOrder({ ...wordsOrder });
  }
  console.log(wordsOrder);
  return (
    <div className="big-box">
      <h2>Questions Type:Fill the space</h2>

      <div className="container-questions">
        {lesson6.length > 0 &&
          lesson6.map((obj) => {
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
                      <div className="fill-in-blanks">
                        <div className="fill-from-here">
                          {obj.Options.map((val) => {
                            return <strong>{val}|</strong>;
                          })}
                        </div>
                        <div className="sentence">
                          {console.log(Object.keys(wordsOrder))}
                          {obj.sentance.split("").map((char) => {
                            return char == "*" || char == "_" || char == "$" ? (
                              <input
                                className="blank"
                                type="text"
                                value={
                                  Object.values(wordsOrder)[
                                    char == "_" ? 0 : char == "*" ? 1 : 2
                                  ]
                                }
                                onChange={(e) => {
                                  handleChangeChar(
                                    Object.keys(wordsOrder)[
                                      char == "_" ? 0 : char == "*" ? 1 : 2
                                    ],
                                    e.target.value
                                  );
                                }}
                              />
                            ) : (
                              char
                            );
                          })}
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
                    Answer {obj.answer.join(",")}.That is Correct
                  </div>
                )}
                {obj.natureOfAttempt == "inCorrect" && (
                  <div className="feedback inCorrectAns">
                    <InfoOutlinedIcon />
                    Note: Your provided answer is:
                    {obj.answeredByStudent.join(",")}. That is not correct.
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
          disabled={currentQuiz == dataOfLesson6.length - 1}
        >
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>
    </div>
  );
}

export default Lesson6;
