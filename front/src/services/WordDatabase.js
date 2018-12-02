import fetch from "node-fetch";
import _ from "lodash";

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
      let options = _.shuffle(ensureRightAnswerIsAnOption(choices, t.words.en))

      return {
        concept: t.words.de,
        answer: t.words.en,
        options: questionType === "multiple" ? options : null
      }
    })
  }
}

function ensureRightAnswerIsAnOption(options = [], rightAnswer) {
  return options.filter( c => c !== rightAnswer).concat(rightAnswer)
}

// TODO: Singleton is horrible. Use a Factory
const worldDatabase = new WordDatabase()
export default worldDatabase