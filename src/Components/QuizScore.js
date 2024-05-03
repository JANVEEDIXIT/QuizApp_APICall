import React from "react";

function QuizScore(props) {
  return (
    <>
      <div className="scores">
        Your Score : {props.score} <br />
        Total Score : {props.totalScore}
      </div>
      <button id="next-btn" onClick={props.tryAgain}>
        Try Again
      </button>
    </>
  );
}

export default QuizScore;
