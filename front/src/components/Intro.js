import React from "react";
import {CSSClass, URLs} from "../testUtils/strings";

export default function Intro() {
  return (
    <div className="App-intro">
      <div>
        <h2 id='greeter'>Select a quiz!</h2>
        <a href={URLs.multipleChoiceQuiz}
           className={CSSClass.multipleChoiceQuiz + " " + CSSClass.quizOption}>Multiple Choice Quiz</a>
        <br/>
        <a className={CSSClass.inputTextQuiz + " " + CSSClass.quizOption}>Write your answer Quiz</a>
      </div>
    </div>
  )
}