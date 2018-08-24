import fetch from "node-fetch";
import {createQuestion} from "./Question";

class WordDatabase {
  async findWords() {
    const response = await fetch('http://localhost:8080/translations')
    return await response.json()
  }
  getAnswerOptions( questionType, word, allWords ) {
    if (questionType === "multiple")
      return allWords.map(t => t.words.en)
  }
  async findQuestions( questionType ) {
    const words = await this.findWords()
    return words.map(t => {
      const choices = this.getAnswerOptions( questionType, t, words )
      return createQuestion(t.words.de, t.words.en, questionType, choices)
    })
  }
}

// TODO: Singleton is horrible. Use a Factory
const worldDatabase = new WordDatabase()
export default worldDatabase