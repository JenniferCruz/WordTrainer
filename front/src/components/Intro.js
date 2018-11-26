import React from "react";
import {CSSClass, URLs} from "../testUtils/strings";

export default function Intro() {
  return (
    <div className="App-intro">
      <div>
        <h2>Select a quiz!</h2>
        <a href={URLs.multipleChoiceQuiz}
           className={CSSClass.multipleChoiceQuiz}>Multiple Choice Quiz</a>
        <br/>
        <a className={CSSClass.inputTextQuiz}>Write your answer Quiz</a>
      </div>
    </div>
  )
}