import React, { useState } from "react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { dataOfLesson1 } from "../Utils/store";
import { toast } from "react-toastify";
import celebration from "../assets/tones/Congratulations.mp3";
import sorrow from "../assets/tones/negative tone.mp3";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Lesson1() {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [answeredByStudent, setAnsweredByStudent] = useState("");
  const lesson1InLocal = JSON.parse(localStorage.getItem("lesson1"));

  const [lesson1, setLesson1] = useState(lesson1InLocal || [...dataOfLesson1]);

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
    if (obj.answer == answeredByStudent) {
      playPositiveTone();
    } else {
      playNegativeTone();
    }

    if (obj.noOfAttempts > 0 && obj.natureOfAttempt != "correct") {
      let lesson1Data = getDataFromLocal();

      let updateData = lesson1Data.map((ques) => {
        if (obj.qid == ques.qid) {
          return {
            ...ques,
            noOfAttempts: ques.noOfAttempts - 1,
            answeredByStudent: answeredByStudent,
            natureOfAttempt:
              ques.answer == answeredByStudent ? "correct" : "inCorrect",
          };
        }
        return { ...ques };
      });
      setDataToLocal(updateData);
      setDataFromLocal();
      setAnsweredByStudent("");
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

  // function to set data to localStorage
  function setDataToLocal(updateData) {
    localStorage.setItem("lesson1", JSON.stringify(updateData));
  }

  // function to get data from localStorage
  function getDataFromLocal() {
    return JSON.parse(localStorage.getItem("lesson1")) || lesson1;
  }

  function playPositiveTone() {
    new Audio(celebration).play();
  }
  function playNegativeTone() {
    new Audio(sorrow).play();
  }

  // updating the State from local to show on UI
  function setDataFromLocal() {
    setLesson1(JSON.parse(localStorage.getItem("lesson1")) || lesson1);
  }

  // Function to note question is booked by user or not
  function handleBookMark(obj) {
    let lesson1Data = getDataFromLocal();

    let updateData = lesson1Data.map((ques) => {
      if (ques.qid == obj.qid) {
        return { ...ques, isFlag: ques.isFlag == false ? true : false };
      }
      return { ...ques };
    });

    setDataToLocal(updateData);
    setDataFromLocal();
  }

  // Moving to prev question
  function handlePrev() {
    if (currentQuiz == 0) {
      return;
    }
    let lesson1Data = getDataFromLocal();
    let currentIndex = currentQuiz - 1;

    if (!isSubmitted) {
      while (currentIndex >= 0) {
        if (lesson1Data[currentIndex].isFlag == true) {
          setDataToLocal(lesson1Data);
          setCurrentQuiz(currentIndex);

          break;
        }
        currentIndex--;
      }
    } else {
      setCurrentQuiz(currentQuiz - 1);
    }
  }

  // Moving to next question
  function handleNext() {
    let lesson1Data = getDataFromLocal();

    if (!isSubmitted) {
      lesson1Data[currentQuiz].isVisited = true;
    }
    localStorage.setItem("lesson1", JSON.stringify(lesson1Data));

    let currentIndex = currentQuiz + 1;
    while (currentIndex <= lesson1Data.length - 1) {
      if (
        lesson1Data[currentIndex].isFlag == true ||
        lesson1Data[currentIndex].isVisited == false
      ) {
        setDataToLocal(lesson1Data);
        setCurrentQuiz(currentIndex);
        break;
      }
      currentIndex++;
    }
  }

  // Function to note the answer by user
  function handleAnswer(e) {
    setAnsweredByStudent(e.target.value);
  }

  function handleSubmitQuiz() {
    let lesson1Data = getDataFromLocal();

    let updateData = lesson1Data.map((obj) => {
      return {
        ...obj,
        isFlag: false,
        isVisited: false,
      };
    });
    setDataToLocal(updateData);
    setDataFromLocal();
    setIsSubmitted(true);
    setCurrentQuiz(0);
    toast.success("Check your answers as a feedback !");
    localStorage.removeItem("lesson1"); //all previous recode deleted here
  }

  function startExerciseAgain() {
    let data = lesson1.map((obj) => {
      return {
        ...obj,
        isVisited: false,
        isFlag: false,
        noOfAttempts: 7,
        natureOfAttempt: "",
        answeredByStudent: "",
      };
    });

    localStorage.removeItem("lesson1");
    setLesson1([...data]);
    setCurrentQuiz(0);
    setAnsweredByStudent("");
    setIsSubmitted(false);
  }
  return (
    <div className="big-box">
      <h2>Questions Type:Free Choice</h2>

      <div className="container-questions">
        {lesson1.map((obj) => {
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
                  <strong className="answer">Answer</strong>
                  <div className="question-types">
                    <div className="freeChoice">
                      <input
                        type="text"
                        placeholder="Enter the answer please"
                        onChange={(e) => {
                          handleAnswer(e);
                        }}
                        value={answeredByStudent}
                      />
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
                  Note: You provided answer is:{obj.answeredByStudent}. That is
                  not correct.
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
          disabled={currentQuiz == dataOfLesson1.length - 1}
        >
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>
    </div>
  );
}

export default Lesson1;
