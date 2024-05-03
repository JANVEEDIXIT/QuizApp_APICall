import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizScore from "./QuizScore";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const QuizAPI_URL = "https://opentdb.com/api.php?amount=10";

function QuizApi() {
  const [data, setData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const QuizData = async (retryCount = 0) => {
    try {
      const response = await axios.get(QuizAPI_URL);
      setData(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 429 &&
        retryCount < MAX_RETRIES
      ) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        await QuizData(retryCount + 1);
      } else {
        console.error("Error Fetching the Data:", error);
      }
    }
  };

  useEffect(() => {
    QuizData();
  }, []);

  const changeQuestion = () => {
    updateScore();
    if (currentQuestion < data.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
    } else {
      setShowResult(true);
    }
  };

  const updateScore = () => {
    if (clickedOption === data[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
  };

  const resetAll = () => {
    setCurrentQuestion(0);
    setScore(0);
    setClickedOption(0);
    setShowResult(false);
  };

  return (
    <div>
      <h1 className="heading">Quiz App</h1>
      <div className="container">
        {showResult ? (
          <QuizScore
            score={score}
            totalScore={data.length}
            tryAgain={resetAll}
          />
        ) : (
          <>
            <div className="question-container">
              {data.length > 0 && (
                <div>
                  <span id="question-number">{`Question ${
                    currentQuestion + 1
                  }:`}</span>
                  <p>{data[currentQuestion].question}</p>
                  <div className="option-containers">
                    {[]
                      .concat(
                        [data[currentQuestion].correct_answer],
                        data[currentQuestion].incorrect_answers
                      )
                      .sort(() => Math.random() - 0.5)
                      .map((option, i) => (
                        <button
                          className={`option-btn ${
                            clickedOption === option
                              ? clickedOption ===
                                data[currentQuestion].correct_answer
                                ? "checked"
                                : "wrong"
                              : ""
                          }`}
                          key={i}
                          onClick={() => setClickedOption(option)}
                        >
                          {option}
                        </button>
                      ))}
                  </div>

                  {currentQuestion < data.length && (
                    <input
                      type="button"
                      value="Next"
                      id="next-btn"
                      onClick={changeQuestion}
                    />
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default QuizApi;
