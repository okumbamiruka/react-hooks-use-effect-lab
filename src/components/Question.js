import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Setup timer interval
    const timerInterval = setInterval(() => {
      // Decrease time remaining by 1 second
      setTimeRemaining((timeRemaining) => timeRemaining - 1);
    }, 1000);

    // Cleanup interval on component unmount or when time runs out
    return () => clearInterval(timerInterval);
  }, [timeRemaining, onAnswered]); // Empty dependency array ensures the effect runs only once on component mount

  useEffect(() => {
    // Check if time runs out
    if (timeRemaining === 0) {
      // Call onAnswered with false (indicating time's up)
      handleAnswer(false);
    }
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    // Reset timer when answering
    setTimeRemaining(10);
    // Call parent component's callback
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
