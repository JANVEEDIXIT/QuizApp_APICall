import React from "react";

function Question({
  data,
  currentQuestion,
  options,
  clickedOption,
  handleOptionClick,
  changeQuestion,
}) {
  if (
    data.length === 0 ||
    currentQuestion < 0 ||
    currentQuestion >= data.length
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="question-container">
      <div>
        <span id="question-number">{`Question ${currentQuestion + 1}:`}</span>
        <p>{data[currentQuestion].question}</p>
        <div className="option-containers">
          {options.map((option, i) => (
            <button
              className={`option-btn ${
                clickedOption === option
                  ? clickedOption === data[currentQuestion].correct_answer
                    ? "checked"
                    : "wrong"
                  : ""
              }`}
              key={i}
              onClick={() => handleOptionClick(option)}
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
    </div>
  );
}

export default Question;
